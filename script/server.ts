import express from "express";
import { resolve, join } from "path";

const app = express();
const PORT = 4000;

app.use(express.static("public"));

app.get(["/assets/sprite/idle.png" , "/assets/sprite/walk/*.png", "/assets/background/grass.png"], (req, res) => {
  const path: String = join(resolve(""), req.url);
  sendFile(path,res);
});

const sendFile = (path:String , res) => {
  res.sendFile(path, (err) => {
    if (err) {
      console.error(`Error message : ${err.message}`);
      res.status(404).end();
    } else if (!err) {
      console.log(`Send : ${path}`);
    }
  });
}

app.listen(4000, () => {
  console.log(`http://localhost:${PORT}`);
});


/*#region Notes

const startX = 19;
  const startY = 21;
  const endX = 77;
  const endY = 93;

  const canvas = createCanvas(endX - startX, endY - startY);
  const ctx = canvas.getContext("2d");

  const image = await loadImage("assets/sprite/amoungus-sprite.png");
  ctx.drawImage(image, -startX, -startY);

  const buffer: Buffer = canvas.toBuffer("image/png");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer);

#endregion*/