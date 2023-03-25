

import * as Constants from '../../constants';

import { translate_blocks } from '../CodeCreator';
import DancePlayer from './DancePlayer';

import {React, useState} from 'react';

import {sloved_game, restart_game} from '../gamesAPI';

import CodeModal from '../../alerts/CodeModal'
import CompilationError from '../../alerts/CompilationError';

function GameBoard(props) {


    const [modalOpen, setModelOpen] = useState(false)
    const [compilationOpen, setCompilationOpen] = useState(false)

    const [text, setText] = useState("")

    async function solve() {
        const my_game = await sloved_game()
        await props.setGame(my_game)
    }


    async function get_code(){
        const code = await translate_blocks()
        setText(code)
        if(code.includes(Constants.COMPILATION_ERROR)){
            alert(code)
        }
        else {
            setModelOpen(true)
            console.log(code)
            if(!code.includes(Constants.COMPILATION_ERROR)){
                await solve()
            }
        }
    }

    async function restart() {
        const my_game = await restart_game()
        await props.setGame(my_game)
    }

    return (
        <div>
            <p> Game Board </p>
            <DancePlayer/>            
            {props.game !== null && <button className='btn btn-success' onClick={get_code}> Run game</button>}
            {props.game !== null && <button className='btn btn-danger' onClick={restart}> Restart level</button>}
            {modalOpen && <CodeModal text={text} modalOpen={modalOpen} setModalOpen={setModelOpen} />}
            {compilationOpen && <CompilationError text={text}/>}

        </div>
    );
}

export default GameBoard;