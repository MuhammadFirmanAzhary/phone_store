//import React
import React, { useState } from "react";

//import layout web
import LayoutWeb from '../../../Layouts/Web';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import formatPrice
import FormatPrice from '../../../Utils/FormatPrice';

//import component add to cart
import AddTocart from './AddToCart';

export default function ProductShow() {

    //destruct props "product"
    const { product } = usePage().props;

    //define state
    const [productImage, setProductImage] = useState(product.product_images[0].image);
    const [color, setColor] = useState(product.product_images[0].color.name);
    const [colorImage, setColorImage] = useState(product.product_images[0].color.image);
    const [size, setSize] = useState(product.product_sizes[0].size);
    const [price, setPrice] = useState(product.product_sizes[0].price);

    //method changeImage
    const changeImage = (color) => {
        setProductImage(color.image);
        setColor(color.color.name);
        setColorImage(color.color.image);
    }

    //method changeSizeAndPrice
    const changeSizeAndPrice = (size, price) => {
        setSize(size);
        setPrice(price);
    }

    return (
        <>
            <Head>
                <title>{`${product.title} - Geek Store - Where Developer Shopping`}</title>
            </Head>
            <LayoutWeb>

                <div className="container mt-55 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">

                                <div className="card border-0 bg-gray rounded-0 shadow-sm pt-2 mb-0">
                                    <div className="card-body text-center">
                                        <img src={productImage} width="300" className="rounded-3" />
                                    </div>
                                </div>
                                <div className="card border-0 rounded-top-none rounded shadow-sm mt-0 mb-3">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-md-6 col-6 text-start">
                                                <h5>{product.title}</h5>
                                            </div>
                                            <div className="col-md-6 col-6 text-end">
                                                <h5>Rp. {FormatPrice(price)}</h5>
                                            </div>
                                        </div>

                                        <div className="colors mt-4">
                                            <i>Colors</i>
                                            <div className="mt-2">
                                                {product.product_images.map((color, index) => (
                                                    <button onClick={() => changeImage(color)} key={index} className="btn btn-transparent btn-sm me-2 border-0 text-center">
                                                        <img src={color.color.image} width={'20'} className="rounded-circle me-3 shadow-sm" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="colors mt-4">
                                            <i>Sizes</i>
                                            <div className="mt-2">
                                                {product.product_sizes.map((size, index) => (
                                                    <button onClick={() => changeSizeAndPrice(size.size, size.price)} className="btn btn-primary btn-sm me-2 border-0 shadow-sm w-5" key={index}>{size.size}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 rounded shadow-sm mb-5">
                                    <div className="card-body">
                                        <h5>Description</h5>
                                        <hr />
                                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                    </div>
                                </div>

                                <AddTocart
                                    product_id={product.id}
                                    productImage={productImage}                
                                    color={color}
                                    colorImage={colorImage}
                                    size={size}
                                    price={price}
                                    weight={product.weight}                
                                />

                            </div>
                        </div>
                    </div>
                </div>

            </LayoutWeb>
        </>
    )

}