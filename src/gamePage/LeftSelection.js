function LeftSelection(props){

    const setLeftSideView = props.setLeftSideView;

    return(
        <div className="btn-group-wrapper">
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="btnradio" id="blocks" autoComplete="off" defaultChecked />
                <label id="blocks" className="btn btn-outline-primary" htmlFor="blocks" onClick={(event)=>{setLeftSideView(event.currentTarget.id)}}>Blocks</label>
        
                <input type="radio" className="btn-check" name="btnradio" id="editor" autoComplete="off" />
                <label id="editor" className="btn btn-outline-primary" htmlFor="editor" onClick={(event)=>{setLeftSideView(event.currentTarget.id)}}>Editor</label>
            </div>
        </div>
    );
}
export default LeftSelection;