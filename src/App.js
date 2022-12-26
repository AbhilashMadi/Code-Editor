import React, { Fragment, useState } from "react";
import "./scss/css/index.css";

import Editor from "./components/Editor";
import { useEffect } from "react";

import "./welcome/welcome"

import useStorage from "./hooks/Storage";
import { welcomeCss,welcomeHtml } from "./welcome/welcome";

const App = () => {
  //buildUse
  // const [html, setHtml] = useState("");
  // const [css, setCss] = useState("");
  // const [javascript, setJavascript] = useState("");

  //customHook
  const [html,setHtml] = useStorage("html","")
  const [css,setCss] = useStorage("css","")
  const [javascript,setJavascript] = useStorage("javascript","")

  const [ srcDoc, setSrcDoc] = useState("srcDoc")

  //debouncing
 useEffect(()=> {
  const timeout = setTimeout(()=>{
    setSrcDoc( `
 <html>
 <body>${html==="" ? welcomeHtml : html}</body>
 <style>${html === "" ? welcomeCss : css}</style>
 <script>${javascript}</script>
 </html>
 `)
  },250)

  // console.log(html)

  return () => clearTimeout(timeout);
 },[html,css,javascript])

  return (
    <Fragment>
      <div className="panel panel-top">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div className="panel">
        <iframe
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          className="output-panel"
          srcDoc={srcDoc}
        />
      </div>
    </Fragment>
  );
};

export default App;
