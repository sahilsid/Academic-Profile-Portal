const express = require('express');
const router = express.Router();
const authenticate = require("../../../middleware/checkAuth");
const multer = require('multer');
const jwt = require('jsonwebtoken');
var sql = require('./sql');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, req.userDat['userId']+'.png');
    }
});
var fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
        req.containsImg = true;
        cb(null, true);
    } else
        cb(null, false);
}
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 10240 * 10240 * 20
    },
    fileFilter: fileFilter
}).single('image');


var adduser = require('./add');
var removeuser = require('./remove');
var updateuser = require('./update');
var login = require('./login');
var getlist = require('./getlist');
var details = require('./get');
var updateArray = require('./updateArray');
var removeArray = require('./removeArray');

router.post('/getlist',(req,res,next)=>{
    getlist(req,res,next);
});

router.post('/add', (req, res, next) => {
    adduser(req, res, next);
});


router.post('/login', (req, res, next) => {
    login(req, res, next);
});

router.get('/dashboard',(req,res,next)=>{
    res.render('admin_dashboard');
});

// router.post('/login', (req, res, next) => {
//     console.log('login hi')
//     console.log(req.body);
//     if(req.body.username=='sahil'&&req.body.password=='parth'){
//         const token = jwt.sign({
//             admin:'sahil',
//         }, "kryptore@Sah$Koustav354$bbvcgF23$djsdkjdnksjhjcbPO0bNfjfdPO@kdfm$$", {
//             expiresIn: "1h"
//         });
//         res.json({
//             success : true,
//             token   : token
//         });
//     }
        
//     else
//         res.json({
//             success : false
//         });
// });

router.get('/loginpage', (req, res, next) => {
   res.render('faculty_login');
});

router.post('/deleteAccount', authenticate, (req, res, next) => {
    removeuser(req, res, next);
});

var testupload = multer({ dest: './' })

router.post('/update', authenticate, upload, (req, res, next) => {
    updateuser(req, res, next);
});



router.post('/updateArray', authenticate, upload, (req, res, next) => {
    updateArray(req, res, next);
});

router.post('/removeArray', authenticate, upload, (req, res, next) => {
    removeArray(req, res, next);
});


router.post('/get', (req, res, next) => {
    details(req,res,next);
});

router.post('/getwithtoken',authenticate, (req, res, next) => {
    details(req,res,next);
});


router.get('/load',(req,res,next)=>{
    res.render('listing');
});

router.post('/apply_for_leave',authenticate,(req,res,next)=>{
    sql.apply_for_leave(req.userId,req.body.leave_description,req.body.leave_from,req.body.leave_to,res);
});

router.post('/application_history',authenticate,(req,res,next)=>{
    sql.application_history(req.userId,res);
});


router.post('/updateApplication',authenticate,(req,res,next)=>{
    console.log("hihih");
    sql.updateApplication(req.userId,req.body.data,res);
});

router.post('/apply_for_renew',authenticate,(req,res,next)=>{
    var data = {
        application_id : req.body.application_id,
        comment : req.body.leave_description,
        action  : 'Renew'
    }
    sql.updateApplication(req.userId,data,res,req.body.leave_from,req.body.leave_to);
});


router.post('/load_pending_applications',authenticate,(req,res,next)=>{
    sql.load_pending_applications(req.userId,res);
});


router.post('/other_employees_leave',authenticate,(req,res,next)=>{
    console.log('Inside ');
    sql.other_employee_leave_details(req.userId,res);
});

router.post('/application_log',authenticate,(req,res,next)=>{
    sql.application_log(req.body.id,res);
});


router.post('/withdraw_application',authenticate,(req,res,next)=>{
    sql.withdraw_application(req.userId,res);
});



router.post('/rank_and_route',(req,res,next)=>{
    sql.rank_and_route(res);
});

router.get('/test', (req, res, next) => {
    console.log("Testing");
    console.log(req);
    res.json({
        count : 2
    });
});


module.exports = router;