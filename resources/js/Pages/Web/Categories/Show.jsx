//import React
import React from "react";

//import layout web
import LayoutWeb from '../../../Layouts/Web';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import component slider
import CardProduct from '../../../Shared/CardProduct';

export default function CategoryShow() {

    //destruct props "category"
    const { category } = usePage().props;

    return (
        <>
            <Head>
                <title>{`${category.name} - Phone Store - Where Developer Shopping`}</title>
            </Head>
            <LayoutWeb>

                <div className="container mt-80 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">

                                <div className="row mb-5">

                                    <div className="col-md-12">
                                        <div className="alert alert-warning border-0 shadow-sm rounded-3">
                                            Products Category : <strong>{category.name}</strong>
                                        </div>
                                    </div>

                                    {category.products.map((product, index) => (
                                        
                                        <CardProduct product={product} key={index} />

                                    ))}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </LayoutWeb>
        </>
    )

}