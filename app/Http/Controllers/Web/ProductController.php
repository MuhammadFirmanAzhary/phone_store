<?php

namespace App\Http\Controllers\Web;

use App\Models\Product;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get products
        $products = Product::with('productImages.color', 'productSizes')->latest()->paginate(8);

        //return inertia
        return inertia('Web/Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * show
     *
     * @param  mixed $slug
     * @return void
     */
    public function show($slug)
    {
        //get product
        $product = Product::where('slug', $slug)->with('productImages.color', 'productSizes')->firstOrFail();

        //render inertia
        return inertia('Web/Products/Show', [
            'product' => $product
        ]);
    }
}
