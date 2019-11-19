const express = require('express');
const router = express.Router();
const authenticate = require("../../../middleware/checkAuth");
const multer = require('multer');

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


var adduser = require('./add');
var removeuser = require('./remove');
var updateuser = require('./update');
var login = require('./login');

router.post('/signup', (req, res, next) => {
    adduser(req, res, next);
});


router.post('/login', (req, res, next) => {
    login(req, res, next);
});


router.post('/deleteAccount', authenticate, (req, res, next) => {
    removeuser(req, res, next);
});


router.post('/update', authenticate, upload, (req, res, next) => {
    updateuser(req, res, next);
});


router.get('/load',(req,res,next)=>{
    res.render('profile');
});

router.post('/test', (req, res, next) => {
    console.log("Testing");
    res.json({
        count : 2,
        profiles:[
            {
            username : "Sahil",
            email: "sahil@gmail.com",
            publications:[{
                type : "Conference",
                at : "CVPR",
                year: 2019,
                paper_name : "SimaGAN"
            }]},
            {
                username : "Aroof",
                email: "aroof@gmail.com",
                publications:[{
                    type : "Conference",
                    at : "IJKAI",
                    year: 2019,
                    paper_name : "METAGAN"
                }]}
        ]
    });
});


module.exports = router;