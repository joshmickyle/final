import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';
import './Formpages.css';
import Loader from '../Loader';


function Registerpage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

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
        dispatch(register(name, email, password));
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li><h2>Create Account</h2></li>
                    <li>
                        {loading && <Loader/>}
                        {error && <span class="new badge red">{error}</span>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required minLength='6'/>
                    </li>
                    <li>
                        <label htmlFor="rePassword">Re-Enter Password</label>
                        <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} minLength='6'/>
                    </li>
                    <li>
                        <button type="submit" className="waves-effect waves-light btn-small form-btn">Register</button>
                    </li>
                    <li>
                        Already have an account? <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="waves-effect waves-light btn-small second-form-btn">Sign-in</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Registerpage
