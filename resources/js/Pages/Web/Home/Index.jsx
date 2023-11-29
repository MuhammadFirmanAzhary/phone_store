//import React
import React from "react";

//import layout web
import LayoutWeb from '../../../Layouts/Web';

//import Head, usePage, Link
import { Head, usePage, Link } from '@inertiajs/inertia-react';

//import component slider
import Slider from '../../../Components/Slider';

//import component card category
import CardCategory from '../../../Shared/CardCategory';

//import component slider
import CardProduct from '../../../Shared/CardProduct';

export default function HomeIndex() {

    //destruct props "sliders", "categories", "products"
    const { sliders, categories, products } = usePage().props;

    return (
        <>
            <Head>
                <title>  phone Store - Where Developer Shopping</title>
            </Head>
            <LayoutWeb>

                <Slider sliders={sliders} />

                <div className="container mt-4 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">

                                {/** categories */}
                                <div className="row justify-content-between mb-3">
                                    <div className="col-md-6 col-6 text-start"><strong> Categories</strong></div>
                                    <div className="col-md-6 col-6 text-end">
                                        <Link href="/categories" className="text-dark"><strong>See More <i className="fa fa-long-arrow-alt-right"></i></strong></Link>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    {categories.map((category, index) => (

                                        <CardCategory category={category} key={index} />

                                    ))}
                                </div>

                                {/** products */}
                                <div className="row justify-content-between mb-3 mt-4">
                                    <div className="col-md-6 col-6 text-start"><strong> Latest Products</strong></div>
                                    <div className="col-md-6 col-6 text-end">
                                        <Link href="/products" className="text-dark"><strong>See More <i className="fa fa-long-arrow-alt-right"></i></strong></Link>
                                    </div>
                                </div>

                                <div className="row mb-5">

                                    {products.map((product, index) => (

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