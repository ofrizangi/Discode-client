
import './../arguments.css'

import { useState , useEffect} from 'react';
import { post_argument } from '../argumentsAPI';
import * as Constants from '../../../../constants';

function NumberArgument(props) {

    const row = props.row
    const list_number = props.list_number
    const index = props.index
    const commands = props.commands
    const setCommands = props.setCommands
    const command_index = commands.findIndex(value => value._id === row._id)

    const [val, setVal] = useState(row.arguments[list_number][index])

    
    useEffect(() => {
        setVal(commands[command_index].arguments[list_number][index])
    }, [commands, command_index, index, list_number]);

    function set_argument(event){
        setVal(event.target.value)
        commands[command_index].arguments[list_number][index] = event.target.value
        setCommands(commands)
        post_argument(row._id, index, list_number, event.target.value)
    }

    return (
        <span>
            <input id={Constants.ARGUMENTS_IDENTIFIER} type="number" min="1" className="number-input" value={(val === null || val === undefined) ? "" :val} onChange={set_argument}/>
        </span>
    );

}


export default NumberArgument;