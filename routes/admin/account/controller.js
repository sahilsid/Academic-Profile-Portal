const express = require('express');
const router = express.Router();
const authenticate = require("../../../middleware/adminAuth");
const multer = require('multer');
const jwt = require('jsonwebtoken');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../../public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, req.userDat['userId']+'.png');
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

router.post('/addFaculty', (req, res, next) => {
    adduser(req, res, next);
});


router.post('/removeFaculty', (req, res, next) => {
    console.log("Removing Faculty : "+req.body.id);
    removeuser(req, res, next);
});


router.post('/login', (req, res, next) => {
    login(req, res, next);
});

router.get('/dashboard',(req,res,next)=>{
    res.render('admin_dashboard');
});

router.post('/adminlogin', (req, res, next) => {
    console.log('login hi')
    console.log(req.body);
    if(req.body.username=='sahil'&&req.body.password=='parth'){
        const token = jwt.sign({
            admin:'sahil',
        }, "kryptore@Sah$Koustav354$bbvcgF23$djsdkjdnksjhjcbPO0bNfjfdPO@kdfm$$", {
            expiresIn: "1h"
        });
        res.json({
            success : true,
            token   : token
        });
    }
        
    else
        res.json({
            success : false
        });
});

router.get('/adminloginpage', (req, res, next) => {
   res.render('admin-login');
});

router.post('/deleteAccount', authenticate, (req, res, next) => {
    removeuser(req, res, next);
});


router.post('/update', authenticate, upload, (req, res, next) => {
    updateuser(req, res, next);
});

router.get('/load',(req,res,next)=>{
    res.render('listing');
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