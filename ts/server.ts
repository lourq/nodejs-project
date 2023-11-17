import express from "express";
import { resolve, join } from "path";
import { Server } from "socket.io";
import { tablesExists} from "./database"

const app = express();
const PORT = 4000;

app.use(express.static("public"));

app.get(["/sandbox","/settings",'/gameMenu'],(req, res) => {
  res.sendFile(join(resolve("") + `/public/pages/${req.url}.html`), (err) => {
    if (err) console.error(err);
  });
});

app.get(["/assets/sprite/*", "/assets/background/*.png"], (req, res) => {
  const path: String = join(resolve(""), req.url);
  sendFile(path, res);
});

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

const inst = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  // tablesExists()
});

const io = new Server(inst);

io.on("connection", (socket) => {
  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
});

/*#region Notes

const startX = 19;
  const startY = 21;
  const endX = 77;
  const endY = 93;

  const canvas = createCanvas(endX - startX, endY - startY);
  const ctx = canvas.getContext("2d");

  const image = await loadImage("assets/sprite/among-us-sprite.png");
  ctx.drawImage(image, -startX, -startY);

  const buffer: Buffer = canvas.toBuffer("image/png");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer);

#endregion*/
