const jwt = require('jsonwebtoken');
const Faculty = require("../models/user");


module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_value = jwt.verify(token, "kryptore@Sah$Koustav354$bbvcgF23$djsdkjdnksjhjcbPO0bNfjfdPO@kdfm$$");
        req.userDat = decoded_value;
        console.log(" decode : ");
        console.log(decoded_value['userId']);
        Faculty.find({
                _id: decoded_value['userId']
            }).exec()
            .then(user => {
                if (!user[0]) {
                    return res.status(401).json({
                        auth: false,
                        success: false,
                        error: "Invalid token"
                    });
                } else if (!user[0].mobile_verified) {
                    return res.status(401).json({
                        auth: false,
                        success: false,
                        error: "Please verify your mobile no to continue."
                    });
                } else {
                    console.log(user);
                    req.userId = user[0]._id;
                    req.userName = user[0].username;
                    next();
                }
            })
            .catch(err => {
                console.log("error");
                console.log(err);
                return res.status(500).json({
                    auth: false,
                    success: false,
                    error: "Invalid token"
                });
            });


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