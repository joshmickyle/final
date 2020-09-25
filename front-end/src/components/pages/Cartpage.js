import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import './Cartpage.css';
import { Link } from 'react-router-dom';

function CartPage(props) {

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]):1;

    const dispatch = useDispatch();


    useEffect(() => {
        if (productId){
            dispatch(addToCart(productId, qty))
        }
    }, [])

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        props.history.push('/signin/')
    }

 

    return (
        <div className='cart'>
            <div classname='cart-list'>
                <ul className='cart-list-container'>
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ? <div>Cart is empty</div> :
                        cartItems.map(item => 
                            <div>
                                <img className='cart-image' src={item.image} alt='product' />
                                <div className='cart-name'>
                                    <div>
                                        <Link to={'/product/' + item.productId}></Link>
                                        {item.name}
                                    </div>
                                    <div>
                                        Qty:
                                        <select className="browser-default" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                        <button type='button' className='waves-effect waves-light btn-small cart-button' onClick={() => removeFromCartHandler(item.product)}><i className="material-icons">delete</i></button>
                                    </div>
                                    <div className='cart-price'>R {item.price}</div>
                                </div>
                            </div>
                        )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal for {cartItems.reduce((a, c) => a + c.qty, 0)} item(s)
                    :
                    R {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button onClick={checkoutHandler} className="waves-effect waves-light btn-small cart-button" disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button> 
            </div>
        </div>
    )
}

export default CartPage;