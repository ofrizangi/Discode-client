
import { useState, useEffect } from 'react';
import { get_game_level_data, get_level_commands } from './gamesAPI';
import GameBoard from './gameBoard/GameBoard';
import BlockPage from './blocksPage/BlocksPage';
import CodeEditorWindow from './codeEditorPage/CodeEditorWindow';


import React from 'react';
import './game.css'
import { getGame } from '../mainPage/GameProvider';
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
                setSolution(gameLevel.solution)
                setCode(gameLevel.editor_code)
            }
        }
        set_commands()
    }, [gameLevel]);

    
    return (
        <div>
            <h1> Game page </h1>
            { gameLevel !== null &&
                <div className="row d-none d-md-flex">
                    <div className='col-6'>
                        { gameLevel.blocks !== [] &&
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="blocks" autocomplete="off" checked />
                                <label id="blocks" className="btn btn-outline-primary" for="blocks" onClick={(event)=>{setLeftSideView(event.currentTarget.id)}}>Blocks</label>
                        
                                <input type="radio" className="btn-check" name="btnradio" id="editor" autocomplete="off" />
                                <label id="editor" className="btn btn-outline-primary" for="editor" onClick={(event)=>{setLeftSideView(event.currentTarget.id)}}>Editor</label>
                            </div>
                        }

                        {leftSideView === 'blocks' ?  
                            (commands !== null && solution!==null && <BlockPage gameLevel={gameLevel} commands={commands} setCommands={setCommands} solution={solution} setSolution={setSolution}></BlockPage>) : 
                            (code !== null && <CodeEditorWindow code={code} setCode={setCode}></CodeEditorWindow>)}

                        
                        {gameLevel.video !== undefined ? <video className="gdriveVideo" preload="auto"  width="300" height="250" controls>
                        <source src={gameLevel.video_src} type='video/mp4'/>
                        </video> : <div/>}   
                    </div>
                    <div className="col-6">
                         <GameBoard game={gameLevel} setGame={setGameLevel} commands={commands} solution={solution}/>
                    </div>
                    <div id="model"></div>
                </div>
            }
        </div>
      );
}
  
export default GamePage;