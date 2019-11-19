const sanitize = require('mongo-sanitize');
const Otp = require("../../../models/otp");
const User = require("../../../models/user");
var functions = require('./functions');

module.exports = {
    sendVerificationLink: function (req, res, next) {
        req.body.email = sanitize(req.body.email);

        if (!req.body.email)
            return res.status(400).json({
                success: false,
                error: "Invalid Data"
            });
        else {
            User.find({
                    email: req.body.email
                }).exec()
                .then(user => {
                    if (!user)
                        return res.status(400).json({
                            success: false,
                            error: "Invalid User"
                        });
                    else {
                        if (!user[0].email_verified) {
                            functions.sendVerificationLink(user[0]._id, user[0].email);
                            return res.status(200).json({
                                success: true,
                                error: "Verification link has been re-sent."
                            });
                        } else
                            return res.status(400).json({
                                success: false,
                                error: "User Account Already Verified"
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({
                        success: false,
                        error: "Invalid Data"
                    });
                });
        }
    },
    verifyLink: function (req, res, next) {
        var userId = sanitize(req.params.userId);
        if (!userId)
            return res.status(400).json({
                success: false,
                error: "User verification failed"
            });
        var update_obj = {
            email_verified: true
        };
        User.updateOne({
            _id: userId
        }, {
            $set: update_obj
        }, function (err, resp) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: "Verification failed",
                    success: false
                });
            } else
                res.status(201).json({
                    message: " Verification successful",
                    success: true
                });
        });
    },
    sendotp: (req, res, next) => {
        if (!req.body.mobile_no) {
            return res.status(500).json({
                error: "Invlaid Data"
            });
        } else {
            User.find({
                    mobile_no: sanitize(req.body.mobile_no)
                }).exec()
                .then(result => {
                    if (!result[0])
                        return res.status(500).json({
                            error: "Invalid User",
                            success: false
                        });
                    else {
                        otp = new Otp({
                            _id: mongoose.Types.ObjectId(),
                            mobile_no: req.body.mobile_no,
                            value: otpGenerator.generate(5, {
                                digits: true,
                                alphabets: false,
                                upperCase: false,
                                specialChars: false
                            })
                        });
                        otp.save()
                            .then(result => {
                                console.log(result);
                                return res.status(200).json({
                                    success: true,
                                    message: "Otp Generation Successful."
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({
                                    error: err,
                                    success: false
                                });
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        error: err,
                        success: false
                    });
                });

        }
    },
    verifyotp: function(req, res, next){
        var mobile_no = sanitize(req.body.mobile_no);
        var otp = sanitize(req.body.otp);
        if (!otp)
            return res.status(400).json({
                success: false,
                error: "Invalid OTP"
            });
        else if (!mobile_no)
            return res.status(400).json({
                success: false,
                error: "Invalid User"
            });
        else {
            Otp.find({
                    mobile_no: mobile_no
                }).exec()
                .then(result => {
                    if (!result[0])
                        return res.status(400).json({
                            success: false,
                            error: "OTP Expired."
                        });
                    else if (otp == result[0].value) {

                        User.find({
                                mobile_no: mobile_no
                            }).exec()
                            .then(usr => {
                                if (!usr[0])
                                    return res.status(400).json({
                                        success: false,
                                        error: "Invalid User"
                                    });
                                else {

                                    const token = jwt.sign({
                                        userId: usr[0]._id,
                                        email: usr[0].email
                                    }, "kryptore@Sah$Koustav354$bbvcgF23$djsdkjdnksjhjcbPO0bNfjfdPO@kdfm$$", {
                                        expiresIn: "1000h"
                                    });
                                    usr[0].mobile_verified = true;
                                    usr[0].save();
                                    return res.status(200).json({
                                        success: true,
                                        token: token
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err);

                                return res.status(200).json({
                                    success: false,
                                    error: "Invalid User"
                                });
                            });

                    } else
                        return res.status(400).json({
                            success: false,
                            message: "OTP Invalid"
                        });

                }).catch(err => {
                    console.log(err);
                    return res.status(400).json({
                        success: false,
                        error: "OTP Verification Failed. Please Retry."
                    });
                });
        }
    }
};