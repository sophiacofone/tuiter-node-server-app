import express from 'express';
import cors from 'cors';

import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";

import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

HelloController(app);
UserController(app);
TuitsController(app);

app.listen(process.env.PORT || 4000);


// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
//  || 'mongodb+srv://sophiacofone:2Ji26vXS2Z8yk0Mv@cluster0.htf6zb2.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect(CONNECTION_STRING);


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
 || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);