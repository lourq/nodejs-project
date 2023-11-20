import express from 'express'
import {addData} from "../controllers/playerController"

const router = express.Router();

router.post('/register' , (req, res) => {
    addData(req.body).then(() => {
        res.status(200).send();
    })
    .catch(err => {
        console.error(err)
        res.status(404).send(err)
    })
})

export default router