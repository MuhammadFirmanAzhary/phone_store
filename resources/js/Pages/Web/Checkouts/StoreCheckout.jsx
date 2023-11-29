//import React
import React from "react";

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

//import Sweet Alert
import Swal from 'sweetalert2';

export default function StoreCheckout({ provinceID, cityID, courierName, courierService, courierCost, weight, grandTotal, address }) {

    //method checkout
    const storeCheckout = () => {

        Inertia.post('/checkouts', {

            //data
            province_id: provinceID,
            city_id: cityID,
            courier_name: courierName,
            courier_service: courierService,
            courier_cost: courierCost,
            weight: weight,
            grand_total: grandTotal,
            address: address

        }, {
            onSuccess: () => {

                //show alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Checkout successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000
                });

            }
        })
    }

    return (
        <>
            <button onClick={storeCheckout} className="btn btn-primary btn-md border-0 shadow rounded-3 w-100 mb-5" disabled={grandTotal == 0}>BAYAR SEKARANG</button>
        </>
    )

}