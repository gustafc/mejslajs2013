if (!Array.prototype.foreach) Array.prototype.foreach = function foreach(action) {
	for (var i = 0; i < this.length; i++) action(this[i]);
}