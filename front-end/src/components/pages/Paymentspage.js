import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../../actions/cartActions";
import CheckoutSteps from "../Checkout";
import "./Formpages.css";

function PaymentPage(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <label>
                  <input
                    className="browser-default"
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span htmlFor="paymentMethod">Apple pay</span>
                </label>
              </div>
            </li>
            <li>
              <button
                type="submit"
                className="waves-effect waves-light btn-small form-btn"
              >
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentPage;
