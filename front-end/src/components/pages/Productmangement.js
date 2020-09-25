import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveProduct,
  listProducts,
  deleteProduct
} from '../../actions/productActions';
import './Productmangement.css';
import Loader from '../Loader'

function ProductMangement(props) {
    const [_id, setId] = useState('');
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [material, setMaterial] = useState("");
    const [category, setCategory] = useState("");
    const [numInStock, setNumInStock] = useState("");
    const [description, setDescription] = useState("");
    const [modal, setModal] = useState(false);

    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    const productSave = useSelector((state) => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = productSave;
   

    const productDelete = useSelector((state) => state.productDelete);
    const {
        success: successDelete
    } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        if(successSave) {
            setModal(false);
        }
    return () => {
        //
    };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModal(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setMaterial(product.material);
        setCategory(product.category);
        setNumInStock(product.numInStock);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveProduct({
                name,
                price,
                image,
                material,
                category,
                numInStock,
                description,
            })
        );
    };

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };


    return (
    <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button className="waves-effect waves-light btn modal-trigger" onClick={() => openModal({})}>Create Product</button>
        </div>
        {modal &&
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create Product</h2>
                    </li>
                    <li>
                        {loadingSave && <Loader/>}
                        {errorSave && <span className="new badge red">{errorSave}</span>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="material">Material</label>
                        <input type="text" name="material" value={material} id="material" onChange={(e) => setMaterial(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="numInStock">InStock</label>
                        <input type="text" name="numInStock" value={numInStock} id="numInStock" onChange={(e) => setNumInStock(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="name">Category</label>
                        <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}/>
                    </li>
                    <li>
                        <button type="submit" className="waves-effect waves-light btn-small manage-button">{_id ? "Update":"Create"}</button>
                        <button type="button" onClick={() => setModal(false)} className="waves-effect waves-light btn-small manage-button">Back</button>
                    </li>
                </ul>
            </form>
        </div>
        }
  
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Material</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.material}</td>
                        <td>
                            <button className="waves-effect waves-light btn-small table-button" onClick={() => openModal(product)}><i className="material-icons">edit</i></button>
                            <button className="waves-effect waves-light btn-small table-button" onClick={() => deleteHandler(product)}><i className="material-icons">delete</i></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default ProductMangement;
