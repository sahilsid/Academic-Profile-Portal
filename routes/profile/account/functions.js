const User = require("../../../models/user");
const mongoose = require('mongoose');

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
    generateDefaultIcon: generateDefaultIcon,
    encrypt: encrypt,
    decrypt: decrypt
}