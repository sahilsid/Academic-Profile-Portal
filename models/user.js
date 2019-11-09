const mongoose = require('mongoose');
var mongoosastic = require('mongoosastic')
const userSchema = mongoose.Schema({

        _id: mongoose.Schema.Types.ObjectId,
        username: {
                type: String,
                required: true
        },
        mobile_no: {
                type: Number,
                required: true,
                index: {
                        unique: true
                }
        },
        email: {
                type: String,
                required: true,
                index: {
                        unique: true
                }
        },
        password: {
                type: String,
                required: true
        },
        mobile_verified: {
                type: Boolean,
                required: true
        },
        email_verified: {
                type: Boolean,
                required: true
        },
        education:[
                {
                        qualification:{
                                type:String,
                                required:true
                        },
                        year:{
                                type:Number,
                                min : 1900,
                                max : 2020
                        },
                        institution:{
                                type:String
                        },
                        place : {
                                type:String
                        }
                
                }
        ],
        publications:[
                {
                        title:{
                                type:String,
                                required:true
                        },
                        year : {
                                type:Number,
                                min : 1900,
                                max : 2020
                        },
                        description:{
                                type:String
                        }
                }
        ]
        ,
        grants:[
                {
                        title : {
                                type :String
                        },
                        amount : {
                                type : Number 
                        },
                        description : {
                                type : String
                        }
                }
        ],
        teaching : [
                {
                        course_title : {
                                type : String
                        },
                        course_no : {
                                type : String
                        },
                        year :{
                                type : Number,
                                min  : 1900,
                                max  : 2020
                        }
                }
        ]
        ,
        usr_img_path: {
                type: String
        }
        ,
        inventory: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Inventory'
        }]
});
module.exports = mongoose.model('User', userSchema);