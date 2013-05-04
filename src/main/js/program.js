load("polyfill/Array.js");
load("package.js");
load("console.js");
load("phonebook/ui/readEntry.js");

println = null;

+function mainLoop(con){
	function printUsage(){
		con.println("Available commands:");
		["H", "L", "A", "Q"].foreach(function(cmd){
			con.println(cmd + "\t" + commands[cmd].description);
		});
	}
	function printInfo(){ 
		con.println(contacts.length + " contacts in phonebook."); 
	}
	var commands = {
		"H": {description: "Show help", run: printUsage },
		"L": {description: "List contacts", run: function(){
			contacts.foreach(function(c){ con.println(c.firstName + " " + c.lastName + ": " + c.phone) });
			printInfo();
		}},
		"A": {description: "Add entry", run: function(){ 
			var newEntry = phonebook.ui.readEntry(con);
			if (newEntry) {
				contacts.push(newEntry);
				printInfo();
			}
		}},
		"Q": {description: "Quit", run: function(){ con.println("Bye!")}, terminal: true },
	}
	var contacts = [];
	con.println("Welcome to the address book!");
	con.println("****************************");
	printUsage();
	function handleCommand(commandString) {
		var cmd = commands[commandString.toUpperCase()];
		if (!cmd || typeof cmd.description !== "string" || typeof cmd.run !== "function")  {
			con.println("Unknown command: " + commandString);
			printUsage();
			return true;
		}
		cmd.run();
		return !cmd.terminal;
	}
	while (handleCommand(con.readNonEmpty("What would you like to do?")))
		/* Do nothing */;
}(console.stdio)