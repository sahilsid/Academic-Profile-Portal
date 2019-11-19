const User = require("../../../models/user");

module.exports = function(req, res, next){

    if(!req.userId)
        res.json({
            success:false,
            error : "Unauthorized Access"
        });
    else{

        var update_obj = {};
        for (var property in req.body) {
            update_obj[property] = req.body[property];
        }

        User.findOneAndUpdate(
            { _id: req.userId }, 
            { $pull: update_obj },
        function (error, success) {
                if (error) {
                    console.log(error);
                    res.json({
                        success:false,
                        error : error
                    });
                } else {
                    console.log(success);
                    res.json({
                        success :true,
                        message : "Successfully Deleted "+JSON.stringify(update_obj)
                    });
                }
            });
    }
        
}