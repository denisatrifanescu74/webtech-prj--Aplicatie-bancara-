var express =require("express");
var bodyParser=require("body-parser");
var cors=require("cors");
var Sequelize=require("sequelize");

//init sequelize connection
var sequelize=new Sequelize('project','denisastud', '',{
  dialect:'mysql',
  host:'127.0.0.1',
  port:3306
});

//define entity
var Customer=sequelize.define('customers',{
  name:{
    type:Sequelize.STRING,
    field:'name'
  },
  forename:{
    type:Sequelize.STRING,
    field:'forename'
  },
  address:{
    type:Sequelize.STRING,
    field:'address'
  },
  salary:{
    type:Sequelize.STRING,
    field:'salary'
  }
},{
freezeTableName:false,
timestamps:false
});

//define entity Command
var Command=sequelize.define('commands',{
  type:{
    type:Sequelize.STRING,
    field:'type'
  },
  date:{
    type:Sequelize.STRING,
    field:'date'
  },
  details:{
    type:Sequelize.STRING,
    field:'details'
  }
},{
freezeTableName:false,
timestamps:false
});

var app=express();
app.use(bodyParser.json());
app.use(cors());


var nodeadmin=require('nodeadmin');
app.use(nodeadmin(app));

var data=[{id:1},{id:2},{id:3}];

//create new resource
app.post('/customers',function(request,response){
  Customer.create(request.body).then(function(customer){
    Customer.findById(customer.id).then(function(customer){
       response.status(201).send(customer);
    });
  });
});

//read all
app.get('/customers',function(request,response){
  Customer.findAll().then(function(customers){
    response.status(200).send(customers);
  });
});

//read one by id
app.get('/customers/:id',function(request,response){
  Customer.findById(request.params.id).then(function(customer){
    if(customer){
      response.status(200).send(customer);
    }
    else
    {
       response.status(404).send();
    }
  });
});

//update one by id
app.put('/customers/:id',function(request,response){
  Customer
  .findById(request.params.id)
  .then(function(customer){
    if(customer){
      customer
      .updateAttributes(request.body)
      .then(function(){
        response.status(200).send('updated');
      })
      .catch(function(error){
        console.warn(error);
        response.status(500).send('server error');
      });
    }
    else
    {
      response.status(404).send();
    }
  });
});

//delete one by id
app.delete('/customers/:id',function(req,res){
  Customer
  .findById(req.params.id)
  .then(function(customer){
    if(customer){
      customer
      .destroy()
      .then(function(){
        res.status(204).send();
      })
      .catch(function(error){
        console.warn(error);
        res.status(500).send('server error');
      });
    }
    else{
      res.status(404).send();
    }
  });
});


//create new resource commands
app.post('/commands',function(request,response){
  Command.create(request.body).then(function(command){
   Command.findById(command.id_com).then(function(command){
       response.status(201).send(command);
    });
  });
});
//read all from commands
app.get('/commands',function(request,response){
  Command.findAll().then(function(commands){
    response.status(200).send(commands);
  });
});

//read one by  from commands
app.get('/commands/:id_com',function(request,response){
  Command.findById(request.params.id_com).then(function(command){
    if(command){
      response.status(200).send(command);
    }
    else
    {
       response.status(404).send();
    }
  });
});

//update one by id from commands
app.put('/commands/:id_com',function(request,response){
 Command
  .findById(request.params.id_com)
  .then(function(command){
    if(command){
     command
      .updateAttributes(request.body)
      .then(function(){
        response.status(200).send('updated');
      })
      .catch(function(error){
        console.warn(error);
        response.status(500).send('server error');
      });
    }
    else
    {
      response.status(404).send();
    }
  });
});

//delete one by id from commands
app.delete('/commands/:id_com',function(req,res){
 Command
  .findById(req.params.id_com)
  .then(function(command){
    if(command){
      command
      .destroy()
      .then(function(){
        res.status(204).send();
      })
      .catch(function(error){
        console.warn(error);
        res.status(500).send('server error');
      });
    }
    else{
      res.status(404).send();
    }
  });
});


//include static files in the admin folder
app.use('/admin',express.static('admin'));

//app.get('/',function(req,res){
 //res.redirect("/admin");
//});


app.listen(process.env.PORT);
