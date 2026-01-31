import hooks from "../../../hooks";
import Module from "../../Module";

export default class InfiniteFly extends Module {
	warned = false;
	ticks = 0;

	constructor() {
		super("InfiniteFly", "Movement", {
			"Vertical Speed": 2,
			"Reduce Vertical Movement": true,
		});
	}
	/** @returns {boolean} */
	get reduceVerticalMovement() {
		return this.options["Render Vertical Movement"];
	}
	onDisable() {
		this.ticks = 0;
	}
	onEnable() {
		if (!this.warned) {
			hooks.game.chat.addChat({
				text: `Infinite Fly only works on servers using the old ac
(KitPvP, Skywars, Eggwars, Bridge Duels,
Classic PvP, and OITQ use the new ac, everything else is using the old ac)`,
			});
			this.warned = true;
		}
		this.listenToEvent("tick", () => {
			this.ticks++;
			if (this.ticks < 6) {
				hooks.game.player.motion.y = 0;
				return;
			}
			if (!this.reduceVerticalMovement || this.ticks % 2 === 0) {
				hooks.game.player.motion.y = 0.18;
			}
		});
	}
}
