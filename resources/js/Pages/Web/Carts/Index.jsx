//import React
import React from "react";

//import layout web
import LayoutWeb from '../../../Layouts/Web';

//import Head, usePage, Link
import { Head, usePage, Link } from '@inertiajs/inertia-react';

//import component delete
import Delete from '../../../Shared/Delete';

//import formatPrice
import FormatPrice from '../../../Utils/FormatPrice';

export default function CartIndex() {

    //destruct props "carts"
    const { dataCarts, carts } = usePage().props;

    return (
        <>
            <Head>
                <title>Carts - phone Store - Where Developer Shopping</title>
            </Head>
            <LayoutWeb>

                <div className="container mt-80 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">

                                {carts.length > 0

                                    ? <div className="row mb-2">
                                        <div className="col-md-12">
                                            <div className="card border-0 shadow-sm rounded-3 mb-3">
                                                <div className="card-body">
                                                    {carts.map((cart, index) => (
                                                        <div key={index}>
                                                            <div className="row g-0">
                                                                <div className="col-md-4 col-4">
                                                                    <img src={cart.product_image} className="img-fluid rounded-3" />
                                                                </div>
                                                                <div className="col-md-8 col-8">
                                                                    <div className="card-body">
                                                                        <h4 className="card-title">{cart.product.title}</h4>

                                                                        <div className="row">
                                                                            <div className="col-md-3 col-6">
                                                                                <div>
                                                                                    Qty : <strong>{cart.qty}</strong>
                                                                                </div>
                                                                                <div className="mt-3">
                                                                                    Size : <strong>{cart.size}</strong>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 col-6">
                                                                                <div>
                                                                                    Color : <img src={cart.color_image} width={'20'} className="rounded-circle mb-1" />
                                                                                </div>
                                                                                <div className="mt-3">
                                                                                    Color Name : <strong>{cart.color}</strong>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3 col-12 text-end">
                                                                                <Delete URL={'/carts'} id={cart.id} />
                                                                            </div>
                                                                        </div>

                                                                        <hr />

                                                                        <h5>Rp. {FormatPrice(cart.price)}</h5>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    : <div className="card border-0 rounded-3 shadow-sm mt-4 mb-4">
                                        <div className="card-body">
                                            <div className="col-sm-12 empty-cart-cls text-center">
                                                <img src="/assets/images/shopping-cart.png" width="150" height="150" className="img-fluid mb-4 mr-3" />
                                                <h6><strong>Shopping Carts is Empty 😁</strong></h6>
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <div className="card border-0 rounded-3 shadow-sm">
                                            <div className="card-body">
                                                <h6 className="mb-0">Total Orders : <strong>Rp. {FormatPrice(dataCarts.price)}</strong></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        {carts.length > 0
                                            ? <Link href="/checkouts" className="btn btn-primary btn-md border-0 shadow rounded-3 w-100">Next Payment <i className="fa fa-long-arrow-alt-right"></i></Link>
                                            : <button className="btn btn-primary btn-md border-0 shadow rounded-3 w-100" disabled>Next Payment <i className="fa fa-long-arrow-alt-right"></i></button>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </LayoutWeb>
        </>
    )

}