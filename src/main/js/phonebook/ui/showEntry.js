declarePackage("phonebook", "ui").showEntry = function(con){
	return function(entry){ con.println(entry.firstName + " " + entry.lastName + ": " + entry.phone)};
}