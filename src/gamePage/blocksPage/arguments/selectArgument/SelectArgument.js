import { useState, useEffect } from "react";
import { post_argument } from '../argumentsAPI';
import * as Constants from '../../../../constants';


function SelectArgument(props) {

    const row = props.row
    const list_number = props.list_number
    const index = props.index
    const commands = props.commands
    const setCommands = props.setCommands
    const command_index = commands.findIndex(value => value._id === row._id)

    const [selected, setSelected] = useState(row.arguments[list_number][index])

    useEffect(() => {
        setSelected(commands[command_index].arguments[list_number][index])
    }, [commands, command_index, index, list_number]);


    function set_argument(event){
        setSelected(event.target.value)
        commands[command_index].arguments[list_number][index] = event.target.value
        setCommands(commands)
        post_argument(row._id, index, list_number, event.target.value)
    }

    return (
        <span>
            <select className="select-input" id={Constants.ARGUMENTS_IDENTIFIER} value={(selected === null || selected === undefined) ? "default" : selected} onChange={set_argument}>
                <option disabled value={"default"} > ---- </option>
                {props.options.map((option) => {return <option key={option} value={option}>{option}</option>})}
            </select>
        </span>
    );
}
export default SelectArgument;