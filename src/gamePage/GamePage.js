
import { useState, useEffect } from 'react';
import { get_game_level_data, get_level_commands , restart_game} from './gamesAPI';
import GameBoard from './gameBoard/GameBoard';
import BlockPage from './blocksPage/BlocksPage';
import CodeEditorPage from './codeEditorPage/CodeEditorPage';
import React from 'react';
import './game.css'
import { getGame } from '../mainPage/GameProvider';
import OutputWindow from './codeEditorPage/OutputWindow';
import LeftSelection from './LeftSelection'
import CodeEditorWindow from './codeEditorPage/CodeEditorWindow';

import restart_img from './../images/reloading.png'


function GamePage(props) {

    // contains the data of this specific game level
    const [gameLevel, setGameLevel] = useState(null)
    const [commands , setCommands ] = useState(null)
    const [solution , setSolution ] = useState(null)
    const [code, setCode] = useState(null)
    const [leftSideView, setLeftSideView] = useState(getGame() === "coder" ? "editor" : "blocks")

    useEffect(() => {
        async function set_game(){
            const my_level = await get_game_level_data()
            setGameLevel(my_level)
        }
        set_game()
    }, []);

    useEffect(() => {
        async function set_commands(){
            if(gameLevel !== null){
                const level_commands = await get_level_commands();
                setCommands(level_commands)
                setSolution(gameLevel.solution.map(row => row._id.id))
                setCode(gameLevel.editor_code)
            }
        }
        set_commands()
    }, [gameLevel]);


    return (
        <div>
            { gameLevel !== null &&
                <div className="row d-none d-md-flex">
                    <div className='col-6'>

                        { gameLevel.blocks.length !== 0 && (
                                    <LeftSelection setLeftSideView={setLeftSideView}/>)
                                }


                        { getGame() === "coder" ? code !== null && <div className="coder-editor"> <CodeEditorWindow code={code} setCode={setCode} ></CodeEditorWindow> </div> :
                            leftSideView === 'blocks' ?  
                            (commands !== null && solution!==null && <BlockPage gameLevel={gameLevel} commands={commands} setCommands={setCommands} solution={solution} setSolution={setSolution} setGame={setGameLevel}></BlockPage>) : 
                            (code !== null && <CodeEditorPage code={code} setCode={setCode} gameLevel={gameLevel} setGame={setGameLevel} commands={commands} solution={solution}></CodeEditorPage>)
                        }

                    </div>

                    <div className="col-6">
                        {gameLevel !== null && 
                            (getGame() === "coder" ? <OutputWindow code={code} game={gameLevel} setGame={setGameLevel}></OutputWindow> :
                            <GameBoard game={gameLevel} setGame={setGameLevel} commands={commands} solution={solution} code={code} leftSideView={leftSideView}/>) }
                    </div>
                    <div id="model"></div>
                </div>
            }
        </div>
    );
}
  
export default GamePage;