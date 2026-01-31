import hooks from "../../../hooks";
import Module from "../../Module";

export default class NoFall extends Module {
    constructor() {
        super("NoFall", "Misc");
    }

    onTick() {
        if (hooks.game.player.fallDistance >= 2.5) {
            hooks.game.player.fallDistance = 0;
            hooks.game.player.onGround = true;
            hooks.game.player.sendPositionAndRotation();
        }
    }
}
