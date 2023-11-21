import "./server"
import sequelize from "./config/sequelize";

//#region import models

import ChatLogs from "./models/ChatLogs"
import GameEvents from "./models/GameEvents"
import GameSessions from "./models/GameSessions";
import GameSettings from "./models/GameSettings"
import "./models/Tasks"
import Players from "./models/Players";

//#endregion

import './controllers/socketController'

// await dropBase()

await Players.sync()
await GameSessions.sync()

sequelize
  .sync()
  .then(() => console.log("sync tables"))
  .catch((err) => console.error(err));


async function dropBase() {
  await ChatLogs.drop()
  await GameEvents.drop()
  await GameSettings.drop()
  await GameSessions.drop();
  sequelize.drop();
}