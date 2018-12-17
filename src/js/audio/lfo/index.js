import { subscribe } from 'redux-subscriber'


export default class LFO {
    constructor(store, audioCtx, index, instruments) {
        this.index = index
        this.instruments = instruments
        this._enabled = false

        this.lfo = audioCtx.createOscillator()
        this.lfo.start()
        this.gain = audioCtx.createGain()
        this.gain.gain.value = 100
        this.lfo.connect(this.gain)

        this.target(store.getState())
        this.frequency(store.getState())
        this.waveform(store.getState())

        subscribe('lfos.' + index + '.enabled', state => this.enabled(state))
        subscribe('lfos.' + index + '.target', state => this.target(state))
        subscribe('lfos.' + index + '.frequency', state => this.frequency(state))
        subscribe('lfos.' + index + '.waveform', state => this.waveform(state))
    }

    enabled(state) {
        if (this._enabled) {
            this.getTargets(this._target).forEach(target => {
                this.gain.disconnect(target)
            })
        }
        if (state.lfos[this.index].enabled) {
            this.getTargets(state.lfos[this.index].target).forEach(target => {
                this.gain.connect(target)
            })
            this._enabled = true
        } else {
            this._enabled = false
        }
    }

    target(state) {
        this.enabled(state)
        this._target = state.lfos[this.index].target
    }

    frequency(state) {
        this.lfo.frequency.value = state.lfos[this.index].frequency
    }

    waveform(state) {
        this.lfo.type = state.lfos[this.index].waveform
    }

    getTargets(target) {
        return this.instruments
            .filter(instrument => (instrument.targets !== undefined))
            .flatMap(instrument => (
                Object.entries(instrument.targets)
                    .filter(([name,]) => (name === target))
                    .flatMap(([,param]) => (param))
            ))
    }
}