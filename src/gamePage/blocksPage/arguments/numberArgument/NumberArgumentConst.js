
import './../arguments.css'

function NumberArgumentConst(props) {

    const value = props.row !== undefined ? props.row.arguments[props.index] : ""

    return (
        <span>
            {console.log(value)}
            <input disabled type="number" className="number" defaultValue={value}/>
        </span>
    );

}


export default NumberArgumentConst;