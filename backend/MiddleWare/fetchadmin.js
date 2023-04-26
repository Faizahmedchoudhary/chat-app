var jwt = require('jsonwebtoken');
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

const fetchadmin = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Token iS Missing" }) 
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.result;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token 2" });
     
    }

}


module.exports = fetchadmin;