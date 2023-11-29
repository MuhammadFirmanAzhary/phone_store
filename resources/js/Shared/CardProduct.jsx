//import React
import React from "react";

//import Link
import { Link } from '@inertiajs/inertia-react';

//import formatPrice
import FormatPrice from '../Utils/FormatPrice';

export default function CardProduct({ product }) {

    return (
        <>
            <div className="col-md-6 mb-4 col-6">
                <Link href={`/products/${product.slug}`} className="text-dark text-decoration-none">
                    <div className="card border-0 h-100 rounded-3 shadow-sm product">
                        <div className="card-image">
                            {product.product_images.length > 0
                                ? <img src={product.product_images[0].image} className="w-100 rounded-top" />
                                : <img src="/assets/images/image.png" className="w-100 rounded-top" />
                            }
                        </div>
                        <div className="card-body h-100">
                            <h6 className="card-title text-center title-book">{product.title}</h6>
                            <div className="colors mt-4">
                                <i>Available Colors</i>
                                <div className="mt-2">
                                    {product.product_images.map((color, index) => (
                                        <img src={color.color.image} key={index} width={'20'} className="rounded-circle me-2 shadow-sm" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row justify-content-between">
                                <div className="col-md-6 col-12 text-start final-price"><strong>Rp. {FormatPrice(product.product_sizes[0].price)}</strong></div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )

}