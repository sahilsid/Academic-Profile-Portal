
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
    } else
        return res.json({
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
                return res.json({
                    auth: false,
                    error: "Invalid User"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                if (err)
                    return res.json({
                        error: err,
                        auth: false
                    });

                if (result) {
                    const token = jwt.sign({
                        userId: user[0]._id,
                        email: user[0].email
                    }, "kryptore@Sah$Koustav354$bbvcgF23$djsdkjdnksjhjcbPO0bNfjfdPO@kdfm$$", {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        auth: true,
                        token: token
                    });
                }
                res.json({
                    auth: false,
                    error: "Invalid User"
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                auth:false,
                error: err,
            });
        });
};

module.exports = login;