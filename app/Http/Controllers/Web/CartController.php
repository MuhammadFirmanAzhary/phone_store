<?php

namespace App\Http\Controllers\Web;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{    
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //get carts by user
        $carts = Cart::with('product')
                ->where('user_id', auth()->user()->id)
                ->latest()
                ->get();
        
        return inertia('Web/Carts/Index', [
            'carts'       => $carts,
        ]);
    }
    
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        //check cart
        $cart = Cart::where('product_id', $request->product_id)->where('size', $request->size)->where('color', $request->color);

        if($cart->count()) {

            //increment / update quantity
            $cart->increment('qty');

            $cart = $cart->first();

            //sum price * quantity
            $price = $request->price * $cart->qty;

            //sum weight
            $weight = $request->weight * $cart->qty;

            $cart->update([
                'price'     => $price,
                'weight'    => $weight
            ]);

        } else {

            //insert data to carts
            Cart::insert([
                'user_id'       => auth()->user()->id,
                'product_id'    => $request->product_id,
                'product_image' => $request->product_image,
                'color'         => $request->color,
                'color_image'   => $request->color_image,
                'size'          => $request->size,
                'price'         => (int) $request->price,
                'qty'           => $request->qty,
                'weight'        => $request->weight
            ]);

        }

        return redirect()->back();
    }
    
    /**
     * destroy
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {
        //get carts by id
        $cart = Cart::with('product')
                ->where('user_id', auth()->user()->id)
                ->where('id', $id)
                ->first();
        
        //delete cart
        if($cart) {
            $cart->delete();
        }

        //return
        return redirect()->back();
    }
}

