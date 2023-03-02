
import { useRef} from 'react';
import { getGame } from "../mainPage/GameProvider";
import * as Constants from '../constants';

import {getToken } from '../userManagment/authorization';



function NewText(props) {

    let input = useRef()

    async function postQustion(txt) {

        let qustion = {content:txt}
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
            body: JSON.stringify(qustion),
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/forum/${props.req}`, requestOptions);
        if(response.ok){
            props.get_questions_and_answers()
        }
        else{
            const res = await response.json()
            var string_msg = res.message;
            if(typeof(res.message) == Object){
                string_msg = res.message.toString()
            }
            alert(string_msg)
        }
    }


    const uploadText = (event) => {
        let txt = input.current.value
        input.current.value = ''
        if (txt!==""){
            postQustion(txt)}
      }

      const checkIfEnter = function (event) {
        if (event.key === 'Enter')
        uploadText()
    }

    return (
        <span>
        <input type="text" className="form-control shadow-none" placeholder={props.msg} aria-label={props.msg}
            ref={input} onKeyDown={checkIfEnter}></input>
        <i className="bi bi-send icon-send" onClick={uploadText}></i>
        </span>
      );
  }
  
  export default NewText;