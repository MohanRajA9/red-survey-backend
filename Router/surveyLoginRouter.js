import express from 'express'
import jwt from 'jsonwebtoken'
const scretKey = process.env.JWT_secret
const router = express.Router()

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    //mock authentication: accept any username and password
    if (!username || !password) {
        return res.status(400).json({ message: 'username and password are required' })
    }

    //generate a JWT token
    const token = jwt.sign({ username }, scretKey)

    //return the token
    res.json({token})

})

export default router
