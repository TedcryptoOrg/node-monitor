import * as dotenv from 'dotenv';
import path = require("path");

dotenv.config({
    path: path.join(__dirname, '/../.env.test'),
    debug: true
})