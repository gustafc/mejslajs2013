load("console.js");

var Command = {
	QUIT: "Q",
	HELP: "H"
}

function printUsage(){
	function printCmd(s, desc){ println("  " + s + "\t" + desc); }
	println("Available commands:");
	printCmd(Command.HELP, "Show this help");
	printCmd(Command.QUIT, "Quit");
}

println("Welcome to the address book!");
println("****************************");
printUsage();
+function mainLoop(con){
	function handleCommand(cmd) {
		switch (cmd) {
			case Command.QUIT: return false;
			case Command.HELP: 
				printUsage();
				break;
			default:
				println("Invalid command: " + cmd);
				printUsage();
				break;
		}
		return true;
	}
	while (handleCommand(con.readNonEmpty("What would you like to do?").toUpperCase()))
		;
}(console.stdin)