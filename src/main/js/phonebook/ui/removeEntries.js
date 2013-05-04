declarePackage("phonebook", "ui").removeEntries = function removeEntries(con, entries) {
	var deleteCandidates = phonebook.search(entries, con.readString("Search for contacts to remove"), ["firstName", "lastName", "phone"]);
	if (deleteCandidates.length == 0) {
		con.println("No matching contacts found.");
		return entries;
	}
	con.println(deleteCandidates.length + " of " + entries.length + " contacts match: ");
	deleteCandidates.forEach(phonebook.ui.showEntry(con));
	con.println("To delete all, type '!'; to abort, type '-'.");
	var bulkOperation; // all="Remove all", abort="keep all"
	var filtered = entries.filter(function(c){
		var KEEP = true, REMOVE = false;
		if (bulkOperation === "abort"  || deleteCandidates.indexOf(c) == -1) return KEEP;
		if (bulkOperation === "all") return REMOVE;
		var action = con.readWhile("Remove " + phonebook.renderEntry(c) + "? [yn!-]", function(s){ return !/^[yn!\-]$/i.test(s) });
		switch (action.toUpperCase()) {
			case "!": bulkOperation = "all"; // fall through...
			case "Y": return REMOVE;
			case "-": bulkOperation = "abort"; // fall through...
			case "N": return KEEP;
		}
	});
	return bulkOperation === "abort" ? entries : filtered;
}