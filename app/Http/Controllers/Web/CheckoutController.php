<?php

namespace App\Http\Controllers\Web;

use App\Models\Cart;
use App\Models\City;
use App\Models\Province;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class CheckoutController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //check if cart empty
        if(Cart::where('user_id', auth()->user()->id)->count() == 0) {
            return redirect()->route('web.carts.index');
        }

        //get all provinces
        $provinces = Province::all();

        //return
        return inertia('Web/Checkouts/Index', [
            'provinces' => $provinces
        ]);
    }

    /**
     * getCities
     *
     * @param  mixed $request
     * @return void
     */
    public function getCities(Request $request)
    {
        //get cities by province ID
        $cities = City::where('province_id', $request->province_id)->get();

        //return
        return response()->json($cities);
    }

    /**
     * checkOngkir
     *
     * @param  mixed $request
     * @return void
     */
    public function checkOngkir(Request $request)
    {
        //Fetch Rest API
        $response = Http::withHeaders([
            //api key rajaongkir
            'key'          => config('rajaongkir.api_key')
        ])->post('https://api.rajaongkir.com/starter/cost', [

            //send data
            'origin'      => 113, // ID kota Demak
            'destination' => $request->destination,
            'weight'      => $request->weight,
            'courier'     => $request->courier
        ]);

        return response()->json($response['rajaongkir']['results'][0]['costs']);
    }
    
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $duitkuConfig = new \Duitku\Config(config('duitku.merchant_key'), config('duitku.merchant_code'));
        // true for sandbox mode, false for production mode
        $duitkuConfig->setSandboxMode(config('duitku.sandbox_mode'));
        // set sanitizer (default : true)
        $duitkuConfig->setSanitizedMode(true);
        // set log parameter (default : true)
        $duitkuConfig->setDuitkuLogs(false);

        DB::transaction(function () use ($duitkuConfig, $request) {

            $paymentAmount      = $request->grand_total;
            $email              = $request->email;
            $merchantOrderId    = 'INV-'.time();
            $productDetails     = "Pembayaran untuk Invoice : ". $merchantOrderId;
            $customerVaName     = $request->name;
            $callbackUrl        = config('app.url').'/callback'; // url for callback
            $returnUrl          = config('app.url').'/account/transactions/'.$merchantOrderId; // url for redirect
            $expiryPeriod       = 1440; // set the expired time in minutes

            //create transaction
            $transaction = Transaction::create([
                'invoice'                   => $merchantOrderId,
                'user_id'                   => auth()->user()->id,
                'province_id'               => $request->province_id,
                'city_id'                   => $request->city_id,
                'weight'                    => $request->weight,
                'courier_name'              => $request->courier_name,
                'courier_service'           => $request->courier_service,
                'courier_cost'              => $request->courier_cost,
                'grand_total'               => $request->grand_total,
                'address'                   => $request->address,
                'status'                    => 'UNPAID',
            ]);

            //create transaction details & item details

            // Item Details
            $item_details = [];

            foreach(Cart::with('product')->where('user_id', auth()->user()->id)->get() as $cart) {
                
                //insert product ke table transaction_details
                $transaction->transactionDetails()->create([
                    'transaction_id'    => $transaction->id,   
                    'product_id'        => $cart->product->id,
                    'product_image'     => basename($cart->product_image),
                    'color'             => $cart->color,
                    'color_image'       => basename($cart->color_image),
                    'size'              => $cart->size,
                    'qty'               => $cart->qty,
                    'price'             => $cart->price,
                ]); 
                
                //assign item details
                $item_details [] = array(
                    'name'      => $cart->product->title,
                    'price'     => $cart->price,
                    'quantity'  => $cart->qty
                );
            }

            //remove data carts
            Cart::with('product')->where('user_id', auth()->user()->id)->delete();

            //add ongkir to item details
            $ongkir = array(
                'name'      => 'Shipping Cost : '.$request->courier_name,
                'price'     => (int) $request->courier_cost,
                'quantity'  => 1
            );

            //push ongkir to items details
            array_push($item_details, $ongkir);

            $customerDetail = array(
                'firstName'         => $request->name,
                'email'             => $request->email,
                'billingAddress'    => array(
                                        'firstName'     => $request->name,
                                        'address'       => $request->address,
                                    ),
                'shippingAddress'   => array(
                                        'firstName'     => $request->name,
                                        'address'       => $request->address,
                                    ),
            );

            $payload = array(
                'paymentAmount'     => $paymentAmount,
                'merchantOrderId'   => $merchantOrderId,
                'productDetails'    => $productDetails,
                'customerVaName'    => $customerVaName,
                'email'             => $email,
                'itemDetails'       => $item_details,
                'customerDetail'    => $customerDetail,
                'callbackUrl'       => $callbackUrl,
                'returnUrl'         => $returnUrl,
                'expiryPeriod'      => $expiryPeriod
            );

            try {
                // createInvoice Request
                $responseDuitkuPop = \Duitku\Pop::createInvoice($payload, $duitkuConfig);

                //get reference
                $getReference = json_decode($responseDuitkuPop, true);

                //insert reference to table transactions
                $transaction->reference = $getReference['reference'];
                $transaction->save();

                //make response "invoice"
                $this->response['invoice'] = $transaction->invoice;

            } catch (Exception $e) {
                echo $e->getMessage();
            }
        });

        return redirect()->route('account.transactions.show', $this->response);
    }
}
