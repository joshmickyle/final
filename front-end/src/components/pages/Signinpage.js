import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Formpages.css";
import { Link } from "react-router-dom";
import { signin } from "../../actions/userActions";
import Loader from "../Loader";
import Checkout from "../Checkout";

function SigninPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div>
      <Checkout step1 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Sign-In</h2>
            </li>
            <li>
              {loading && <Loader />}
              {error && <span class="new badge red">{error}</span>}
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                className="validate"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </li>
            <li>
              <button
                type="submit"
                className="waves-effect waves-light btn-small form-btn"
              >
                Signin
              </button>
            </li>
            <li>New?</li>
            <li>
              <Link
                to={
                  redirect === "/"
                    ? "register"
                    : "register?redirect=" + redirect
                }
                className="button secondary text-center"
              >
                Create your account here
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
