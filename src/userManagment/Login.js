import {useNavigate } from 'react-router-dom'
import React ,{useRef, useState } from 'react';
import Field from './Field.js';
import {setToken} from './authorization'
import Register from './Register.js';

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
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/users/login`, requestOptions);
        if(response.ok){
            const json_token =  await response.json()
            setToken(json_token.token)
            props.setIsLogged(true)
            navigate('/')
        }
        else{
            props.setError("invalid user name or password")
        }
    }

    function goto_registration(){
        props.setError("")
        props.setFormComponent(<Register setIsLogged={props.setIsLogged} setFormComponent={props.setFormComponent} setError={props.setError}></Register>)
    }


    return (
        <div className='p-3 mb-5 bg-white rounded form'>
            <h1 className="header title"> LOGIN </h1>
            <form method='post' onSubmit={login_user}>
                <Field type={"text"} field_name = {"User Name"} ref={userName} /> 
                <Field type={"password"} field_name = {"Password"} ref={password} />
                <button type="submit" className='btn btn-primary'> Login</button>
                <div className="form-text"> Don't have an account? Click here to&nbsp;
                    <span className="link" onClick={goto_registration}>register</span>
                </div>
            </form>
        </div>
    );
}
export default Login;