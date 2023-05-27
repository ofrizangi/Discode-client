import { Link, useNavigate } from 'react-router-dom'
import React,{useRef } from 'react';
import Field from './Field.js';
import {setToken} from './authorization'
import Login from './Login.js';


function Register(props) {

    let name = useRef(null);
    let password = useRef(null);
    let confirm_password = useRef(null);
    let age = useRef(null);
    let email = useRef(null);
    const navigate = useNavigate();

    async function add_user_to_db(event) {
        event.preventDefault();
        let user = {name : name.current.value , age : age.current.value , password: password.current.value ,confirm_password: confirm_password.current.value, email:email.current.value }
        console.log(user)
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/users/register`, requestOptions);
        if(response.ok){
            const token_json = await response.json()
            setToken(token_json.token)
            props.setIsLogged(true)
            navigate('/')
        }
        else{
            const res = await response.json()
            var string_msg = res.message;
            if(typeof(res.message) == Object){
                string_msg = res.message.toString()
            }
            props.setError(string_msg)
        }
    }

    function goto_login(){
        props.setError("")
        props.setFormComponent(<Login setIsLogged={props.setIsLogged} setFormComponent={props.setFormComponent} setError={props.setError}></Login>)
    }

    return (
        <div className='p-3 mb-5 bg-white rounded form'>
            <h1 className="header title"> REGISTRATION </h1>
            <form method='post' onSubmit={add_user_to_db}>
                <Field type={"text"} field_name = {"User Name"} ref={name} /> 
                <Field type={"password"} field_name = {"Password"} ref={password} /> 
                <Field type={"password"} field_name = {"Confirm Password"} ref={confirm_password} /> 
                <Field type={"number"} field_name = {"Age"} ref={age} /> 
                <Field type={"email"} field_name = {"Email"} ref={email} /> 
                <button type="submit" className="btn btn-primary" > Register </button>
                <div className="form-text">
                    Already have an account?&nbsp; 
                    <span className="link" onClick={goto_login}>Log in</span>
                </div>
            </form>
        </div>
    );
}
export default Register;