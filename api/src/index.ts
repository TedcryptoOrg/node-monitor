import * as configurationDal from "./database/dal/configuration";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {create} from "./controllers/configurations/create.ts";
import {findAll} from "./controllers/configurations/findAll.ts";

dotenv.config();

const app = express();
const port = process.env.PORT;
var corsOptions = {
    origin: "http://localhost:8081"
};

// Setting it up
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: any, res: any) => {
    res.send('Hello there!');
});

// Configuration Router
const configurationRouter = require("express").Router();
configurationRouter.post("/", create)
configurationRouter.get("/", findAll)

app.use('/api/configurations', configurationRouter);


// Listener
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});