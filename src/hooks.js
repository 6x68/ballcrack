import events from "./events";

export default {
    get game () {
        if (this._game) {
            return this._game;
        } else {
            return this._game = Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game;
        }
    },

    hookOnTick () {
        let hooksContext = this;
        this._fixedUpdate = this.game.fixedUpdate;
        this.game.fixedUpdate = function () {
            let returnVal = hooksContext._fixedUpdate.apply(this, arguments);
            events.emit("tick");
            return returnVal;
        }
    }
}