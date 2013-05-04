declarePackage("phonebook", "ui").showEntry = function(con){
	return function(entry){ con.println(phonebook.renderEntry(entry))};
}