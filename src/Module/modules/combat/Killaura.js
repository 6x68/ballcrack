import hooks from "../../../hooks";
import mathUtils from "../../../utils/mathUtils";
import Module from "../../Module";

export default class Killaura extends Module {
    constructor() {
        super("Killaura", "Combat", {
            "Y Offset": 1.62,
            "Reach": 10,
            "Delay": 100
        });
        this.lastExecutionTime = null;
    }

    onRender() {
        const currentTime = Date.now();
        if (currentTime - this.lastExecutionTime >= this.options["Delay"]) {
            this.lastExecutionTime = currentTime;
            this.tryKill();
        }
    }

    tryKill () {
        hooks.game.world.loadedEntityList.forEach(ent => {
            let dist = mathUtils.distanceBetween(ent.pos, hooks.game.player.pos);
            if (hooks.game.player.id !== ent.id && dist < 14) {
                hooks.game.controller.objectMouseOver.hitVec = ent.pos.clone();
                hooks.game.controller.attackEntity(ent);
            }
        })
    }
}