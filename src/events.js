export default {
	listeners: {},
	activeKeys: new Set(),
	on: function (event, callback) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	},
	/**
	 * @param {string} event
	 * @param {(...data?: any) => void} callback
	 * @returns
	 */
	remove: function (event, callback) {
		if (!this.listeners[event]) {
			return;
		}

		this.listeners[event] = this.listeners[event].filter(
			(cb) => cb !== callback,
		);
	},

	/**
	 * @param {string} event
	 * @param {*} data
	 * @returns
	 */
	emit: function (event, data) {
		if (!this.listeners[event]) {
			return;
		}

		this.listeners[event].forEach((callback) => {
			callback(data);
		});
	},

	trackKey: function (eventType, key, code) {
		if (eventType === "keydown") {
			moduleManager.handleKeyPress(code);
		}
		if (eventType === "keydown" && !this.activeKeys.has(key)) {
			this.activeKeys.add(key);
			this.emit("keyPress", { key, code });
		}
		if (eventType === "keyup" && this.activeKeys.has(key)) {
			this.activeKeys.delete(key);
			this.emit("keyRelease", { key, code });
		}
	},
};
