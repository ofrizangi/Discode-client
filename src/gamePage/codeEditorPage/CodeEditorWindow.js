import React, { useEffect, useRef , useState} from "react";
import {Editor} from "@monaco-editor/react";
import { post_code_api } from "../gamesAPI";
import './codeEditor.css'

function CodeEditorWindow(props) {

    const code = props.code
    const setCode = props.setCode
	const [formerCode, setFormerCode] = useState(props.code)

	const editorRef = useRef(null);

	const [autosave, setAutosave] = useState(false); // to trigger checking if needs to autosave

	useEffect(() => {
		const autosave = setInterval(function() {
			setAutosave(true);
		}, 30 * 1000); 
		// the return function of a useEffect is a cleanup function - it will be activated when leaving a component
		return () => {
			post_code_api(editorRef.current.getValue())
			setCode(editorRef.current.getValue())
			setAutosave(false); // turn autosave off
			clearInterval(autosave); // clear autosave on dismount
		};
	}, []);

	// autosave if changes
	useEffect(() => {
		if (autosave && editorRef.current.getValue() !== formerCode) {
			save_code()
			setAutosave(false); // toggle autosave off
		}

		async function save_code(){
			const current_val = await editorRef.current.getValue()
			await post_code_api(current_val)
			await setFormerCode(current_val)
		}

	}, [autosave,  code , formerCode]); // reset when lesson changes

	function handleEditorDidMount(editor, monaco){
		editorRef.current = editor;
	};
    
    function handleEditorChange(value) {
        setCode(value);
    };

	const options = {
		readOnly: false,
		minimap: { enabled: false },
	};

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl editor monaco-editor">
          <Editor
            height="85vh"
            width={`100%`}
            language={"javascript"}
            value={code}
			options={options}
            onChange={handleEditorChange}
			onMount={handleEditorDidMount}
          />
        </div>
      );
}
export default CodeEditorWindow;