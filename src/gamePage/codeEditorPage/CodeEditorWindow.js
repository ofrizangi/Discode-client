import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import './codeEditor.css'

function CodeEditorWindow(props) {

    const code = props.code
    const setCode = props.setCode

    const handleEditorChange = (value) => {
        setCode(code);
    };


    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
          <Editor
            height="85vh"
            width={`100%`}
            language={"javascript"}
            value={code}
            defaultValue="// some comment"
            onChange={handleEditorChange}
          />
        </div>
      );
}

export default CodeEditorWindow;