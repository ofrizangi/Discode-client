import './App.css';
import Register from './userManagment/Register';
import Login from './userManagment/Login';
import Home from './Home';
import Games from './mainPage/Games';
import Levels from './levelsPage/Levels';
import GamePage from './gamePage/GamePage'
import ForumPage from './forumPage/ForumPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { isLoggedIn } from './userManagment/authorization';
import { useState } from 'react';
import React from 'react';

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
               <Route path='/game' element={<GamePage/>}></Route>
               <Route path='/forum' element={<ForumPage/>}></Route>

              </Routes>
            }
        </BrowserRouter>  
      </div>
    );
}

export default App;
