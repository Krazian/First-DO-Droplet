var net = require("net");
var client = net.Socket();

client.connect({port:3000, host:"localhost"}, function(){
	console.log("Connected to server.\r\n")
	console.log("        _.a$$$$$a._")
	console.log("      ,$$$$$$$$$$$$$.")
	console.log("     ,$$$$$$$$$$$$$$$$$.")
	console.log("    d$$$$$$$$$$$$$$$$$$$b")
	console.log("  d$$$$$$$$~'''`~$$$$$$$$b")
	console.log(" ($$$$$$$p   _   q$$$$$$$)")
	console.log(" $$$$$$$$   (_)   $$$$$$$$")
	console.log(" $$$$$$$$   (_)   $$$$$$$$")
	console.log(" ($$$$$$$b       d$$$$$$$)")
	console.log("  q$$$$$$$$a._.a$$$$$$$$p")
	console.log("   q$$$$$$$$$$$$$$$$$$$p")
	console.log("    `$$$$$$$$$$$$$$$$$'")
	console.log("      '$$$$$$$$$$$$$'")
	console.log("         ~$$$$$$$~'\r\n")
	 console.log("Ask a 'yes' or 'no' question and I shall tell.\r\n")

	client.on("data",function(data){
		console.log(data.toString().trim());
		});

	process.stdin.on("data",function(input){
		client.write(input.toString().trim());
	});

	client.on("end",function(){
		console.log("Client disconnected");
	});
});