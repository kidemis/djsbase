const path = require('node:path');

class Command {
	constructor(data, execute, options) {
		this.data = data;
		this.execute = execute;
	}

	get name () {
		return this.data.name;
	}

	static getName(filepath) {
		const name = typeof filepath === 'string' && filepath.length > 0 ? filepath : (()=>{
			// Thx stackoverflow!
			// https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function
			
			const pst = Error.prepareStackTrace;
			let callerfile;
			try {
				const err = new Error();
				let currentfile;
				Error.prepareStackTrace = function (err, stack) { return stack; };
				currentfile = err.stack.shift().getFileName();
				while (err.stack.length) {
					callerfile = err.stack.shift().getFileName();
					if(currentfile !== callerfile) break;
				}
			} catch (e) {}
			Error.prepareStackTrace = pst;

			return callerfile;
		})();
		
		return path.basename(name, path.extname(name)).toLowerCase()
	}
}

module.exports = Command;
