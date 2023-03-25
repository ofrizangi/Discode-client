
import './../arguments.css'

import { useState , useEffect} from 'react';
import { post_argument } from '../argumentsAPI';
import * as Constants from '../../../../constants';

function NumberArgument(props) {

    const row = props.row
    const index = props.index
    const commands = props.commands
    const setCommands = props.setCommands
    const command_index = commands.findIndex(value => value._id === row._id)


    const [val, setVal] = useState(row.arguments[index] )

    
    useEffect(() => {
        setVal(commands[command_index].arguments[index])
    }, [commands, command_index, index]);

    function set_argument(event){
        setVal(event.target.value)
        console.log(event.target.value)
        commands[command_index].arguments[index] = event.target.value
        setCommands(commands)
        if(row._id === null){
            setTimeout(() => {
                post_argument(row._id, index, event.target.value)
              }, 1000);
        }
        else {
            post_argument(row._id, index, event.target.value)
        }
    }

    return (
        <span>
            {console.log(row._id,commands, val)}
            <input id={Constants.ARGUMENTS_IDENTIFIER} type="number" className="number" value={(val === null || val === undefined) ? "" :val} onChange={set_argument}/>
        </span>
    );

}


export default NumberArgument;