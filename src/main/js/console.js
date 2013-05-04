function console(source, sink) {
	function readUntil(prompt, validate) {
		var validation, input = this.readString(prompt);
		while ((validation = validate(input)) !== undefined) {
			input = this.readString(validation);
		}
		return input;
	}
	function readNonEmpty(prompt, promptWhenEmpty) {
		return this.readUntil(prompt, function (s) { if (!s) return promptWhenEmpty || prompt; });
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
		readUntil: readUntil,
		readNonEmpty: readNonEmpty,
		readAll: readAll,
		print: sink,
		println: function println(s){this.print(s + "\n");}
	};
}

console.stdio = console(function(prompt){
	return String(read(prompt + "> "));
}, print);