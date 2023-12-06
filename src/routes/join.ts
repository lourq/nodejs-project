import express from 'express'
import {addSession} from '../controllers/gamesessionController'
import {getUserNameByIp} from "../controllers/playerController"
const router = express.Router();

router.get('/join' , async(req, res) => {
    const ip : string | undefined = req.ip?.split(':').pop();
    const userName : string = await getUserNameByIp(ip).catch(err => console.error(err));
    // addSession(userName).then(() => {
    //     res.status(200).send()
    // }).catch(err => {
    //     console.error(err)
    //     res.status(404).send(err)
    // });
    res.status(200).send()
})

export default router