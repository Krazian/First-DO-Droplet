var net = require('net');
var port = 3000;
var answers = ["It is certain.","It is decidedly so.","Without a doubt.","Yes definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes.","Signs point to yes.","Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."]
var server = net.createServer(function(client){
console.log("Client connected.\r\n")
client.write("        _.a$$$$$a._")
client.write("      ,$$$$$$$$$$$$$.")
client.write("     ,$$$$$$$$$$$$$$$$$.")
client.write("    d$$$$$$$$$$$$$$$$$$$b")
client.write("  d$$$$$$$$~'''`~$$$$$$$$b")
client.write(" ($$$$$$$p   _   q$$$$$$$)")
client.write(" $$$$$$$$   (_)   $$$$$$$$")
client.write(" $$$$$$$$   (_)   $$$$$$$$")
client.write(" ($$$$$$$b       d$$$$$$$)")
client.write("  q$$$$$$$$a._.a$$$$$$$$p")
client.write("   q$$$$$$$$$$$$$$$$$$$p")
client.write("    `$$$$$$$$$$$$$$$$$'")
client.write("      '$$$$$$$$$$$$$'")
client.write("         ~$$$$$$$~'\r\n")
client.write("Ask a 'yes' or 'no' question and I shall tell.\r\n")

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