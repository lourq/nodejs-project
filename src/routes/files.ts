import express from "express";
import { createReadStream } from "fs";
import { resolve , join } from "path";
import { createGzip} from "zlib";

const router = express.Router();

router.get(['/assets/background/*.png','/assets/icons/*.png','/assets/load/*.png','/assets/map/*.png','/assets/sprite/*.png'] , (req, res) => {
    const path = join(resolve('') , req.url)
    res.setHeader("Content-Encoding", "gzip");
    createReadStream(path).pipe(createGzip()).pipe(res);
});

export default router;