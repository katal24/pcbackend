var express = require('express');
var db = require("seraph")({
  server: "http://localhost:7474",
  user: 'neo4j',
  pass: 'd'
});
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});
app.listen(2000, function(){
  console.log("chodze na 2000");
});


app.get('/user/:id', function(req, res){
  var id = req.params.id;

  db.read(id, function(err, user){
    res.send(user);
  });
});


app.post('/user', function(req, res) {
    var name = req.body.name;
    var login = req.body.login;
    var password = req.body.password;

    db.save({name: name, login: login, password: password}, 'User', function(err, user){
        res.send(user);
    });
});


app.put('/user/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var login = req.body.login;
    var password = req.body.password;

    db.read(id, function(err, user){
      if(login && login!=user.login){
        user.login = login;
      }
      if(password && password!=user.password){
        user.password = password;
      }
      if(name && name!=user.name){
        user.name = name;
      }

      db.save(node, function(err, user){
        res.send(user);
      });
    });
});


app.delete('/user/:id', function(req, res) {
  var id = req.params.id;

  db.delete(id, [true], function(err, user){
      res.send(user);
  });
});

/////////////////////


app.get('/vector/:id', function(req, res){
  var id = req.params.id;

  db.read(id, function(err, vector){
    res.send(vector);
  });
});


app.get('/vectors/:ownerId', function(req, res){
  var ownerId = req.params.ownerId;
  var query = [
    "MATCH (u)-[r:HAS_V]->(v) WHERE id(u)="+ownerId+"",
    "RETURN v",
    "ORDER BY v.name"
  ].join(' ');
  db.query(query, function(err, vectors){
    if(err) throw err;
    res.send(vectors);
  });
});


app.post('/vector', function(req, res) {
    var name = req.body.name;
    var ownerId = req.body.ownerId;
    var values = req.body.values;

    db.read(ownerId, function(err, nodeOwner){
      if(err) throw err;
      db.save({name: name, ownerId: ownerId, values: values}, 'Vector', function(err, nodeVector){
        if(err) throw err;
        db.relate(nodeOwner, 'HAS_V', nodeVector, function(err, rel){
          res.send(nodeVector);
        });
      });
    });
});


app.put('/vector/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var values = req.body.values;

    db.read(id, function(err, vector){
      if(name && name!=vector.name){
        vector.name = name;
      }
      if(values && values!=vector.values){
        vector.values = values;
      }

      db.save(vector, function(err, vector){
        res.send(vector);
      });
    });
});


app.delete('/vector/:id', function(req, res) {
  var id = req.params.id;

  db.delete(id, [true], function(err, vector){
      res.send(vector);
  });
});



/////////////////////


app.get('/matrix/:id', function(req, res){
  var id = req.params.id;

  db.read(id, function(err, matrix){
    res.send(matrix);
  });
});


app.get('/matrices/:ownerId', function(req, res){
  var ownerId = req.params.ownerId;
  var query = [
    "MATCH (u)-[r:HAS_M]->(m) WHERE id(u)="+ownerId+"",
    "RETURN m",
    "ORDER BY m.name"
  ].join(' ');
  db.query(query, function(err, matrices){
    if(err) throw err;
    res.send(matrices);
  });
});


app.post('/matrix', function(req, res) {
    var name = req.body.name;
    var ownerId = req.body.ownerId;
    var values = req.body.values;
    var dimension = req.body.dimension;

    db.read(ownerId, function(err, nodeOwner){
      if(err) throw err;
      db.save({name: name, ownerId: ownerId, values: values}, 'Matrix', function(err, nodeMatrix){
        if(err) throw err;
        db.relate(nodeOwner, 'HAS_M', nodeMatrix, function(err, rel){
          res.send(nodeMatrix);
        });
      });
    });
});


app.put('/matrix/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var values = req.body.values;
    var dimension = req.body.dimension;

    db.read(id, function(err, node){
      if(name && name!=node.name){
        node.name = name;
      }
      if(values && values!=node.values){
        node.values = values;
      }
      if(dimension && dimension!=node.dimension){
        node.dimension = dimension;
      }

      db.save(node, function(err, matrix){
        res.send(matrix);
      });
    });
});


app.delete('/matrix/:id', function(req, res) {
  var id = req.params.id;

  db.delete(id, [true], function(err, matrix){
      res.send(matrix);
  });
});




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
