
import { useState, useEffect } from 'react';
import { get_game_level_data, get_level_commands} from './gamesAPI';
import GameBoard from './gameBoard/GameBoard';
import BlockPage from './blocksPage/BlocksPage';
import CodeEditorPage from './codeEditorPage/CodeEditorPage';
import React from 'react';
import './game.css'
import { getGame } from '../mainPage/GameProvider';
import OutputWindow from './codeEditorPage/OutputWindow';
import LeftSelection from './LeftSelection'
import CodeEditorWindow from './codeEditorPage/CodeEditorWindow';
import * as Constants from '../constants';


function GamePage() {

    // contains the data of this specific game level
    const [gameLevel, setGameLevel] = useState(null)
    const [commands , setCommands ] = useState(null)
    const [solution , setSolution ] = useState(null)
    const [code, setCode] = useState(null)
    const [leftSideView, setLeftSideView] = useState(getGame() === Constants.CODER_GAME ? Constants.EDITOR_VIEW : Constants.BLOCKS_VIEW)


    useEffect(() => {
        async function set_game(){
            const my_level = await get_game_level_data()
            setGameLevel(my_level)
        }
        set_game()
    }, []);

    useEffect(() => {
        
        async function set_commands_server(){
            if(gameLevel !== null && solution === null){
                const level_commands = await get_level_commands();
                setSolution(gameLevel.solution.map(row => row._id.id))
                setCommands(level_commands)
                setCode(gameLevel.editor_code)
            }
        }

        set_commands_server()

    }, [gameLevel]);


    return (
        <div>
            { gameLevel !== null &&
                <div className="row d-none d-md-flex game-page">
                    <div className='col-7'>

                        { gameLevel.blocks.length !== 0 && (
                            <LeftSelection setLeftSideView={setLeftSideView}/>)}


                        { getGame() === Constants.CODER_GAME ? code !== null && <div className="coder-editor"> <CodeEditorWindow code={code} setCode={setCode} ></CodeEditorWindow> </div> :
                            leftSideView === Constants.BLOCKS_VIEW ?  
                            (commands !== null && <BlockPage gameLevel={gameLevel} commands={commands} setCommands={setCommands} solution={solution} setSolution={setSolution} setGame={setGameLevel}></BlockPage>) : 
                            (code !== null && <CodeEditorPage code={code} setCode={setCode} gameLevel={gameLevel} setGame={setGameLevel} commands={commands} solution={solution} setSolution={setSolution}></CodeEditorPage>)
                        }
                    </div>

                    <div className="col-5">
                        {
                            (getGame() === Constants.CODER_GAME ? <OutputWindow code={code} game={gameLevel} setGame={setGameLevel} setSolution={setSolution}></OutputWindow> :
                            <GameBoard game={gameLevel} setGame={setGameLevel} commands={commands} solution={solution} code={code} leftSideView={leftSideView} setSolution={setSolution} setCommands={setCommands}/>) }
                    </div>
                    <div id="model"></div>
                </div>
            }
        </div>
    );
}
  
export default GamePage;