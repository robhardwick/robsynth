import { subscribe } from 'redux-subscriber'


export default class Reverb {
    constructor(store, audioCtx) {
        this.store = store
        this.audioCtx = audioCtx
        this.node = audioCtx.createGain()
        
        subscribe('reverb', state => this.impulse(state))
    }

    connect(destination) {
        this.destination = destination
        this.node.connect(destination.node)
        this.impulse(this.store.getState())
        return destination
    }

    impulse(state) {
        if (this.reverb) {
            this.node.disconnect(this.reverb)
            this.reverb.disconnect(this.destination.node)
            this.reverb = null
        }

        if (state.reverb.enabled) {
            const rate = 44100,
                length = rate * state.reverb.length
            let impulse = this.audioCtx.createBuffer(2, length, rate),
                impulseL = impulse.getChannelData(0),
                impulseR = impulse.getChannelData(1)

            for (let i = 0; i < length; i++) {
                let n = state.reverb.reverse ? length - i : i
                impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, state.reverb.decay)
                impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, state.reverb.decay)
            }

            this.reverb = this.audioCtx.createConvolver()
            this.node.connect(this.reverb).connect(this.destination.node)
            this.reverb.buffer = impulse
        }
    }
}
