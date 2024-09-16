import jwt from 'jsonwebtoken';
const secret = process.env.JWT_secret

export const auth = (req, res, next) => {
    const token = req.header("x-auth-token")

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    try {
        //verify the token
        const decoded = jwt.verify(token, secret)
        req.user = decoded //attach user info from token to the request
        next() //continue to the Route handler
    } catch (error) {
        return res.status(403).json({ message: 'invalid token' })
    }


}