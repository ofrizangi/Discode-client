import * as Constants from '../../../constants';

import NumberArgument from "./numberArgument/NumberArgument";
import SelectArgument from "./selectArgument/SelectArgument";

import NumberArgumentConst from "./numberArgument/NumberArgumentConst";
import SelectArgumentConst from "./selectArgument/SelectArgumentConst";

const createArgumentProvider = () => {

    const getArgument=(arguments_type, list_number, index, row, commands, setCommands) =>{
        const type = arguments_type[list_number][index]
        if(Array.isArray(type)){
            return <SelectArgument options={type} row={row} list_number={list_number} index={index} commands={commands} setCommands={setCommands}/>
        }
        if(type === Constants.NUMBER_ARGUMENT){
            return <NumberArgument row={row} list_number={list_number} index={index} commands={commands} setCommands={setCommands}/>
        }
    }

    const getConstArgument=(arguments_type, list_number, index, row) =>{
        const type = arguments_type[list_number][index]
        if(Array.isArray(type)){
            return <SelectArgumentConst options={type} index={index} row={row} list_number={list_number}/>
        }
        if(type === Constants.NUMBER_ARGUMENT){
            return <NumberArgumentConst row={row} list_number={list_number} index={index}/>
        }
    }

    function getDescriptionList(description){
        return description.split(" ")  
    }

    function getArgumentIndex (index , description_list){
        const partitial_arr = description_list.slice(0, index)
        const filter_arr = partitial_arr.filter(value => value === Constants.ARGUMENTS_IDENTIFIER)
        return filter_arr.length

    }

    return {
        getArgument,
        getConstArgument,
        getDescriptionList,
        getArgumentIndex
    };
}

export const {getArgument, getConstArgument, getDescriptionList, getArgumentIndex} = createArgumentProvider();
