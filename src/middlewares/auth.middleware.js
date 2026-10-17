import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    console.log("Cookies:", req.cookies);
    console.log("Token:", req.cookies?.token);
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unathorised Access"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

export default { authUser }