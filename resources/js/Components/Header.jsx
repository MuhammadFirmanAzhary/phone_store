//import React
import React from "react";

//import Link
import { Link } from '@inertiajs/inertia-react';

export default function Header() {

    return (
        <>
            <nav className="navbar-expand-md navbar-dark fixed-top bg-primary shadow">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1">
                                <Link href="/" className="d-flex align-items-center col-md-12 mb-2 mb-md-0 text-white text-decoration-none">
                                    <img src="/assets/images/logo.png" width="50" />
                                    <h5 className="mb-0"><strong>PHONE</strong> STORE</h5>
                                </Link>
                            </header>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )

}