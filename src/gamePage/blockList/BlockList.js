
// import * as PIXI from 'pixi.js';

import { useState, useEffect } from "react";
import { getToken } from '../../userManagment/authorization';
import { getGame } from '../../mainPage/GameProvider';
import * as Constants from '../../constants';
import React from 'react';

function BlockList(props) {

    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        async function get_game_blocks(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + getToken() },
            };
            const response = await fetch(`${Constants.SERVER_API}/games/get/${getGame()}/blocks`, requestOptions)
            if (response.ok) {
                const game_blocks = await response.json();
                await setBlocks(game_blocks)
            }
        }
        get_game_blocks()
    }, []);


    return (
        <div>
            <p> Block list </p>
            {blocks.map((block) => {return block._id})}
        </div>
      );
}

export default BlockList;