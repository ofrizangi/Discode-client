import { Link } from 'react-router-dom'
import {getToken} from './userManagment/authorization'
import React from 'react';

function Home() {

    return (
        <div>
            { console.log(getToken())}
            <h1> Welcome to Discode </h1>
            <Link to='/register' className="btn btn-primary" >register</Link>
            <Link to='/login' className="btn btn-primary" >login</Link>
        </div>
      )
  }
  
  export default Home