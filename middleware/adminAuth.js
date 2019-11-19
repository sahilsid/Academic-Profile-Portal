const jwt = require('jsonwebtoken');
const Faculty = require("../models/user");


module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_value = jwt.verify(token, "kryptore@Sah$Koustav354$bbvcgF23$djsdkjdnksjhjcbPO0bNfjfdPO@kdfm$$");
        req.userDat = decoded_value;
        console.log(" decode : ");
        console.log(decoded_value['admin']);
        
        if(decoded_value['admin']=='sahil')
            next();
    } catch (error) {
        console.log("error");

        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            auth: false,
            success: false
        });
    }

};