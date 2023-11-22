import express from 'express'
import {addSession} from '../controllers/gamesessionController'
import {getUserNameByIp} from "../controllers/playerController"
const router = express.Router();

router.get('/join' , async(req, res) => {
    const ip = req.ip?.split(':').pop();
    console.log(ip)
    const userName : string = await getUserNameByIp(ip).catch(err => console.error(err));
    console.log(userName)
    // addSession(userName).then(() => {
    //     res.status(200).send()
    // }).catch(err => {
    //     console.error(err)
    //     res.status(404).send(err)
    // });
    res.status(200).send()
})

export default router