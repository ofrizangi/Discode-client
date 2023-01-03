import './App.css';
import Register from './userManagment/Register';
import Login from './userManagment/Login';
import Home from './Home';
import Games from './Games';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { isLoggedIn } from './userManagment/authorization';
import { useState } from 'react';
import Levels from './Levels';


function App() {

  const [isLogged, setIsLogged] = useState(isLoggedIn());

  return (
      <div className="App">
        <BrowserRouter>
        {console.log(isLogged)}
            {!isLogged && 
              <Routes>
              <Route path='/' element={<Home/>}></Route>    
              <Route path="/login" element={<Login setIsLogged={setIsLogged}/>}></Route>
              <Route path='/register'element={<Register setIsLogged={setIsLogged}/>}></Route>
            </Routes>
            }
            {isLogged && 
              <Routes>
               <Route path='/' element={<Games setIsLogged= {setIsLogged}/>}></Route>
               <Route path='/levels' element={<Levels/>}></Route>
              </Routes>
            }
        </BrowserRouter>  
      </div>
    );
}

export default App;
