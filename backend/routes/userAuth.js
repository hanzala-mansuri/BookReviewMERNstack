const jwt = require("jsonwebtoken")

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] // Bearer werkldsfj

    if (!token) {
        return res.status(401).json({ message: "No Token Provided" });
    }


    jwt.verify(token, "bookstore123" , (err,user) => {
        if(err){
            return res
            .status(403)
            .json(err || "Token verification failed...")
        }
        // console.log("Decoded user:", user); // Log the decoded user
        // console.log(user)
        req.user = user
        next();
    })
}

module.exports = { authenticateToken }