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
import ExplanationPage from './explanationPage/ExplenationPage';

function App() {

  const [isLogged, setIsLogged] = useState(isLoggedIn());

  return (
      <div className="App">
        <BrowserRouter>
            {!isLogged && 
              <Routes>
              <Route path='/' element={<Home setIsLogged={setIsLogged}/>}></Route>
            </Routes>
            }
            {isLogged && 
              <Routes>
               <Route path='/' element={<Games setIsLogged= {setIsLogged}/>}></Route>
               <Route path='/levels' element={<Levels/>}></Route>
               <Route path='/explanation' element={<ExplanationPage/>}></Route>
               <Route path='/game' element={<GamePage/>}></Route>
               <Route path='/forum' element={<ForumPage/>}></Route>

              </Routes>
            }
        </BrowserRouter>  
      </div>
    );
}

export default App;
