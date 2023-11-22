import express from "express";
import {resolve , join} from "path"

const router = express.Router();

router.get(["/menu",'/game'], (req, res) => {
    res.sendFile(join(resolve('') , `/src/public/pages/${req.url}.html`) , (err) => console.error(err))
});

export default router;