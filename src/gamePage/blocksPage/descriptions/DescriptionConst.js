import * as Constants from '../../../constants';

import { getConstArgument, getDescriptionList, getArgumentIndex } from '../arguments/argumentsProvider';


function DescriptionConst(props) {

    const block = props.block
    const list_num = props.list_num
    const row = props.row

    return (
        <div>
            {getDescriptionList(block.description[list_num]).map((item, index) => { return item !== Constants.ARGUMENTS_IDENTIFIER ? 
                                <span key={index}> {item} </span> : 
                                (<span key={index}> {getConstArgument(block.arguments_type, list_num, getArgumentIndex(index, getDescriptionList(block.description[list_num])), row)} </span> )})
        }
        </div>
    )
}
export default DescriptionConst;