
const User = require("../../../models/user");


var getlist = function (req, res, next) {
    User.find({}).exec()
        .then(user => {
            console.log("Faculties found are :");
            console.log(user);
            res.json({
                success:true,
                faculty:user
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                success : false,
                error: err,
            });
        });
};

module.exports = getlist;