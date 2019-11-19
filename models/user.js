const mongoose = require('mongoose');
var mongoosastic = require('mongoosastic')
const userSchema = mongoose.Schema({

        _id: mongoose.Schema.Types.ObjectId,
        name: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                index: {
                        unique: true
                }
        },
        contact_no:{
                type : Number
        },
        password: {
                type: String,
                required: true
        },
        email_verified: {
                type: Boolean,
        },
        bio :{
                type:String
        },
        designation:{
                title :{
                        type : String
                },
                rank  :{
                        type : Number,
                        min  : 0,
                        max  : 5
                }
        }
        ,
        address:{
                location :{
                        type : String
                },
                office  :{
                        type : String
                }
        }
        ,
        department :{
                type : String
        }
        ,
        education:[
                {
                        title:{
                                type:String,
                                required:true
                        },
                        year:{
                                start:{
                                        type:Number,
                                        min : 1900,
                                        max : 2020
                                },
                                end:{
                                        type:Number,
                                        min : 1900,
                                        max : 2020
                                }
                        },
                        institution:{
                                type:String
                        },
                        place : {
                                type:String
                        },
                        description : {
                                type : String
                        }
                
                }
        ],
        experience:[{
                title:{
                        type:String,
                        required:true
                },
                year:{
                        start:{
                                type:Number,
                                min : 1900,
                                max : 2020
                        },
                        end:{
                                type:Number,
                                min : 1900,
                                max : 2020
                        }
                },
                institution:{
                        type:String
                },
                place : {
                        type:String
                },
                description:{
                        type:String
                }
        }]
        ,
        date_joined :  {type:Date},
        
        publications:[
                {
                        title:{
                                type:String,
                                required:true
                        },
                        
                        description:{
                                type:String
                        },
                        date:{
                                day : {
                                        type:Number
                                },
                                month :{
                                        type : String
                                },
                                year : {
                                        type:Number
                                }
                        },
                        at :{
                                type:String
                        },
                        co_authors :{
                                type:String
                        },
                        location   :{
                                type : String
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
                        },
                        sponsor : {
                                type : String
                        },
                        year :{
                                start : {
                                        type:Number
                                },
                                end : {
                                        type:Number
                                }
                        },
                        location:{
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
                        institution:{
                                type : String
                        }
                        ,
                        year :{
                                type : Number,
                                min  : 1900,
                                max  : 2020
                        },
                        session:{
                                type:String
                        },
                        description:{
                                type:String
                        }
                }
        ]
        ,
        usr_img_path: {
                type: String
        }
});
module.exports = mongoose.model('User', userSchema);