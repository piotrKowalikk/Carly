import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { HashRouter } from "react-router-dom";

const rootEl = document.getElementById("root");

render(
    <HashRouter>
        <App />
    </HashRouter>,
    rootEl,
);
