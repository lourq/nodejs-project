import express from "express";
import "./config/sequelize"
import { Server } from "socket.io";

//#region routes import

import pageRoutes from './routes/pageRoutes'
import registrationRoutes from "./routes/registration";
import loginRoutes from "./routes/login"

//#endregion

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static("src/public"));
app.use(pageRoutes)

app.use('/api' , [registrationRoutes , loginRoutes])

const inst = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});