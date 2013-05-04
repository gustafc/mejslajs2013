load("package.js");
load("console.js");
load("phonebook/search.js");
load("phonebook/renderEntry.js");
load("phonebook/ui/showEntry.js");
load("phonebook/ui/readEntry.js");
load("phonebook/ui/removeEntries.js");

println = null;

+function mainLoop(con){
	var contacts = [
		{firstName: "Francoise", lastName: "Bedel", phone: "070-123 45 67"},
		{firstName: "Andre", lastName: "Clouet", phone: "070-987 65 43"},
		{firstName: "Dom", lastName: "Perignon", phone: "076-345 67 89"}
	];
	con.println("Welcome to the address book!");
	con.println("****************************");
	function printUsage(){
		con.println("Available commands:");
		["H", "A", "L", "F", "R", "Q"].forEach(function(cmd){
			con.println(cmd + "\t" + commands[cmd].description);
		});
	}
	function printInfo(){ 
		con.println("You have " + contacts.length + " contacts in your phonebook."); 
	}
	var commands = {
		"H": {description: "Show help", run: printUsage },
		"A": {description: "Add contact", run: function(){ 
			var newEntry = phonebook.ui.readEntry(con);
			if (newEntry) {
				contacts.push(newEntry);
				printInfo();
			}
		}},
		"L": {description: "List contacts", run: function(){
			contacts.forEach(phonebook.ui.showEntry(con));
			printInfo();
		}},
		"F": {description: "Find contacts", run: function(){
			var matching = phonebook.search(contacts, con.readString("Enter search string"), ["firstName", "lastName"]);
			if (matching.length > 0) {
				matching.forEach(phonebook.ui.showEntry(con));
				con.println(matching.length + " matching records.");
			} else con.println("No matching entries.");
		}},
		"R": {description: "Remove contacts", run: function(){
			var sizeBefore = contacts.length;
			contacts = phonebook.ui.removeEntries(con, contacts);
			con.print((sizeBefore - contacts.length) + " contacts removed. ");
			printInfo();
		}},
		"Q": {description: "Quit", run: function(){ con.println("Bye!")}, terminal: true },
	}
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
	printUsage();
	printInfo();
	while (handleCommand(con.readNonEmpty("What would you like to do?")))
		/* Do nothing */;
}(console.stdio)