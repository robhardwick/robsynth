import { subscribe } from 'redux-subscriber'

export default class Oscillator {
    constructor(store, audioCtx, index) {
        this.store = store
        this.audioCtx = audioCtx
        this.index = index
        this.playing = false

        this.node = audioCtx.createOscillator()
        this.node.type = store.getState().oscillators[index].type
        this.node.frequency.value = 220
        this.node.start()

        this.output = audioCtx.createGain()
        this.node.connect(this.output)
        this.output.gain.setValueAtTime(0, audioCtx.currentTime)

        subscribe('oscillators.' + index + '.type', state => this.type(state))
    }

    start(freq) {
        if (freq) {
            const detune = this.store.getState().oscillators[this.index].detune
            this.node.frequency.value = (freq + detune)
        }
        if (!this.playing) {
            this.playing = true
            this.output.gain.setTargetAtTime(1, this.audioCtx.currentTime, 0.015)
        }
    }

    stop() {
        if (this.playing) {
            this.playing = false
            this.output.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.015)
        }
    }

    type(state) {
        this.node.type = state.oscillators[this.index].type
    }
}