//import React
import React from "react";

//import Link
import { Link } from '@inertiajs/inertia-react';

export default function CardCategory({ category }) {

    return (
        <>
            <div className="col-md-3 col-6 mb-3">
                <Link href={`/categories/${category.slug}`} className="text-decoration-none text-dark">
                    <div className="card border-0 rounded-3  shadow-sm">
                        <div className="card-body text-center">
                            <img src={category.image} width="50" />
                            <p className="card-title mt-3">{category.name}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )

}