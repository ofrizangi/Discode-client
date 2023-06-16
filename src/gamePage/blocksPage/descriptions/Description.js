import * as Constants from '../../../constants';

import { getArgument, getDescriptionList, getArgumentIndex } from '../arguments/argumentsProvider';


function Description(props) {

    const block = props.block
    const list_num = props.list_num
    const row = props.row

    return (
        <div>
            {getDescriptionList(block.description[list_num]).map((item, index) => { return item !== Constants.ARGUMENTS_IDENTIFIER ? 
                                <span key={index}> {item} </span> : 
                                (<span key={index}> {getArgument(block.arguments_type, list_num, getArgumentIndex(index, getDescriptionList(block.description[list_num])), row, props.commands, props.setCommands)} </span> )})
        }

        </div>
    )
}
export default Description;