import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/app";

const container = document.getElementById("app");

// To be used with `server/server.js`:
ReactDOM.hydrateRoot(container, <App />);