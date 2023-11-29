<?php

namespace App\Http\Controllers\Account;

use App\Models\Slider;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get sliders
        $sliders = Slider::latest()->paginate(5);

        //return inertia
        return inertia('Account/Sliders/Index', [
            'sliders' => $sliders,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /**
         * Validate request
         */
        $this->validate($request, [
            'link'      => 'required',
            'image'     => 'required|mimes:png,jpg',
        ]);

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/sliders', $image->hashName());

        //create slider
        Slider::create([
            'link'  => $request->link,
            'image' => $image->hashName()
        ]);

        //redirect
        return redirect()->route('account.sliders.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //find slider by ID
        $slider = Slider::findOrFail($id);

        //remove image from server
        Storage::disk('local')->delete('public/sliders/'.basename($slider->image));

        //delete slider
        $slider->delete();

        //redirect
        return redirect()->route('account.sliders.index');
    }
}
