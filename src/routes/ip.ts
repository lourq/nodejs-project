import express from 'express'
const router = express.Router();

router.get('/ip' , (req, res) => {
    const ip = req.ip?.split(':').pop();
    res.send({ip});
})

export default router