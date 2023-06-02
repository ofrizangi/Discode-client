
import './../arguments.css'

function NumberArgumentConst(props) {

    const value = props.row !== undefined ? props.row.arguments[props.list_number][props.index] : ""

    return (
        <span>
            <input disabled type="number-input" className="number-input" defaultValue={value}/>
        </span>
    );

}


export default NumberArgumentConst;