import express from 'express'
import {getSessionByUserName} from '../controllers/gamesessionController'
import {getUserNameByIp} from "../controllers/playerController"
const router = express.Router();

router.get('/session' , async(req, res) => {
    const ip = req.ip?.split(':').pop();
    const userName : string = await getUserNameByIp(ip).catch(err => console.error(err));
    await getSessionByUserName(userName).then((data) => {
        console.log({sessionID : data})
        res.status(200).send({sessionID : data})
    }).catch(err => {
        console.error(err)
        res.status(404).send(err)
    });
})

export default router