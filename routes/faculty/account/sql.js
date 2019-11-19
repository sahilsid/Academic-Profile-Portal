const request = require('request');

var insert_employee = function(id,rank,department){
  var data = {
    id          : id,
    rank        : rank,
    department  : department
  };

  request('http://172.26.13.228:3000/insert_employee?data='+JSON.stringify(data), { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body);
  });

};

var apply_for_leave = function(id,description,start_date,end_date,res){
    
    var data = {
        id          : id,
        description : description,
        start_date  : start_date,
        end_date    : end_date
    };
    
    request('http://172.26.13.228:3000/apply_for_leave?data='+JSON.stringify(data), { json: true }, (err, response, body) => {
        if (err) 
          res.json({
              success   : false,
              error     : err
          });
        else{
          if(body.success)
          res.json({
                success   :true,
                result    :body
            });
          else 
          res.json({
                success : false,
                error   : body.error.sqlMessage 
            });
        }
    });
};

var application_history = function(id,res){
    var data = {
        id  : id
    };
    
    request('http://172.26.13.228:3000/application_history?data='+JSON.stringify(data), { json: true }, (err, response, body) => {
        if (err) 
          res.json({
              success   : false,
              error     : err
          });
        else{
          if(body.success)
          res.json(body);
          else 
          res.json({
                success : false,
                error   : body.error.sqlMessage 
            });
        }
    });
}

var application_log = function(id,res){
    var data = {
        application_id  : id
    };
    
    request('http://172.26.13.228:3000/application_log?data='+JSON.stringify(data), { json: true }, (err, response, body) => {
        if (err) 
          res.json({
              success   : false,
              error     : err
          });
        else{
          if(body.success)
            res.json(body);
          else 
          res.json({
                success : false,
                error   : body.error.sqlMessage 
            });
        }
    });
}

var other_employee_leave_details = function(id,res){
    var data = {
        id  : id
    };
    
    request('http://172.26.13.228:3000/other_employee_leaves?data='+JSON.stringify(data), { json: true }, (err, response, body) => {
        if (err) 
          res.json({
              success   : false,
              error     : err
          });
        else{
          if(body.success)
            res.json(body);
          else 
          res.json({
                success : false,
                error   : body.error.sqlMessage 
            });
        }
    });
}

var load_pending_applications = function(id,res){
    var data = {
        id  : id
    };
    
    request('http://172.26.13.228:3000/pending_applications?data='+JSON.stringify(data), { json: true }, (err, response, body) => {
        if (err) 
          res.json({
              success   : false,
              error     : err
          });
        else{
          if(body.success)
            res.json(body);
          else 
          res.json({
                success : false,
                error   : body.error.sqlMessage 
            });
        }
    });
}

var withdraw_application = function(id,res){
  var data = {
      id  : id
  };
  
  request('http://172.26.13.228:3000/withdraw_application?data='+JSON.stringify(data), { json: true }, (err, response, body) => {
      if (err) 
        res.json({
            success   : false,
            error     : err
        });
      else{
        if(body.success)
          res.json(body);
        else 
        res.json({
              success : false,
              error   : body.error.sqlMessage 
          });
      }
  });
}



var updateApplication = function(id,data,res,start_date='2012-12-12',end_date='2012-12-12'){
  

  var input = {
      approving_id          : id,
      application_id : data.application_id,
      comment        : data.comment,
      start_date   : start_date,
      end_date     : end_date,
      action       : data.action
  };
  
  console.log(input)

  request('http://172.26.13.228:3000/update_application?data='+JSON.stringify(input), { json: true }, (err, response, body) => {
      if (err) 
        res.json({
            success   : false,
            error     : err
        });
      else{
        if(body.success)
        res.json({
              success   :true,
              result    :body
          });
        else 
        res.json({
              success : false,
              error   : body.error.sqlMessage 
          });
      }
  });
};


var rank_and_route = function(res){
  
 
  request('http://172.26.13.228:3000/rank_and_route?data='+JSON.stringify(input), { json: true }, (err, response, body) => {
      if (err) 
        res.json({
            success   : false,
            error     : err
        });
      else{
        if(body.success)
        res.json({
              success   :true,
              result    :body
          });
        else 
        res.json({
              success : false,
              error   : body.error.sqlMessage 
          });
      }
  });
};



module.exports = {
    insert_employee : insert_employee,
    apply_for_leave : apply_for_leave,
    application_history : application_history,
    application_log : application_log,
    other_employee_leave_details : other_employee_leave_details,
    load_pending_applications : load_pending_applications,
    updateApplication : updateApplication,
    rank_and_route : rank_and_route,
    withdraw_application:withdraw_application
};