import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { descriptionProduct } from "../../actions/productActions";
import "./Productpage.css";
import Loader from "../Loader";

function ProductPage(props) {
  const [qty, setQty] = useState(1);
  const productDescription = useSelector((state) => state.productDescription);
  const { product, loading, error } = productDescription;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(descriptionProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  // handling add to cart button
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <span class="new badge red">{error}</span>
      ) : (
        <div className="description">
          <div className="description-image">
            <img src={product.image} alt="product" />
          </div>
          <div className="description-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.reviews}) Reviews
              </li>
              <li>
                <b>R {product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="description-action">
            <ul>
              <li>Price: R{product.price}</li>
              <li>
                {product.numInStock > 0
                  ? ""
                  : "Sorry,this is currently out of stock"}
              </li>
              <li>
                Quantity:
                {
                  <select
                    className="browser-default"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.numInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                }
              </li>
              <li>
                {product.numInStock > 0 && (
                  <button
                    class="waves-effect waves-light btn-small product-button"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
