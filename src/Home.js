
import React, { useState, useEffect } from 'react';
import Login from './userManagment/Login'
import Register from './userManagment/Register'
import './home.css'
import robot from './images/robot_blocks.png'
import ErrorMessage from './alerts/ErrorMessage';


function Home(props) {

    const [formComponent, setFormComponent] = useState(null)

    const [error, setError] = useState("")

    useEffect(() => {
        setFormComponent(<Login setIsLogged={props.setIsLogged} setFormComponent={setFormComponent} setError={setError}></Login>)
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <span className='image-container'>
                    <img src={robot} alt="robot"/>
                </span>
                <div className='col-7'>
                    <div className='centered-div'>
                        {error !== "" && <ErrorMessage text={error} setError={setError}></ErrorMessage>}
                       {formComponent}
                    </div>
                </div>
                <div className='col-5 right-side'>
                    <div className="page-title">
                        <div className='welcome'> welcome to</div>
                        <div className='discode'> DISCODE</div>
                    </div>
                    <p className='text'> Your chance to enjoy a code party</p>
                </div>
            </div>
        </div>
      )
  }
  
  export default Home