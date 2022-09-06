const path = require('node:path')

class Event {
	constructor(name, listeners, options) {
		this.name = name;
		this.listeners = listeners;
		this.disabled = options?.disabled;
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

	async execute(client) {
		for(const listener of this.listeners) {
			if(listener.disabled) continue;

			if(listener.once) client.once(this.name, listener.execute);
			else client.on(this.name, listener.execute);
		}
	}
}

module.exports = Event;
