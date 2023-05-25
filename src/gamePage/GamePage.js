
import { useState, useEffect } from 'react';
import { get_game_level_data, get_level_commands } from './gamesAPI';
import GameBoard from './gameBoard/GameBoard';
import BlockPage from './blocksPage/BlocksPage';
import CodeEditorPage from './codeEditorPage/CodeEditorPage';
import React from 'react';
import './game.css'
import { getGame } from '../mainPage/GameProvider';
import OutputWindow from './codeEditorPage/OutputWindow';
import CodeEditorWindow from './codeEditorPage/CodeEditorWindow';

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
            { gameLevel !== null &&
                <div className="row d-none d-md-flex">
                    <div className='col-6'>
                        { gameLevel.blocks.length !== 0 && (
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="blocks" autoComplete="off" defaultChecked />
                                <label id="blocks" className="btn btn-outline-primary" htmlFor="blocks" onClick={(event)=>{setLeftSideView(event.currentTarget.id)}}>Blocks</label>
                        
                                <input type="radio" className="btn-check" name="btnradio" id="editor" autoComplete="off" />
                                <label id="editor" className="btn btn-outline-primary" htmlFor="editor" onClick={(event)=>{setLeftSideView(event.currentTarget.id)}}>Editor</label>
                            </div>)
                        }

                        { getGame() === "coder" ? code !== null && <CodeEditorWindow code={code} setCode={setCode} ></CodeEditorWindow> :
                            leftSideView === 'blocks' ?  
                            (commands !== null && solution!==null && <BlockPage gameLevel={gameLevel} commands={commands} setCommands={setCommands} solution={solution} setSolution={setSolution}></BlockPage>) : 
                            (code !== null && <CodeEditorPage code={code} setCode={setCode} gameLevel={gameLevel} commands={commands} solution={solution}></CodeEditorPage>)
                        }

                        { gameLevel.video_src !== undefined && <video key={gameLevel.video_src} className="gdriveVideo" preload="auto" width="300" height="250" controls>
                                                    <source src={gameLevel.video_src} type='video/mp4'/>
                                                </video>
                        }
                    </div>
                    <div className="col-6">
                        {getGame() === "coder" ? <OutputWindow code={code} game={gameLevel} setGame={setGameLevel}></OutputWindow> :
                         <GameBoard game={gameLevel} setGame={setGameLevel} commands={commands} solution={solution} code={code} leftSideView={leftSideView}/> }
                    </div>
                    <div id="model"></div>
                </div>
            }
        </div>
    );
}
  
export default GamePage;