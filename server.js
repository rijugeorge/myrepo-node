var express = require ('express');
var app= express();
var bp = require('body-parser');
var _ = require('underscore');

//touch

app.use(express.static ('public'));
app.use(bp.json());

var mytasks = [
   {
   	  des:  "go to office",
      status: "Done"
   },
   {
   	  des:  "Attend training",
      status: " In - progress"
   }

];

//nextid = _.max(mytasks.id);
nextid = 3;
console.log('Next ID is' + nextid);


app.get('/gettask',function(req,res){
	
	res.json(mytasks);
});

app.get('/gettask/:id',function(req,res){

    var requestid = parseInt(req.params.id,10);

    var matchingid = _.findWhere( mytasks,{id:requestid});

    if ( matchingid){
    	
    	res.json(mytasks[requestid-1]);
    }else{
    	res.status(404).send();
    }

	res.json(mytasks);
});


app.post('/postmytask',function(req,res){
	
	var data = req.body;
	data.id = nextid++;
	mytasks.push(data);
	res.json(data);


});

app.delete('/deletemytask/:id',function(req,res){
	
	  var requestid = parseInt(req.params.id,10);

    var matchingid = _.findWhere( mytasks,{id:requestid});

    if (!matchingid){
    	res.status(404).json({"Error": "id not found "});
    }else{
    	mytasks = _.without(mytasks,matchingid);
    	res.json(matchingid);
    }



});


app.listen(3000, function(){
	
	console.log('Application is running in port 300');


});