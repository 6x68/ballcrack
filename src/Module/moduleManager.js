//@ts-check
import events from "../events";
import Module from "./Module";
import Killaura from "./modules/combat/Killaura";
import NoFall from "./modules/misc/NoFall";
import SelfHarm from "./modules/misc/SelfHarm";
import AirJump from "./modules/movement/Airjump";
import HighJump from "./modules/movement/HighJump";
import Jesus from "./modules/movement/Jesus";
import InfiniteFly from "./modules/movement/InfiniteFly";
import Phase from "./modules/movement/Phase";
import Scaffold from "./modules/movement/Scaffold";
import Speed from "./modules/movement/Speed";
import Spider from "./modules/movement/Spider";
import Step from "./modules/movement/Step";
import ArrayList from "./modules/visual/Arraylist";
import Chams from "./modules/visual/Chams";
import ClickGUI from "./modules/visual/ClickGUI";

import Watermark from "./modules/visual/Watermark";

/**
 * @typedef {NewableFunction & {
 *   new(): T;
 * }} Newable
 * @template T
 */

class ModuleManager {
	/** @type {Record<String, Module>} */
	modules = {};
	waitingForBind = false;

	/** @param {...Newable<Module>} modules */
	addModules(...modules) {
		for (const module of modules) {
			const moduleInstance = new module();
			this.modules[moduleInstance.name] = moduleInstance;
		}
	}

	/** @param {Module} module */
	addModule(module) {
		this.modules[module.name] = module;
	}
	/**
	 * @param {any} key
	 */
	handleKeyPress(key) {
		for (const name in this.modules) {
			const module = this.modules[name];

			if (this.waitingForBind) {
				module.bind = key;
				this.waitingForBind = false;
			} else if (key && module.bind === key) {
				module.toggle();
			}
		}
	}
	init() {
		this.addModules(
			// visual
			Watermark,
			ClickGUI,
			ArrayList,
			Chams,

			// movement
			AirJump,
			HighJump,
			InfiniteFly,
			Phase,
			Speed,
			Step,
            Scaffold,
            Spider,
            Jesus,
			Scaffold,

			// combat
			Killaura,

			// misc
			SelfHarm,
            NoFall,
		);

		events.on("render", () => {
			for (const name in this.modules) {
				if (this.modules[name].isEnabled) {
					this.modules[name].onRender();
				}
			}
		});

        events.on("beforeTick", () => {
            for (const name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].beforeTick();
                }
            }
        });

        events.on("afterTick", () => {
            for (const name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].afterTick();
                }
            }
        });

		events.on("keydown", this.handleKeyPress.bind(this));
		events.on(
			"setting.update",
			(
				/** @type {{ moduleName: string; setting: string; value: string | number; }} */ data,
			) => {
				for (const name in this.modules) {
					if (this.modules[name].isEnabled || data.moduleName === name) {
						this.modules[name].onSettingUpdate(data.setting, data.value);
					}
				}
			},
		);

		this.modules.Arraylist.enable();
		this.modules.Watermark.enable();
	}
}

export default new ModuleManager();
