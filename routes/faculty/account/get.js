const User = require("../../../models/user");


var get = function (req, res, next) {
    var id=''
    if(req.userId)
        id=req.userId
    else{
        if(req.body.id)
            id=req.body.id
    } 
    if(id!='')
        User.find({_id:id}).exec()
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
    else
        res.json({
            success:false,
            error : "Invalid Data Passed"
        })
};

module.exports = get;