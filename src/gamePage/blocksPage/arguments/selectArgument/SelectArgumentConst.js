


function SelectArgumentConst(props) {

    const value = props.row !== undefined ? props.row.arguments[props.list_number][props.index] : "default"

    return (
        <span>
            <select disabled defaultValue={value}>
                <option id="default"> ---- </option>
                {props.options.map((option) => {return <option key={option}>{option}</option>})}
            </select>
        </span>
    );

}


export default SelectArgumentConst;