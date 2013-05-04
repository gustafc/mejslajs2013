declarePackage("phonebook").search = function search(contacts, query, properties) {
	if (!query) return [];
	var queryUpper = query.toUpperCase();
	return contacts.filter(function(c){
		function isMatch(p){ return String(c[p].toUpperCase()).indexOf(queryUpper) >= 0; }
		return properties.some(isMatch);
	});
}