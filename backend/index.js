import express from "express";
import config from "config";
const app = express();
import path from "path";
import url from "url";

import cors from "./startup/cors.js";
cors(app);

import dotenv from "dotenv";
dotenv.config();

import routes from "./startup/routes.js";
routes(app);

import configObj from "./startup/config.js";
configObj();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
    console.log(`Listening on port ${port}...`)
);

// Set static folder
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

export default server;
