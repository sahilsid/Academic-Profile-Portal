const router = require('express')();
const request = require('request');

var test = function(){ 
    request('http://172.26.13.228:3000/check', { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
    });
}


var insert_employee = function(id,rank,department){
  data = {
    id          : id,
    rank        : rank,
    department  : department
  }
  request.post({url:'http://172.26.13.228:3000/insert_employee', data: data}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('Request Failed : InsertEmployee :', err);
  }
    console.log('Upload successful!  Server responded with:', body);
  });

}

module.exports=router;