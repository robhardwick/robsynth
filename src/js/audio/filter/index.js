import { subscribe } from 'redux-subscriber'


export default class Filter {
    constructor(store, audioCtx) {
        this.audioCtx = audioCtx
        this.node = audioCtx.createBiquadFilter()
        this.node.type = 'lowpass'
        this.node.gain.value = 0

        this.frequency(store.getState())
        this.resonance(store.getState())

        subscribe('filter.frequency', state => this.frequency(state))
        subscribe('filter.resonance', state => this.resonance(state))        
    }

    connect(destination) {
        this.node.connect(destination.node)
        return destination
    }

    frequency(state) {
        this.node.frequency.setTargetAtTime(state.filter.frequency, this.audioCtx.currentTime, 0.015)
    }

    resonance(state) {
        this.node.Q.setTargetAtTime(state.filter.resonance, this.audioCtx.currentTime, 0.015)
    }
}
