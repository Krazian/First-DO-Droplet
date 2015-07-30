var http = require("http");
var url = require("url");
var fs = require("fs");
//end of modules/packages

//create server at port 3000
var server = http.createServer().listen(3000);

//variable for json object
var sightings = JSON.parse(fs.readFileSync('sightings.json','utf8',function(err){}));

//on request from client, do following responses
server.on("request",function(request, response){
var urlObj = url.parse(request.url); 
var path = urlObj.pathname;

//function to write the specific page when called
var writing = function(stuff){
	response.writeHead(200,{"Content-Type":"application/json"});
	response.write(JSON.stringify(stuff));
	response.end();
};

//function to write when nothing returns
var sorry = function(){
	response.writeHead(200,{"Content-Type":"application/json"});
	response.write("That doesn't seem to be in the database");
	response.end();
};

//if url contains both / and query
if (path==="/" && urlObj.query){
	//incase user adds a second query
	var theQuerys = urlObj.query.split("&");
	var queryOne = theQuerys[0].split("=")
	//if a second query exists split and remove extra '?'
	if (theQuerys.length === 2){
		var queryTwo = theQuerys[1].split("=")
		queryTwo[0] = queryTwo[0].replace("?","")
	};
	console.log(queryTwo[0])
	console.log(queryTwo)
	
	//switch-case for possible query outcomes
	switch(queryOne[0].toLowerCase()){
		//can't get certain locations to work espc. (UK/England)
		case("location"):
			var found = false;
			var multiple = [];
			sightings.forEach(function(account){
				if ((queryOne[1].toLowerCase())===(account.location.toLowerCase()).replace(/\ /g,"%20")){
					multiple.push(account);
					console.log(account.location.replace(/\ /g,"%20"));
					console.log(queryOne[1]);
					found = true;
				}
			});
			if (found === false){
				sorry();
				} else if (found === true){
					writing(multiple)
				}
			break;
			//search by date
		case("date"):
			var found = false;
			var multiple = [];
			sightings.forEach(function(account){
				var date = account.occurred.split(" ");
				if (queryOne[1]===date[0]){
					multiple.push(account);
					found = true;
					}
				});
			if (found === false){
				sorry();
				} else if (found === true){
					writing(multiple);
				}
			break;
			//search by shap
		case("shape"):
			var found = false;
			var multiple = [];
			sightings.forEach(function(account){
				if (queryOne[1].toLowerCase()===account.shape.toLowerCase()){
					multiple.push(account);
					found = true;
				};
			});
			if (found === false){
				sorry();
				} else if (found === true){
					writing(multiple);
				}
			break;
			//search by id#
		case("id"):
			var found = false;
			sightings.forEach(function(account){
			if (queryOne[1]===account.id.toString()){
				writing(account);
				found = true
				}
			});
			if (found === false){
				sorry();
				}
			break;
			//if tag doesn't exist
		default:
			response.writeHead(200,{"Content-Type":"application/json"});
			response.write("Page not found :>(8>  (That's an alien)")
			response.end()
			break;
	};//end of if / AND query
//index page
} else if (path==="/"){
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write('<!DOCTYPE html><html lang="en"><head></head>');
	  response.write('<body><h1>Welcome to the UFO Sightings Database!!!...JULY EDITION</h1>')
	  response.write('<h3>Use the following to navigate through this index:</h3>')
	  response.write('<h5>Add "/?location=(location)" to find all sightings in a particular area.</h5>')
	  response.write('<h5>Add "/?date=(date)" to find all sightings on a specific date.</h5>')
	  response.write('<h5>Add "/?shape=(shape)" to find all sightings in a specific shape/pattern.</h5>')
  	response.write('<h5>Add "/?id=(id#)" to find the specific sighting.</h5>')
	  response.write('</body></html>')
		response.end();
		//if request page that does not exist
	} else {
		response.writeHead(400,{"Content-Type":"text/html"});
		response.write(":>(8> The alien says: 'Bad Request'");
		response.end();
	}

}); //end of .on event