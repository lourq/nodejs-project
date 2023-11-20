import express from "express";
import { checkCredentials } from "../controllers/playerController";

const router = express.Router();

router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  checkCredentials(userName, password).then(data => {
    if(data) { 
        res.status(200).redirect('/menu')
    }
    else res.status(403).send()
  })
});

export default router;
