import React,{useState} from 'react'

import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"

import {Controlled as CodeMirror} from "react-codemirror2"

import "codemirror/mode/javascript/javascript"
import "codemirror/mode/xml/xml"
import "codemirror/mode/css/css"

import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";

const Editor = (props) => {
    const {language,displayName,value, onChange} = props

    const handleChange = (editor, data, value) => {
        onChange(value)
    }

    const [open, setOpen] = useState(true);
    const handleCollapse = () => {
      setOpen((pre) => !pre)
    }

    const [mode, setMode] = useState("material")

    const handleMode = () => {
      setMode((preMode) => preMode === "material" ? "abcdef" : "material")
    }

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        <span className={displayName.toLowerCase()}>{displayName}</span>
        <span>
          <button onClick={handleCollapse}>
            {!open ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-sharp fa-solid fa-eye-slash"></i>
            )}
          </button>
          <button onClick={handleMode}>
            <i className={`fa-solid fa-${ mode ==="abcdef" ? "moon" : "sun"}`}></i>
          </button>
        </span>
      </div>
      <CodeMirror
        options={{
          lineWrapping: true,
          lint: true,
          smartIndent: true,
          lineNumbers: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          autoCloseTags: false,
          keyMap: "sublime",
          matchBrackets: true,
          autoCloseBrackets: false,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
          },
          mode: language,
          theme: mode,
        }}
        onBeforeChange={handleChange}
        value={value}
        className="codemirror-wrapper"
      />
    </div>
  );
}

export default Editor

// Documentation --> https://discuss.codemirror.net/t/how-to-use-codemirror-autocomplete-from-a-react-js-app/2441