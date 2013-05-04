function declarePackage() {
	var global = (function(){return this})(), pkg;
	for (var i = 0, parent = global; i < arguments.length; parent = parent[pkg]) {
		pkg = arguments[i++];
		if (typeof pkg !== "string") throw { name: "TypeError", message: (typeof pkg) + " is not a valid package name: " + pkg};
		parent[pkg] = parent[pkg] || {};
	}
	return parent;
}