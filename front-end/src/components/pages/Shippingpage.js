import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../../actions/cartActions';
import Checkout from '../Checkout';
import './Formpages.css';

function ShippingPage(props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode}));
        props.history.push('payment');
    }
    return (
        <div>
            <Checkout step1 step2 />
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Shipping</h2>
                            </li>
                            <li>
                                <h6><b>Please Note:</b> We unfortunately only do shipping locally at the moment</h6>
                            </li>
                            <li>
                                <label htmlFor="address">Address</label>
                                    <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}/>
                            </li>
                            <li>
                                <label htmlFor="city">City</label>
                                    <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}/>
                            </li>
                            <li>
                                <label htmlFor="postalCode">Postal Code</label>
                                    <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}/>
                            </li>
                            <li>
                                <button type="submit" className="waves-effect waves-light btn-small form-btn">Continue</button>
                            </li>
                        </ul>
                    </form>
                </div>
        </div>
    )
}
export default ShippingPage;