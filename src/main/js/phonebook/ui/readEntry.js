declarePackage("phonebook", "ui").readEntry = function readEntry(con){
	var details = con.readAll(["First name", "Last name", "Phone number"]);
	if (!details) return undefined;
	else return {
		firstName: details[0],
		lastName: details[1],
		phone: details[2]
	};
}