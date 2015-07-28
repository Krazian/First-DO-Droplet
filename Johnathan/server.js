var fs = require('fs');
var ejs = require('ejs')
var net = require('net');
var port = 3000;

var Entry = function(id, names, post){
this.id = id
this.name = names;
this.post = post;
};

var serialNumber = function(){
	var code = Math.floor((Math.random()*10)).toString()+Math.floor((Math.random()*10)).toString()+Math.floor((Math.random()*10)).toString()+Math.floor((Math.random()*10)).toString()+Math.floor((Math.random()*10)).toString()
	return code
}
var server = net.createServer(function(client){
	console.log("Client connected\r\n");

	client.on('data',function(data){
		console.log(data.toString().trim());
		var initial = data.toString().split(" ");			
	
		switch (initial[0].toUpperCase()){
			case("ADD"):
			//Gets name
			client.write("Please leave your name/alias.\r\n")
				client.on('data',function(nombre){
					var name = nombre.toString().toUpperCase()				
			//Gets message, constructs the entry and saves
			client.write("Please leave a message you'd like to leave.\r\n")
				client.on('data',function(msg){
					var messages = JSON.parse(fs.readFileSync("messageboard.json","utf8"))
					var newMsg = new Entry(serialNumber(),name,msg.toString());
					messages.push(newMsg);
					fs.writeFile("messageboard.json",JSON.stringify(messages),function(err){});
					client.write("Thanks! I'll add this to the board. Bye-bye!\r\n")
					client.end()					
						})
					})
				break;

			case("LIST"):
				var messages = fs.readFileSync("messageboard.json","utf8")
				client.write(messages);
				break;

			case("REMOVE"):
				client.write("Give me a serial number please or type 'all' to delete everything.\r\n")
				client.on('data',function(numba){
				var messages = JSON.parse(fs.readFileSync("messageboard.json","utf8"))
					if (numba.toString() === 'all'){
						//If delete all, loop thru entire length and pop each entry
						var blank = []
						fs.writeFile("messageboard.json",JSON.stringify(blank),function(err){})
						client.write("There are no more messages.\r\n")
					} else {
						//loops through array
						messages.forEach(function(entry){
							//if match found, delete entry
							if (entry.id===numba.toString().trim()){
							messages.splice(messages.indexOf(entry),1)
							fs.writeFile("messageboard.json",JSON.stringify(messages),function(err){})
						} else if (entry.id!==numba.toString().trim()){
							client.write("Sorry that entry does not exist\r\n");; //if none found change counter, see line 68
							}
						})
					}
				})
				break;
		}

	});
	client.on('end',function(){
		console.log("Client disconnected");
	});//end of user disconnect
});//end of createServer

server.listen(port, function(){
	console.log("Listning on "+port+".\r\n");
});