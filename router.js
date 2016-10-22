var express = require('express');
var app = express();
app.listen(2000, function(){
  console.log("chodze na 2000")
})

var ewe = {
  imie: 'Ewe',
  naz: 'Fijalko',
  wiek: 55
}
// respond with "hello world" when a GET request is made to the homepage
app.get('/:id' function(req, res) {
  res.json(ewe);
});
