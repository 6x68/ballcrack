import events from "../events";
import eventListener from "../events";

export default class Module {
	#listeners = {};
	/** @type {string} */
	name;
	/** @type {string} */
	category;
	/** @type {Record<string, string | number>} */
	options;
	/** @type {string} */
	bind;
	isEnabled = false;
	modes = {};
	waitingForBind = false;

	/**
	 * @param {string} name
	 * @param {string} category
	 * @param {Record<string, string | number>} options
	 * @param {string} bind
	 */
	constructor(name, category, options, bind) {
		this.name = name;
		this.category = category;
		this.options = options;
		this.bind = bind;
		this.isEnabled = false;
		this.modes = {};
		this.toggle = this.toggle.bind(this);
	}

	registerMode(settingName, modeOptions) {
		this.modes[settingName] = modeOptions;
	}

	onEnable() {}
	onDisable() {}
	onRender() {}
    beforeTick() {}
    afterTick() {}

	/**
	 * @param {string} name name of the setting
	 * @param {string | number} value new, updated value of the setting.
	 */
	onSettingUpdate(_name, _value) {}
    onChunkAdded() {}
    onChunkRemoved() {}

	/**
	 * @param {string} event
	 * @param {(...data?: unknown) => void} callback
	 */
	listenToEvent(event, callback) {
		this.#listeners[event] = callback;
		events.on(event, callback);
	}

	enable() {
		this.isEnabled = true;
		eventListener.emit("module.update", this);
		eventListener.emit("module.toggle", { name: this.name, enabled: true });
		this.onEnable();
	}

	disable() {
		this.isEnabled = false;
		eventListener.emit("module.update", this);
		eventListener.emit("module.toggle", { name: this.name, enabled: false });
		this.onDisable();
		for (const [a, b] of Object.entries(this.#listeners)) {
			events.remove(a, b);
			delete this.#listeners[a];
		}
	}

	toggle() {
		if (this.isEnabled) {
			this.disable();
		} else {
			this.enable();
		}
	}
}
