import hooks from "../../../hooks";
import Module from "../../Module";

export default class Airjump extends Module {
    constructor() {
        super("Airjump", "Movement", null);
    }

    onEnable() {
        hooks.game.player.__defineGetter__("onGround", () => true);
        hooks.game.player.__defineSetter__("onGround", () => true);
    }

    onDisable() {
        delete hooks.game.player.onGround;
        hooks.game.player.onGround = false;
    }
}