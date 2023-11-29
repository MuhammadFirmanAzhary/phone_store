//import React
import React, { useState } from "react";

//import layout web
import LayoutWeb from '../../../Layouts/Web';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import formatPrice
import FormatPrice from '../../../Utils/FormatPrice';

//import axios
import axios from "axios";

//import component storeCheckout
import StoreCheckout from './StoreCheckout';

export default function CheckoutIndex() {

    //destruct props "provinces"
    const { provinces, dataCarts } = usePage().props;

    //define state
    const [provinceID, setProvinceID] = useState('');
    const [cityID, setCityID] = useState('');
    const [cities, setCities] = useState([]);

    const [showCourier, setShowCourier] = useState(false);
    const [courierName, setCourierName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOngkir, setShowOngkir] = useState(false);
    const [ongkirs, setOngkirs] = useState([]);

    const [courierService, setCourierService] = useState(0);
    const [courierCost, setCourierCost] = useState(0);

    const [grandTotal, setGrandTotal] = useState(0);
    const [address, setAddress] = useState('');

    //method getCityByProvince
    const getCityByProvince = async (province_id) => {

        //set state province ID
        setProvinceID(province_id);

        //get cities by province id
        axios.get(`/checkouts/cities?province_id=${province_id}`)
            .then(response => {
                setCities(response.data);
            })
    }

    //method show courier expedition
    const showCourierExpedition = (city_id) => {

        //set state cityID
        setCityID(city_id)

        //set state showCourier
        setShowCourier(true);
    }

    //method checkOngkir
    const checkOngkir = (e) => {

        //set state isLoading
        setIsLoading(true);

        //set state setShowOngkir to false
        setShowOngkir(false);

        //set courierName
        setCourierName(e.target.value);

        axios.post('/checkouts/checkOngkir', {

            destination: cityID,
            weight: dataCarts.weight,
            courier: e.target.value

        }).then(response => {

            //set data to state ongkir
            setOngkirs(response.data);

            //set state isLoading to false
            setIsLoading(false);

            //set state setShowOngkir to true
            setShowOngkir(true);

        });
    }

    //method getServiceAndCost
    const getServiceAndCost = (e) => {

        //split value dengan menghapus string -> | 
        let shipping = e.target.value.split("|");

        //set state
        setCourierCost(shipping[0]);
        setCourierService(shipping[1]);

        //sum grandTotal
        setGrandTotal(parseInt(dataCarts.price) + parseInt(shipping[0]));

    }

    return (
        <>
            <Head>
                <title>Checkouts - phone Store - Where Developer Shopping</title>
            </Head>
            <LayoutWeb>

                <div className="container mt-80 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                
                                <div className="card border-0 rounded-3 shadow-sm">
                                    <div className="card-header">
                                        <i className="fa fa-shopping-cart"></i> Shipping Information
                                    </div>
                                    <div className="card-body">

                                        <div className="mb-3">
                                            <label className="mb-2 fw-bold">Province</label>
                                            <select className="form-select" onChange={(e) => getCityByProvince(e.target.value)}>
                                                <option value="">-- Select Province --</option>
                                                {
                                                    provinces.map((province, index) => (
                                                        <option key={index} value={province.id}>{province.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="mb-2 fw-bold">City</label>
                                            <select className="form-select" onChange={(e) => showCourierExpedition(e.target.value)}>
                                                <option value="">-- Select City --</option>
                                                {
                                                    cities.map((city, index) => (
                                                        <option key={index} value={city.id}>{city.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        {showCourier &&
                                            <div className="mb-3">
                                                <label className="mb-2 fw-bold">Shipping Expedition</label>
                                                <br />
                                                <div className="form-check">


                                                    <label className="form-check-label font-weight-bold me-5" htmlFor="ongkos_kirim_tiki">
                                                        <input className="form-check-input select-courier" name="courier" type="radio" id="ongkos_kirim_tiki" value="tiki" onChange={checkOngkir} />
                                                        TIKI
                                                    </label>

                                                    <label className="form-check-label font-weight-bold" htmlFor="ongkos_kirim_pos">
                                                        <input className="form-check-input select-courier" name="courier" type="radio" id="ongkos_kirim_pos" value="pos" onChange={checkOngkir} />
                                                        POS
                                                    </label>

                                                </div>
                                            </div>
                                        }

                                        {isLoading &&
                                            <div className="justify-content-center mb-3 text-center">
                                                <div className="spinner-border text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <h6 className="mt-2">Loading...</h6>
                                            </div>
                                        }

                                        {showOngkir &&
                                            <div className="mb-3" v-if="courier.showService">
                                                <hr />
                                                <label className="fw-bold">Shipping Cost</label>
                                                <br/>
                                                <div className="form-check form-check-inline mt-2">
                                                    {
                                                        ongkirs.map((ongkir, index) => (
                                                            <label className="form-check-label font-weight-normal me-5" htmlFor={ongkir.service} key={index}>
                                                                <input className="form-check-input" id={ongkir.serrvice} type="radio" name="cost" value={`${ongkir.cost[0].value}|${ongkir.service}`} onChange={getServiceAndCost} />
                                                                {ongkir.service} - Rp. {FormatPrice(ongkir.cost[0].value)}
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }

                                        <div className="mb-3">
                                            <label className="mb-2 fw-bold">Address</label>
                                            <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" placeholder="Address"></textarea>
                                        </div>

                                    </div>
                                </div>

                                <div className="card border-0 rounded-3 shadow-sm mt-3 mb-3">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 mt-0">
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '25%' }}>Total Orders</td>
                                                        <td style={{ width: '1%' }}>:</td>
                                                        <td><strong>Rp. {FormatPrice(dataCarts.price)}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%' }}>Shipping Cost</td>
                                                        <td style={{ width: '1%' }}>:</td>
                                                        <td><strong>Rp. {FormatPrice(courierCost)}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%' }}>Grand Total</td>
                                                        <td style={{ width: '1%' }}>:</td>
                                                        <td><strong>Rp. {FormatPrice(grandTotal)}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <StoreCheckout    
                                    provinceID={provinceID}
                                    cityID={cityID}
                                    courierName={courierName}
                                    courierService={courierService}
                                    courierCost={courierCost}
                                    weight={dataCarts.weight}
                                    grandTotal={grandTotal}
                                    address={address}
                                />    

                            </div>
                        </div>
                    </div>
                </div>

            </LayoutWeb>
        </>
    )

}