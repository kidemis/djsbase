class Listener {
	constructor(execute, options = {}) {
		this.execute = execute;
		this.once = options?.once;
		this.disabled = options?.disabled;
	}
}

module.exports = Listener;
