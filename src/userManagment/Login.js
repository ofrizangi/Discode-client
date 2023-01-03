import { Link, useNavigate } from 'react-router-dom'
import { React, useRef } from 'react';
import Field from './Field.js';
import * as Constants from '../constants';
import {setToken} from './authorization'

function Login(props) {

    let userName = useRef(null);
    let password = useRef(null);
    const navigate = useNavigate();


    async function login_user(event) {
        event.preventDefault();
        let user = {name : userName.current.value ,password: password.current.value }
        console.log(user)
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
        const response = await fetch(`${Constants.SERVER_API}/users/login`, requestOptions);
        if(response.ok){
            const json_token =  await response.json()
            setToken(json_token.token)
            props.setIsLogged(true)
            navigate('/')
        }
        else{
            alert("invalid user name or password")
        }
    }

    return (
        <div>
            <div id="sign" className='col-6 center shadow-lg p-3 mb-5 bg-white rounded'>
                <h1> Sign in</h1>
                <form method='post' onSubmit={login_user}>
                    <Field type={"text"} field_name = {"User Name"} ref={userName} /> 
                    <Field type={"password"} field_name = {"Password"} ref={password} /> 
                    <button type="submit" id="btn" className="btn btn_start btn-primary" > Login</button>
                    <div className="link"> Don't have an account? Click here to&nbsp;
                        <Link to='/register'>register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;