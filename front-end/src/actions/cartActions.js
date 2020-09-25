import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_ADD_ITEM_FAIL,
    CART_REMOVE_ITEM_FAIL,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT
} from "../components/constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch) => {
    try {
        const {data} = await axios.get('/api/products/' + productId);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                numInStock: data.numInStock,
                qty
            }
        });
    } 
    catch (error) {
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload: error.message
        });
    }
}

const removeFromCart = (productId) => (dispatch) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: productId
        }); 
    } 
    catch (error) {
        dispatch({
            type: CART_REMOVE_ITEM_FAIL,
            payload: error.message
        });
    } 
}

const saveShipping = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING,
        payload: data
    });
}

const savePayment = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT,
        payload: data
    });
}

export {
    addToCart,
    removeFromCart,
    saveShipping,
    savePayment
}