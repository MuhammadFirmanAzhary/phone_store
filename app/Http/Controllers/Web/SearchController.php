<?php

namespace App\Http\Controllers\Web;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        if($request->q != "") {
            //get products by keywords
            $products = Product::where('title', 'like', '%'. $request->q . '%')->get();
        } else {
            $products = [];
        }

        //return response
        return response()->json([
            'products' => $products,
        ]);
    }
}
