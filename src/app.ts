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

import readline from 'readline'

import {getUsersSizeNames} from './controllers/playerController'
// await dropBase()

await Players.sync()
await GameSessions.sync()

sequelize
  .sync()
  .catch((err) => console.error(err));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const func = () => {
  rl.question('input command -> ', async (cmd) => {
    switch(cmd) {
      case "get size":
        const users = await getUsersSizeNames();
        console.log('Size : ' + users.size);
        console.log('NickNames -> ')
        users.usernames.forEach(element => {
            console.log(element)
        });
        break;
      case "help":
        console.log('\n--HELP--\nget size -- return total number of users\n');
        break;
      case "exit":
        rl.close();
        return;
    }
    func();
  });
}

func();


async function dropBase() {
  await ChatLogs.drop()
  await GameEvents.drop()
  await GameSettings.drop()
  await GameSessions.drop();
  sequelize.drop();
}