var express = require ('express');
var app= express();
var bp = require('body-parser');
var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient;

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

var db;

MongoClient.connect('mongodb://admin:admin@ds111188.mlab.com:11188/rij_db',
            (err,database) => {
              
              if ( err) {return console.log(err)}
              else {db= database }

            }
);

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

app.post('/adddata',(req,res) => {
    db.collection('usertable').save(req.body,(err,result) =>{
      
       if ( err) { return console.log("err") }
        else { console.log('record saved '); }
    });
    res.send("Collection Saved ");
});


//app.put('/updatedata',(req,res)=>{
  
//       db.collection('usertable').findOneAndUpdate({name:req.body.name},{
 //       $set:{ 
  //      )
//})

app.listen(3000, function(){
	
	console.log('Application is running in port 300');


});