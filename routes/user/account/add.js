const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const User = require("../../../models/user");
const mongoose = require('mongoose');
var functions = require('./functions');

module.exports = function (req, res, next) {
    console.log(req.body);
    if (!req.body.mobile_no || !req.body.email || !req.body.password)
        return res.status(500).json({
            success: false,
            error: "Invalid Data"
        });
    User.find({
            mobile_no: sanitize(req.body.mobile_no)
        }).exec()
        .then(user => {
            if (!user[0]) {
                User.find({
                        email: sanitize(req.body.email)
                    }).exec()
                    .then(unique_user => {
                        if (!unique_user[0]) {
                            bcrypt.hash(req.body.password, 10, function (err, hash) {
                                if (err) {
                                    console.log("here");
                                    return res.status(500).json({
                                        success: false,
                                        error: err
                                    });
                                } else {
                                    const user = new User({
                                        _id: mongoose.Types.ObjectId(),
                                        username: req.body.username,
                                        mobile_no: req.body.mobile_no,
                                        email: req.body.email,
                                        password: hash,
                                        mobile_verified: true,
                                        email_verified: true
                                    });
                                    user.save()
                                        .then(result => {
                                            signed_in = 1;
                                            console.log(result);
                                            functions.generateDefaultIcon(result.username, result._id, function (imgPath) {
                                                User.updateOne({
                                                    _id: result._id
                                                }, {
                                                    $set: {
                                                        usr_img_path: imgPath
                                                    }
                                                }, function (err, resp) {
                                                    if (err) {
                                                        return res.status(400).json({
                                                            success: true,
                                                            error: 'Error creating default icon : ' + err
                                                        });
                                                    }
                                                });
                                            });
                                            functions.sendVerificationLink(result._id, req.body.email, function (emailverification) {
                                                functions.sendotp(result.mobile_no, function (otpverification) {
                                                    return res.status(500).json({
                                                        message: emailverification.message + " . " + otpverification.message,
                                                        success: true,
                                                        otpsent: otpverification.success,
                                                        emailsent: emailverification.success
                                                    });
                                                });
                                            });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            User.remove({
                                                email: req.body.email
                                            }, function (error) {
                                                if (error)
                                                    return res.status(500).json({
                                                        error: "Unable to process request : " + error,
                                                        success: false
                                                    });
                                                else
                                                return res.status(500).json({
                                                    error: "Unable to process request : " + err,
                                                    success: false
                                                });
                                            });

                                        });
                                }
                            });
                        } else {
                            res.status(500).json({
                                error: "Email Id Exists",
                                success: false
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                            success: false
                        });
                    })
            } else {
                res.status(500).json({
                    error: "Mobile No. Exists",
                    success: false
                });
            }
        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: "Request failed",
                    success: false
                });
            });

}