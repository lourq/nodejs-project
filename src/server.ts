import express from "express";
import "./config/sequelize"
import { Server } from "socket.io";
import {join , resolve} from 'path'

//#region routes import

import pageRoutes from './routes/pageRoutes'
import registrationRoutes from "./routes/registration";
import loginRoutes from "./routes/login"
import ipRoutes from './routes/ip'
import joinRoutes from './routes/join'
import sessionRouter from './routes/session'
import filesRouter from './routes/files'
//#endregion

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static("src/public"));
app.set('trust proxy', true);
app.use(pageRoutes)
app.use(filesRouter)
app.use('/api' , [registrationRoutes , loginRoutes ,ipRoutes , joinRoutes , sessionRouter])

app.use((req, res, next) => {
  res.status(404).sendFile(join(resolve('') , 'src/public/pages/404.html'));
});

const inst = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const io = new Server(inst);

export default io;