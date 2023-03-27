import * as Constants from '../../../constants';

import NumberArgument from "./numberArgument/NumberArgument";
import SelectArgument from "./selectArgument/SelectArgument";

import NumberArgumentConst from "./numberArgument/NumberArgumentConst";
import SelectArgumentConst from "./selectArgument/SelectArgumentConst";

const createArgumentProvider = () => {

    const getArgument=(arguments_type, index, row, commands, setCommands) =>{
        const type = arguments_type[index]
        if(Array.isArray(type)){
            return <SelectArgument options={type} row={row} index={index} commands={commands} setCommands={setCommands}/>
        }
        if(type === Constants.NUMBER_ARGUMENT){
            return <NumberArgument row={row} index={index} commands={commands} setCommands={setCommands}/>
        }
    }

    const getConstArgument=(arguments_type, index, row) =>{
        const type = arguments_type[index]
        if(Array.isArray(type)){
            return <SelectArgumentConst options={type} index={index} row={row}/>
        }
        if(type === Constants.NUMBER_ARGUMENT){
            return <NumberArgumentConst row={row} index={index}/>
        }
    }

    function getDescriptionList(description){
        return description.split(" ")  
    }

    function getArgumentIndex (index , description_list){
        const partitial_arr = description_list.slice(0, index)
        // console.log(partitial_arr)
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
