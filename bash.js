var commands = require('./command');
// var userCommand = 'pwd';
// commands[userCommand]();

// console.log(process)
// console.log(Object.keys(process))
// Output a prompt
process.stdout.write('prompt > ');

var cmdList = [];

var done = function(output) {
	// console.log("done: " + cmdList);
	// cmdList.shift();
	// console.log("done 2: " + cmdList);
	console.log("cmdList: " + cmdList);
	cmdList.shift();
	if (cmdList.length > 0) {
		var args = cmdList[0].split(" ")[1];
		var func = cmdList[0].split(" ")[0]
		console.log(func);
		commands[func](args, done, output);
		return
	}
	// if (!output) {
	// 	return
	// }
	process.stdout.write(output);
	process.stdout.write("\nprompt > ");
}



// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  cmdList = cmd.split(/\s*\|\s*/g);

  process.stdout.write('You typed: ' + cmd + "\n");
  var Val = cmd.split(" ");
  var EchoValue = Val.slice(1);
  commands[Val[0]](EchoValue, done);

  setTimeout(function() {
  	// process.stdout.write("\nprompt > ")
  }, 500)
});