import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL 
} from "../components/constants/productConstants";
import axios from 'axios';

// listing products
const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST 
        });
        const {data} = await axios.get('/api/products');
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });  
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        });
    } 
}

// pulling out a prouct from products
const descriptionProduct = (productId) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
            payload: productId
        });
        const {data} = await axios.get('/api/products/' + productId);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        });
    }
};

// Adding and updating products
const saveProduct = (product) => async (dispatch) => {
    const config = {
        headers: {'Content-Type': 'application/json'}
    };

    try {
        dispatch({
            type: PRODUCT_SAVE_REQUEST,
            payload: product
        });
        
        if (!product._id) {
            const {data} = await axios.post('/api/products', product, config);
            dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: data
            });
        } else {
            const {data} = await axios.put('/api/products/' + product._id, product, config);
            dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        dispatch({
            type: PRODUCT_SAVE_FAIL,
            payload: err.response.msg
        });
    }
};

// deleting product
const deleteProduct = (productId) => async (dispatch) => {
    const config = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
            payload: productId
        });
        const {data} = await axios.delete('/api/products/' + productId, config);
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
            success: true
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message
        });
    }
}

export {
    listProducts,
    descriptionProduct,
    saveProduct,
    deleteProduct
};