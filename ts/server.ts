import express from "express";
import { resolve, join } from "path";
import { Server } from "socket.io";
import { tablesExists} from "./database"

const app = express();
const PORT = 4000;

app.use(express.static("public"));

//#region POST

app.post('/api/register' , (req, res) => {
  res.status(200);
  res.send();
})

app.post('/api/login' , (req, res) => {
  res.status(200);
  res.send();
})

//#endregion



//#region GET
app.get(["/sandbox","/settings",'/gameMenu','/menu'],(req, res) => {
  res.sendFile(join(resolve("") + `/public/pages/${req.url}.html`), (err) => {
    if (err) console.error(err);
  });
});

app.get(["/assets/sprite/*", "/assets/background/*.png"], (req, res) => {
  const path: String = join(resolve(""), req.url);
  sendFile(path, res);
});
//#endregion

const inst = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  tablesExists()
});


//#region custom function

const sendFile = (path: String, res) => {
  res.sendFile(path, (err) => {
    if (err) {
      console.error(`Error message : ${err.message}`);
      res.status(404).end();
    } else if (!err) {
      console.log(`Send : ${path}`);
    }
  });
};

//#endregion

const io = new Server(inst);

io.on("connection", (socket) => {
  console.log(socket.id)
});