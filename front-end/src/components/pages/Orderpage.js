import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../Checkout';
import './Orderpage.css'


function OrderPage(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;
    if (!shipping.address) {
        props.history.push("/shipping");
    }
    else if (!payment) {
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 1500 ? 0 : 10;
    const taxPrice = 0.18 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {
        // create an order
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
                <div className="placeorder">
                    <div className="placeorder-info">
                        <div>
                            <h3>Shipping</h3>
                                <div>
                                    {cart.shipping.address},
                                    {cart.shipping.city},
                                    {cart.shipping.postalCode}
                                </div>
                        </div>
                        <div>
                            <h3>Payment</h3>
                                <div>
                                    Payment Method: {cart.payment.paymentMethod}
                                </div>
                        </div>
                        <div>
                            <ul className="cart-list-container">
                                <li>
                                    <h3>Shopping Cart</h3>
                                        <div>Price</div>
                                </li>
                                {
                                    cartItems.length === 0 ?
                                        <div>Cart is empty</div>
                                        :
                                        cartItems.map(item =>
                                            <li>
                                                <div className="cart-image">
                                                    <img src={item.image} alt="product" />
                                                </div>
                                                <div className="cart-name">
                                                    <div>
                                                        <Link to={"/product/" + item.product}>{item.name}</Link>
                                                    </div>
                                                    <div>
                                                        Qty: {item.qty}
                                                    </div>
                                                </div>
                                                <div className="cart-price">
                                                    R{item.price}
                                                </div>
                                            </li>
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="placeorder-action">
                        <ul>
                            <li>
                                <button className="waves-effect waves-light btn-small order-btn" onClick={placeOrderHandler}>Place Order</button>
                            </li>
                            <li>
                                <h3>Order Summary</h3>
                            </li>
                            <li>
                                <div>Items</div>
                                <div>R{itemsPrice}</div>
                            </li>
                            <li>
                                <div>Shipping</div>
                                <div>R{shippingPrice}</div>
                            </li>
                            <li>
                                <div>After Tax</div>
                                <div>R{taxPrice}</div>
                            </li>
                            <li>
                                <div>Order Total</div>
                                <div>R{totalPrice}</div>
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
    )

}

export default OrderPage;