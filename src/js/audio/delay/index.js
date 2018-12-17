import { subscribe } from 'redux-subscriber'
import { LFO_DELAY } from '../lfo/targets'


export default class Delay {
    constructor(store, audioCtx) {
        this.audioCtx = audioCtx
        this.node = audioCtx.createGain()
        this.delay = audioCtx.createDelay(2)

        this.time(store.getState())

        subscribe('delay.enabled', state => this.enabled(state))
        subscribe('delay.time', state => this.time(state))    
    }

    connect(destination) {
        this.destination = destination
        this.node.connect(this.delay)
        this.node.connect(destination.node)
        return destination
    }

    enabled(state) {
        if (state.delay.enabled) {
            this.delay.connect(this.destination.node)
        } else {
            this.delay.disconnect(this.destination.node)
        }
    }

    time(state) {
        this.delay.delayTime.setTargetAtTime(state.delay.time, this.audioCtx.currentTime, 0.1)
    }

    get targets() {
        return {
            [LFO_DELAY]: this.delay.delayTime
        }
    }
}
