import React, { useEffect, useRef } from "react";

import {Editor, loader} from "@monaco-editor/react";

import * as monaco from 'monaco-editor';

import './codeEditor.css'

function CodeEditorWindow(props) {

    const code = props.code
    const setCode = props.setCode



	// function handleEditorDidMount(editor, monaco) {

	// 	const constrainedInstance = constrainedEditor(monaco);
	// 	const model = editor.getModel();
	// 	constrainedInstance.initializeIn(editor);
		

	// 	// constrainedInstance.addRestrictionsTo(model, [
	// 	// 	{
	// 	// 		range: [2, 1, 2, 23], // Range of Function definition
	// 	// 		allowMultiline: true,
	// 	// 		label: "funcDefinition"
	// 	// 	},
	// 	// 	{
	// 	// 		range: [3, 1, 3, 23], // Range of Function definition
	// 	// 		allowMultiline: true,
	// 	// 		label: "funcDefinition"
	// 	// 	}
		
	// 	// ]);



	// }




	// Include constrainedEditorPlugin.js in your html.





    // loader.init().then(monaco => {
    //   	monaco.editor.defineTheme('myTheme', theme);
	// 	// const constrainedInstance = constrainedEditor(monaco);


    //   	// monaco.editor.loadTheme('vs-dark');
    // });


    
    function handleEditorChange(value) {
        setCode(value);
    };

    // const theme = {
    //   base: 'vs-dark',
    //   inherit: true,
    //   rules: [
    //     { token: 'comment', foreground: 'green', fontStyle: 'italic' },
    //     { token: 'keyword', foreground: 'yellow', fontStyle: 'bold' },
    //     { token: 'string', foreground: 'red' },
    //     { token: 'number', foreground: 'purple' }
    //   ]
    // }


    // function setEditorTheme() {
    //   monaco.editor.defineTheme('onedark', {
    //     base: 'vs-dark',
    //     inherit: true,
    //     rules: [
    //       {
    //         token: 'comment',
    //         foreground: '#5d7988',
    //         fontStyle: 'italic'
    //       },
    //       { token: 'constant', foreground: '#e06c75' }
    //     ],
    //     colors: {
    //       'editor.background': '#21252b'
    //     }
    //   });
    // }


    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
          <Editor
            height="85vh"
            width={`100%`}
            language={"javascript"}
            value={code}
            onChange={handleEditorChange}
          />
        </div>
      );
}

export default CodeEditorWindow;