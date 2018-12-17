import { subscribe } from 'redux-subscriber'
import { LFO_DISTORTION } from '../lfo/targets'


const curve = (value) => {
    const n_samples = 44100
    let curve = new Float32Array(n_samples)
    for (let i = 0, x; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1
        curve[i] = (3 + value)*Math.atan(Math.sinh(x*0.25)*5) / (Math.PI + value * Math.abs(x))
    }
    return curve
}

export default class Distortion {
    constructor(store, audioCtx) {
        this.node = audioCtx.createGain()
        this.distort = audioCtx.createWaveShaper()

        this.value(store.getState())

        subscribe('distortion.enabled', state => this.enabled(state))
        subscribe('distortion.value', state => this.value(state))   
    }

    connect(destination) {
        this.destination = destination
        this.node.connect(this.distort)
        this.node.connect(destination.node)
        return destination
    }

    enabled(state) {
        if (state.distortion.enabled) {
            this.distort.connect(this.destination.node)
        } else {
            this.distort.disconnect(this.destination.node)
        }
    }

    value(state) {
        this.distort.curve = curve(state.distortion.value)
    }

    get targets() {
        return {
            [LFO_DISTORTION]: this.node.gain
        }
    }
}