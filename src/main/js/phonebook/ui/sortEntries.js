declarePackage("phonebook", "ui").sortEntries = function sortEntries(con, entries) {
	function compare(a, b) {
		if (a === b) return 0;
		return a < b ? -1 : 1;
	}
	function on(property){
		return function (a, b){ return compare(a[property], b[property]); };
	}
	var propsByName = { first: "firstName", last: "lastName", phone: "phone", reverse: "reverse" };
	var sortProperty = propsByName[con.readWhile("Sort on first, last, or phone; or reverse?", function(s){ 
		return !propsByName.hasOwnProperty(s.toLowerCase());
	}).toLowerCase()];
	if (sortProperty === "reverse") entries.reverse();
	else entries.sort(on(sortProperty));
}