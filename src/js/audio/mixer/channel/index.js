import { subscribe } from 'redux-subscriber'


export default class Channel {
    constructor(store, audioCtx, index, input) {
        this.store = store
        this.index = index
        this.node = audioCtx.createGain()
        input.output.connect(this.node)

        this.value(this.store.getState())

        subscribe('mixer.' + index + '.enabled', state => this.enabled(state))
        subscribe('mixer.' + index + '.value', state => this.value(state))
    }

    connect(destination) {
        this.destination = destination
        this.enabled(this.store.getState())
    }

    enabled(state) {
        if (state.mixer[this.index].enabled) {
            this.node.connect(this.destination)
        } else {
            this.node.disconnect(this.destination)
        }
    }

    value(state) {
        this.node.gain.value = state.mixer[this.index].value
    }
}
