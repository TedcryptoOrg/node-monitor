import express, {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
import cors from "cors";
import configurationRouter from "./routes/configurations";
dotenv.config();

const app = express();
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

app.use('/api/configurations', configurationRouter);

app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

export const server = app;
