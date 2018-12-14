import { subscribe } from 'redux-subscriber'
import FREQUENCIES from './frequencies'
import { sequencerNext } from '../../actions/sequencer'

export default class Sequencer {
    constructor(store, oscillators) {
        this.store = store
        this.oscillators = oscillators

        subscribe('sequencer.playing', (state) => this.playing(state))
    }

    playing(state) {
        if (state.sequencer.playing) {
            this.queueStep()
        } else {
            clearTimeout(this.timeoutId)
            this.oscillators.forEach((osc) => {
                osc.stop()
            })
        }
    }

    queueStep() {
        // Step Interval = 60000 ms / (BPM * BAR of 4)
        const bpm = this.store.getState().sequencer.bpm
        this.timeoutId = setTimeout(() => this.executeStep(), 60000 / (bpm * 4))
    }

    executeStep() {
        // Set frequency of oscillators
        const step = this.store.getState().sequencer.step
        const sequence = this.store.getState().sequencer.sequence
        this.oscillators.forEach((osc) => {
            if (sequence[step]) {
                osc.start(FREQUENCIES[sequence[step]])
            } else {
                osc.stop()
            }
        })

        // Increment step
        this.store.dispatch(sequencerNext())

        // Queue next step
        this.queueStep()
    }
}
