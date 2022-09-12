import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../components/app";

const server = express();
server.use(express.static("dist"));

server.get("/", renderApp);

function renderApp(req, res) {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Rest Timer</title>
        <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
        <link rel="shortcut icon" type="image/svg" href="/images/favicon.svg" />
        <link rel="stylesheet" href="/styles/index.css">
      </head>
      <body>
        <div id="app">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
}

const port = 8080;
server.listen(port, () => console.log(`Server is running on ${port}...`));