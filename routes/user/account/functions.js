const User = require("../../../models/user");
const Otp = require("../../../models/otp");
const mongoose = require('mongoose');

var sendMail = function (emailId, subject, body, callback) {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kryptoreServices@gmail.com',
            pass: 'kryptoreiitropar'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'kryptoreServices@gmail.com',
        to: emailId,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback({
                message: "Error sending verification link via Email",
                success: false
            });
        } else {
            console.log('Email sent: ' + info.response);
            callback({
                message: "Account verification link sent via Email",
                success: true
            });
        }
    });
}

var sendVerificationLink = function (userId, emailId, callback) {
    const link = `localhost:3000/userAccount/verify/${userId}`;
    const subject = "Email Verification - Kryptore";
    const body = "Thank you for signing up with Kryptore. Please click the follwing link to verify your account : " + link;
    sendMail(emailId, subject, body, function (emailverification) {
        callback(emailverification);
    });
}

var sendPassResetLink = function (token, emailId, callback) {
    const link =  `localhost:3000/userAccount/resetPass/${token}`;
    const subject = "Password Reset - Kryptore";
    const body = "Please click the follwing link to reset your password : " + link;
    sendMail(emailId, subject, body, function (mailsent) {
        callback(mailsent);
    });
}

var sendotp = function (mobile_no, callback) {
    console.log('mobile_no');
    User.find({
            mobile_no: mobile_no
        }).exec()
        .then(result => {
            if (!result[0])
                callback({
                    message: "Invalid User. Sending OTP failed.",
                    success: false
                });
            else {
                otp = new Otp({
                    _id: mongoose.Types.ObjectId(),
                    mobile_no: mobile_no,
                    value: otpGenerator.generate(5, {
                        digits: true,
                        alphabets: false,
                        upperCase: false,
                        specialChars: false
                    })
                });
                otp.save()
                    .then(result => {
                        console.log(result);
                        callback({
                            message: "Otp Generation Successful.",
                            success: true
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        callback({
                            message: "Error generating OTP",
                            success: false
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            callback({
                message: "Invalid user. Sending OTP failed.",
                success: false
            });
        });
};

var generateDefaultIcon = function (username, userId, callback) {
    var fs = require('fs');
    var text2png = require('text2png');
    var randomColor = require('randomcolor');
    var filename = encrypt(String(userId));
    fs.writeFileSync('./public/images/users/' + filename + '.png', text2png(String(username[0]).toUpperCase(), {
        font: '80px Futura',
        color: 'white',
        backgroundColor: randomColor({
            luminosity: 'dark',
            format: 'rgb'
        }),
        lineSpacing: 10,
        padding: 20
    }));
    callback('/images/users/' + filename + '.png');
};

var encrypt = function (text) {
    var crypto = require('crypto');
    var cipher = crypto.createCipher('aes-256-cbc', 'kryptore56534524himankoust6537')
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
};
var decrypt = function (text) {
    var crypto = require('crypto');
    var decipher = crypto.createDecipher('aes-256-cbc', 'kryptore56534524himankoust6537')
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    console.log(dec);
    return dec;
};

module.exports = {
    sendMail: sendMail,
    sendVerificationLink: sendVerificationLink,
    sendPassResetLink: sendPassResetLink,
    sendotp: sendotp,
    generateDefaultIcon: generateDefaultIcon,
    encrypt: encrypt,
    decrypt: decrypt
}