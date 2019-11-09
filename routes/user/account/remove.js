

const User = require("../../../models/user");

module.exports = function (req, res, next) {
        var userId = '';
        if (req.userDat['userId'])
            userId = req.userDat['userId'];
        User.remove({
            _id: userId
        }, function (err) {
            if (err)
                return res.status(400).json({
                    success: false,
                    error: err
                });
            else {
                return res.status(200).json({
                    success: true,
                    message: "User Removed Successfully"
                });
            }
        });

    }

