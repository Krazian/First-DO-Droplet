var net = require('net');
var client = net.Socket();

client.connect({port:3000, host:"localhost"},function(){
	console.log("Connected to server\r\n");
	console.log("Would you like to 'add', 'list', or 'remove'?\r\n");

	client.on("data",function(data){
		console.log(data.toString().trim());
	});//Display input on client side

	process.stdin.on("data",function(input){
		client.write(input.toString().trim());
	});//Display input on server side

	client.on("end",function(){
		console.log("Client disconnected");
	});//End of client disconnect
});//End of client connect