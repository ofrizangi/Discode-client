import { getGame } from "../mainPage/GameProvider";
import * as Constants from '../constants';

import {useState, useEffect } from 'react';

import {getToken } from '../userManagment/authorization';
import Question from './Question'
import NewText from "./NewText";
import React from 'react';

function Forum(props) {

    const [forum, setForum] = useState([])

    async function get_questions_and_answers(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/forum/getAll`, requestOptions)
        if (response.ok){
            const forum = await response.json();
            setForum(forum)
        }
    }

    useEffect(() => {
        get_questions_and_answers()
    }, []);



    return (
        <div>
            <h1>forum of {getGame()}</h1>

           
            <NewText msg="publish a new qustion" get_questions_and_answers = {get_questions_and_answers} req = "postQuestion"/>
            {forum.map((question) => {
                    return <div>
                        <Question key={question._id}  txt={question}/>
                        <NewText msg="publish a new answer" get_questions_and_answers = {get_questions_and_answers} req = {"postAnswer/" + question._id}/>
                    </div>
                })
            }
        










        </div>
      );
  }
  
export default Forum;

