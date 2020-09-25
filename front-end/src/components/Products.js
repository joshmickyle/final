import React, { useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from './Loader'

function Products(props) {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {
          //
        };
    }, []);
    return loading ? (<Loader/>)
        :error ? (<span className="new badge red">{error}</span>) : (
        <div className='content'>
          <ul className='grid'>
            {products.map(product =>
                <li key={product._id}>
                    <div className='product'>
                        <Link to={'/product/'+ product._id}>
                          <div className='overflow'><img src={product.image} alt='product item' className='product-img'/></div>
                        </Link>
                        <Link to={'/product/'+ product._id}>
                          <div className='product-name'>{product.name}</div>
                        </Link>
                        <div className='product-material'>{product.material}</div>
                        <div className='product-price'>R{product.price}</div>
                        <div className='product-status'>{product.numInStock > 0 ? 'Stocked': 'Sorry, out of stock'}</div>
                    </div>
                </li>
            )}
          </ul>
        </div>
    )
}

export default Products