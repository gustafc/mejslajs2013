declarePackage("phonebook").renderEntry = function renderEntry(entry){
	return entry.firstName + " " + entry.lastName + ": " + entry.phone;
}