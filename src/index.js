import React,{Fragment} from 'react'
import ReactDOM ,{createRoot}from 'react-dom/client';

import App from "./App"
const root = createRoot(document.getElementById("root"));

root.render(
    <Fragment>
        <App/>
    </Fragment>
)