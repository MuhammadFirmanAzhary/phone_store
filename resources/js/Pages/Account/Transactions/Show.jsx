//import react  
import React from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import formatPrice
import FormatPrice from '../../../Utils/FormatPrice';

export default function TransactionShow() {

    //destruct props "transaction"
    const { transaction } = usePage().props;

    return (
        <>
            <Head>
                <title>Detail Transaction - Phone Store</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4 mb-4">
                    <div className="col-12">

                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-shopping-cart"></i> Detail Transaction</span>
                            </div>
                            <div className="card-body">

                                <table className="table table-bordered">
                                    <tr>
                                        <td style={{ width: '25%' }}>
                                            NO. INVOICE
                                        </td>
                                        <td style={{ width: '1%' }}>:</td>
                                        <td className="p-2">
                                            {transaction.invoice}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            FULL NAME
                                        </td>
                                        <td>:</td>
                                        <td className="p-2">
                                            {transaction.user.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            COURIER / SERVICE / COST
                                        </td>
                                        <td>:</td>
                                        <td className="p-2">
                                            {transaction.courier_name} / {transaction.courier_service} / Rp.
                                            {FormatPrice(transaction.courier_cost)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            CITY
                                        </td>
                                        <td>:</td>
                                        <td className="p-2">
                                            {transaction.city.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            PROVINCE
                                        </td>
                                        <td>:</td>
                                        <td className="p-2">
                                            {transaction.province.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            ADDRESS
                                        </td>
                                        <td>:</td>
                                        <td className="p-2">
                                            {transaction.address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            GRAND TOTAL
                                        </td>
                                        <td>:</td>
                                        <td className="p-2">
                                            Rp. {FormatPrice(transaction.grand_total)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            STATUS
                                        </td>
                                        <td>:</td>
                                        <td className="p-3">
                                            {transaction.status == 'UNPAID' &&
                                                <a href={`https://app-sandbox.duitku.com/redirect_checkout?reference=${transaction.reference}&lang=id`} className="btn btn-success btn-sm border-0 shadow-sm">PAY NOW</a>
                                            }
                                            {transaction.status == 'PAID' &&
                                                <button className="btn btn-sm btn-success border-0 shadow-sm"><i className="fa fa-check-circle"></i> PAID</button>
                                            }
                                            {transaction.status == 'CANCELLED' &&
                                                <button className="btn btn-sm btn-danger border-0 shadow-sm"><i className="fa fa-times"></i> CANCELLED</button>
                                            }
                                        </td>
                                    </tr>
                                </table>

                            </div>
                        </div>

                        <div className="card border-0 rounded shadow-sm border-top- mt-4">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-shopping-bag"></i> Detail Product</span>
                            </div>
                            <div className="card-body">
                                {transaction.transaction_details.map((detail, index) => (
                                    <div key={index}>
                                        <div className="row g-0">
                                            <div className="col-md-3 col-3">
                                                <img src={detail.product_image} className="img-fluid rounded-3" />
                                            </div>
                                            <div className="col-md-9 col-9">
                                                <div className="card-body">
                                                    <h4 className="card-title">{detail.product.title}</h4>

                                                    <div className="row">
                                                        <div className="col-md-3 col-6">
                                                            <div>
                                                                Qty : <strong>{detail.qty}</strong>
                                                            </div>
                                                            <div className="mt-3">
                                                                Size : <strong>{detail.size}</strong>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-9 col-6">
                                                            <div>
                                                                Color : <img src={detail.color_image} width={'20'} className="rounded-circle mb-1" />
                                                            </div>
                                                            <div className="mt-3">
                                                                Color Name : <strong>{detail.color}</strong>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr />

                                                    <h5>Rp. {FormatPrice(detail.price)}</h5>

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
            </LayoutAccount>
        </>
    )

}