import * as Constants from './../constants'

import jwt_decode from "jwt-decode";
import {setGame} from '../mainPage/GameProvider'
import {setLevel} from '../levelsPage/LevelProvider'

const createTokenProvider = () => {

    let _token = JSON.parse(localStorage.getItem(Constants.TOKENT_AUTH)) || null

    const setToken =(token) => {
        _token = token
        // if token is not null
        if(token) {
            localStorage.setItem(Constants.TOKENT_AUTH, JSON.stringify(token))
        }
        // if token is null we want to clean the storage
        else {
            localStorage.removeItem(Constants.TOKENT_AUTH)
        }
    }

    const isExpired = (token) => {
        var decoded = jwt_decode(token);
        // return true if we passed the expiration date
        return decoded.exp < Date.now() / 1000 // convert miliseconds to seconds
    }

    const getToken =() => {
        if(!_token){
            return null
        }
        // when you have refresh_token use it here
        if(isExpired(_token)){
            setToken(null)
            setGame(null)
            setLevel(null)
            return null
        }
        return _token  
    }

    const isLoggedIn =()=> {
        return !!getToken() // !! - converts an object to boolean, if it is null/undifined it will return flase, otherwise true
    }

     return {
         getToken,
         isLoggedIn,
         setToken,
    };
}

export const {getToken, setToken, isLoggedIn} = createTokenProvider();

