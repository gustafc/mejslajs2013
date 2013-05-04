declarePackage("phonebook", "ui").searchEntries = function searchEntries(con, entries) {
	var matching = phonebook.search(entries, con.readString("Enter search string"), ["firstName", "lastName"]);
	if (matching.length > 0) {
		matching.forEach(phonebook.ui.showEntry(con));
		con.println(matching.length + " matching records.");
	} else con.println("No matching entries.");
}