var net = require('net');
var port = 3000;
var answers = ["It is certain.","It is decidedly so.","Without a doubt.","Yes definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes.","Signs point to yes.","Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."]
var server = net.createServer(function(client){
	console.log("Client connected.\r\n")

	client.on("data",function(data){
		var input = data.toString().trim()
		if((/\?+$/g).test(input)){
			client.write(answers[Math.floor((Math.random()*20))])
		} else {
			client.write("Please ask me a 'yes' or 'no' question with a '?'")
		}

	});

	client.on("end",function(){
		console.log("Client disconnected.\r\n");
	});

});

server.listen(port, function(){
	console.log("Listening on "+port);
})