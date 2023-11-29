<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            //user authenticated
            'auth'=>[
                'user'          => $request->user() ?   $request->user() : null,
                'permissions'   => $request->user() ? $request->user()->getPermissionArray() : []
            ],
            //carts
            'dataCarts' => $request->user() ? [
                'total'     =>  \App\Models\Cart::where('user_id', $request->user()->id)->count() ?? 0,
                'price'     => \App\Models\Cart::where('user_id', $request->user()->id)->sum('price') ?? 0,
                'weight'    => \App\Models\Cart::where('user_id', $request->user()->id)->sum('weight') ?? 0
            ] : null
        ]);
    }
}
