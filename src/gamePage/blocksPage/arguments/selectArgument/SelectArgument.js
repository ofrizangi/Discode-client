import { useState, useEffect } from "react";
import { post_argument } from '../argumentsAPI';
import * as Constants from '../../../../constants';


function SelectArgument(props) {


    const row = props.row
    const index = props.index
    const commands = props.commands
    const setCommands = props.setCommands
    const command_index = commands.findIndex(value => value._id === row._id)

    const [selected, setSelected] = useState(row.arguments[index])

    useEffect(() => {
        setSelected(commands[command_index].arguments[index])
    }, [commands, command_index, index]);


    function set_argument(event){
        setSelected(event.target.value)
        // const command_index = commands.findIndex(value => value._id === row._id)
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
            {/* {console.log("selsel" , selected)} */}
            <select id={Constants.ARGUMENTS_IDENTIFIER} value={(selected === null || selected === undefined) ? "default" : selected} onChange={set_argument}>
                <option disabled value={"default"} > ---- </option>
                {props.options.map((option) => {return <option key={option} value={option}>{option}</option>})}
            </select>
        </span>
    );

}


export default SelectArgument;