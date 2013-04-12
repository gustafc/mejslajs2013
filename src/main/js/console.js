function console(readString) {
	function readUntil(prompt, validate) {
		var validation, input = readString(prompt);
		while ((validation = validate(input)) !== undefined) {
			input = readString(validation);
		}
		return input;
	}
	function readNonEmpty(prompt, promptWhenEmpty) {
		return readUntil(prompt, function (s) { if (!s) return promptWhenEmpty || prompt; });
	}
	return {
		readString: readString,
		readUntil: readUntil,
		readNonEmpty: readNonEmpty
	};
}

console.stdin = console(function(prompt){
	return String(read(prompt + "> "));
});