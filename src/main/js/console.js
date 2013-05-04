function console(source, sink) {
	function readWhile(prompt, validate) {
		var validation, input = this.readString(prompt);
		while ((validation = validate(input))) {
			input = this.readString(typeof validation === "string" ? validation : prompt);
		}
		return input;
	}
	function readNonEmpty(prompt, promptWhenEmpty) {
		return this.readWhile(prompt, function (s) { if (!s) return promptWhenEmpty || prompt; });
	}
	function readAll(prompts){
		var read = [];
		for (var i = 0; i < prompts.length; i++) {
			var s = this.readString(prompts[i]);
			if (s) read.push(s);
			else return undefined;
		}
		return read;
	}
	return {
		readString: source,
		readWhile: readWhile,
		readNonEmpty: readNonEmpty,
		readAll: readAll,
		print: sink,
		println: function println(s){this.print(s + "\n");}
	};
}

console.stdio = console(function(prompt){
	return String(read(prompt + "> "));
}, print);