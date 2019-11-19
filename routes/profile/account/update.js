const express = require('express');

const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require("../../../models/user");
var functions = require('./functions');

var sendVerificationLink = functions.sendVerificationLink;
var sendotp = functions.sendotp;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../../public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, req.userDat['userId']);
    }
});
var fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        req.containsImg = true;
        cb(null, true);
    } else
        cb(null, false);
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
}).single('usrImg');


module.exports = function(req, res, next){

    var userId = '';
    if (req.userId) {
        userId = req.userId;
        if (req.containsImg)
            User.updateOne({
                _id: userId
            }, {
                $set: {
                    usr_img_path: 'images/users/' + encrypt(userId)
                }
            }, function (err, resp) {
                if (err) {
                    console.log(err);
                }
            });
        var update_obj = {};
        for (var property in req.body) {
            req.body.property = sanitize(req.body.property);
            console.log(property);
            console.log(req.body[property]);
            if (property == "password")
                bcrypt.hash(req.body[property], 10, function (err, hash) {
                    if (err) {
                        console.log("error hashing password");
                        return res.status(500).json({
                            error: err,
                            message: "Update failed",
                            success: false
                        });
                    } else {
                        update_obj[property] = hash;
                    }
                });
            else if (property == "email")
                update_obj['email_verified'] = false;

            else if (property == "mobile_no")
                update_obj['mobile_verified'] = false;


            update_obj[property] = sanitize(req.body[property]);
        }
    }
    User.update({
        _id: userId
    }, {
        $set: update_obj
    }, function (err, resp) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err,
                message: "Update failed",
                success: false
            });
        } else {
            console.log(update_obj);
                res.status(201).json({
                    message: " Updated successfully",
                    success: true
                });
        }
    });

}