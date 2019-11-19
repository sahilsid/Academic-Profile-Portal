
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../../../models/user");


var login = function (req, res, next) {
    var prop;
    var val;
    console.log(req.body);
    if (req.body.email) {
        prop = "email";
        val = req.body.email;
    } else if (req.body.mobile_no) {
        prop = "mobile_no";
        val = req.body.mobile_no;
    } else
        return res.status(401).json({
            err: "Invalid data.",
            auth: false
        });


    User.find({
            [prop]: val
        }).exec()
        .then(user => {
            console.log("users found are :");
            console.log(user);
            if (!user[0]) {
                return res.status(401).json({
                    auth: false,
                    error: "Invalid User"
                });
            }
            if (!user[0].mobile_verified)
                return res.status(400).json({
                    auth: false,
                    error: "Please verify your Mobile to continue"
                });
            /*if (!user[0].email_verified)
                return res.status(400).json({
                    auth: false,
                    error: "Please verify your Email to continue"
                });
            */
            bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                if (err)
                    return res.status(401).json({
                        error: err,
                        auth: false
                    });

                if (result) {
                    const token = jwt.sign({
                        userId: user[0]._id,
                        email: user[0].email
                    }, "kryptore@Sah$Koustav354$bbvcgF23$djsdkjdnksjhjcbPO0bNfjfdPO@kdfm$$", {
                        expiresIn: "1000h"
                    });
                    return res.status(200).json({
                        auth: true,
                        token: token
                    });
                }
                res.status(401).json({
                    auth: false,
                    error: "Invalid User"
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
};

module.exports = login;