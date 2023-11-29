//import React
import React, { useState } from "react";

//import link, usePage
import { Link, usePage } from '@inertiajs/inertia-react';

//import axios
import axios from "axios";

export default function Menu() {

    //destruct props "dataCarts"
    const { dataCarts } = usePage().props

    //define state
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //define method "searchhandler"
    const searchHandler = (e) => {

        //set isLoading to true
        setIsLoading(true);

        //set products to null
        setProducts([]);

        axios.post(`/search`, {
            q: e.target.value
        })
            .then(response => {

                //set isLoading to false
                setIsLoading(false);

                //set response to state
                setProducts(response.data.products);
            })
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-primary shadow navbar-expand fixed-bottom p-0">
                <div className="container">
                    <ul className="navbar-nav nav-justified justify-content-center justify-item-center w-100">
                        <li className="nav-item">
                            <Link href="/" className="nav-link text-white fw-bold">
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-house" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                    <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                                </svg>
                                <span className="small d-block">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="#" data-bs-toggle="modal" data-bs-target="#search" className="nav-link text-white fw-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                                <span className="small d-block">Search</span>
                            </Link>
                        </li>
                        <li className="nav-item dropup">
                            <Link href="/carts" className="nav-link text-white fw-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                {dataCarts
                                    ? <span className='badge badge-warning rounded-pill shadow' id='count-cart'>{dataCarts.total}</span>
                                    : <span className='badge badge-warning rounded-pill shadow' id='count-cart'>0</span>
                                }
                                <span className="small d-block">Shopping Cart</span>
                            </Link>
                        </li>
                        <li className="nav-item dropup">
                            <Link href="/login" className="nav-link text-white fw-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                <span className="small d-block">Account</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/** modal */}
            <div className="modal fade" id="search" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={((e) => searchHandler(e))} placeholder="search product here..." />
                            </div>
                        </div>
                        <div className="modal-body" style={{ height: '300px', overflow: 'auto' }}>
                            {isLoading &&
                                <div className="justify-content-center mb-3 text-center">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <h6 className="mt-2">Loading...</h6>
                                </div>
                            }

                            {
                                products.map((product, index) => (
                                    <a href={`/products/${product.slug}`} className="text-decoration-none text-dark" key={index}>
                                        <div className="card border-0 shadow-sm rounded-3 bg-light mb-3">
                                            <div className="card-body">
                                                {product.title}
                                            </div>
                                        </div>
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}