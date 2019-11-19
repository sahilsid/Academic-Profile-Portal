

const User = require("../../../models/user");

var remove = function (req, res, next) {

        console.log(userId + "will be deleted");
        var userId = '';
        if (req.body.id)
            userId = req.body.id;
        console.log(userId + "will be deleted");
        
        User.remove({
            _id: userId
        }, function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            else {
                return res.json({
                    success: true,
                    message: "User Removed Successfully"
                });
            }
        });

}
module.exports = remove;
