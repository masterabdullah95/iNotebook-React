var jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;

const authenticateUser = (req, res, next)=>{
    const token = req.headers.token;
    try {
        var decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.json({ errors: error });
    }
    
}

module.exports = authenticateUser;