//import react  
import React, { useState } from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from 'sweetalert2';

export default function ColorEdit() {

    //destruct props "errors" & "color"
    const { errors, color } = usePage().props;

    //state
    const [name, setName] = useState(color.name);
    const [image, setImage] = useState(null);

    //method "updateColor"
    const updateColor = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post(`/account/colors/${color.id}`, {

            //data
            name: name,
            image: image,
            _method: "PUT"
        }, {
            onSuccess: () => {

                //show alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <>
            <Head>
                <title>Edit Color - Phone Store</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm ">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-palette"></i> Edit Color</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateColor}>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Image</label>
                                        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                    </div>
                                    {errors.image && (
                                        <div className="alert alert-danger">
                                            {errors.image}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Color Name</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Color Name" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}

                                    <div>
                                        <button type="submit" className="btn btn-md btn-primary me-2"><i className="fa fa-save"></i> Update</button>
                                        <button type="reset" className="btn btn-md btn-warning"><i className="fa fa-redo"></i> Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )

}