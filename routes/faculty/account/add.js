const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const User = require("../../../models/user");
const mongoose = require('mongoose');
var functions = require('./functions');
var sql = require('./sql');

module.exports = function (req, res, next) {
    console.log(req.body);
    if (!req.body.email || !req.body.password)
        return res.json({
            success: false,
            error: "Invalid Data"
        });
    
    User.find({
        email: sanitize(req.body.email)
    }).exec()
    .then(unique_user => {
        if (!unique_user[0]) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    console.log("here");
                    return res.json({
                        success: false,
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        designation : {
                            title   :   req.body.designation?req.body.designation : "",
                            rank    :   req.body.rank
                        },
                        date_joined :  new  Date(),
                        password: hash,
                        department : req.body.department
                    });
                    user.save()
                        .then(result => {
                            signed_in = 1;
                            console.log(result);

                            sql.insert_employee(result._id,result.designation.rank,result.department);

                            functions.generateDefaultIcon(result.name, result._id, function (imgPath) {
                                User.updateOne({
                                    _id: result._id
                                }, {
                                    $set: {
                                        usr_img_path: imgPath
                                    }
                                }, function (err, resp) {
                                    if (err) {
                                        return res.json({
                                            success: true,
                                            error: 'Error creating default icon : ' + err
                                        });
                                    }
                                });
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            User.remove({
                                email: req.body.email
                            }, function (error) {
                                if (error)
                                    return res.json({
                                        error: "Unable to process request : " + error,
                                        success: false
                                    });
                                else
                                return res.json({
                                    error: "Unable to process request : " + err,
                                    success: false
                                });
                            });

                        });
                }
            });
        } else {
            res.json({
                error: "Email Id Exists",
                success: false
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            error: err,
            success: false
        });
    })

}