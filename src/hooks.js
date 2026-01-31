import events from "./events";

export default {
	get game() {
		if (this._game) {
			return this._game;
		} else {
			const game = Object.values(document.querySelector("#react"))[0]
				.updateQueue.baseState.element.props.game;
			this._game = game;
			return this._game;
		}
	},

    hookOnTick () {
        const hooksContext = this;
        this._fixedUpdate = this.game.fixedUpdate;
        this.game.fixedUpdate = function (...args) {
            events.emit("beforeTick");
            const returnVal = hooksContext._fixedUpdate.apply(this, args);
            events.emit("afterTick");
            return returnVal;
        }
    }
};
