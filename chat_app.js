var net = require('net');
var fs = require('fs');
var chalk = require('chalk');
var port = 2000;
var logs = JSON.parse(fs.readFileSync("chat_log.json","utf8"));
var room = [];
var counter = 0;

var Submissions = function(person,time,message){
	this.person = person;
	this.time = time;
	this.message = message;
};

var server = net.createServer(function(client){
	counter++;
	console.log("Client connected\r\n");
	//menu display
	client.write(chalk.blue("|---------------------------------------------------------------------|\r\n|--------------------"+chalk.cyan("Enter either of the following")+"--------------------|\r\n|---------------"+chalk.yellow("'/Username + (name)'")+" to set your name-----------------|\r\n|-------------------"+chalk.yellow("'/History'")+" to display chatlog---------------------|\r\n|----------------"+chalk.yellow("'/Speak+(message)'")+" to add to the chat----------------|\r\n|--------------------"+chalk.yellow("'/yell+(message)'")+" to... YELL---------------------|\r\n|--------------------"+chalk.yellow("'/tableflip'")+" to flip tables----------------------|\r\n|-------------------------"+chalk.yellow("'/exit'")+" to disconnect-------------------------|\r\n|---------------------------------------------------------------------|\r\n\r\n"));
	client.write(counter+" user(s) currently in chat\r\n");
	room.push(client);
	var name = ("Default Name");

		//writes to each person in the room
		room.forEach(function(person){
			person.write(chalk.green("A new person has joined the room\r\n"));
		});
		logs.push(name+" has connected at "+new Date(Date.now())+".");
		fs.writeFile("chat_log.json",JSON.stringify(logs),function(err){});
	
	client.on("data",function(data){
		//function to display message to everyone and log into history
		var submit = function(){
			room.forEach(function(person){
					person.write((newMsg.person)+" ("+newMsg.time+"): "+newMsg.message+"\r\n");
						});
				fs.writeFile("chat_log.json",JSON.stringify(logs),function(err){});
		}

		var input = data.toString().trim().split(" ");
		console.log("User requesting "+input[0].toString())
		switch(input[0].toLowerCase()){
			case("/history"):
				logs.forEach(function(entry){
				client.write(JSON.stringify(entry)+"\r\n");
				});
				break;

			case("/username"):
				input.splice(0,1);
				name = input.join(" ");
				client.write("Username changed to "+name+"\r\n")
				logs.push("Default Name has changed username to "+name+".");
				fs.writeFile("chat_log.json",JSON.stringify(logs),function(err){});
				break;

			case("/speak"):
				var timeStamp = new Date(Date.now());
				input.splice(0,1);
				var newMsg = new Submissions(name,timeStamp,input.join(" "));
				logs.push(newMsg);
				submit();
				break;
			
			case("/yell"):
				var timeStamp = new Date(Date.now());
				input.splice(0,1);
				var newMsg = new Submissions(name,timeStamp,input.join(" ").toUpperCase());
				logs.push(newMsg);
				submit();
				break;
				
			case("/tableflip"):
				var timeStamp = new Date(Date.now());
				var newMsg = new Submissions(name,timeStamp,chalk.magenta("`(╯°□°）╯︵ ")+chalk.red("┻━┻"));
				logs.push(newMsg);
				submit();
				break;

			case("/exit"):
				client.end();
				break;

			default:
				client.write(chalk.red("Command not found.\r\n"))
				break;
		};
	});

	client.on("end",function(){
		//When person disconnect, remove from array and notify everyon
		counter--;
		console.log("Client disconnected");
		room.splice(room.indexOf(client),1)
		room.forEach(function(person){
			person.write(chalk.red(name+" disconnected\r\n"));
		});
		logs.push(name+" disconnected at "+new Date(Date.now())+".");
		fs.writeFile("chat_log.json",JSON.stringify(logs),function(err){});

	});
});

server.listen(port,function(){
	console.log("Listening on port: "+port);
});