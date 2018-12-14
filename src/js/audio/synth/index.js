import Sequencer from '../sequencer'
import Oscillator from '../oscillator'
import Mixer from '../mixer'
import Filter from '../filter'
import Delay from '../delay'
import Distortion from '../distortion'
import Reverb from '../reverb'
import Output from '../output'

const AudioContext = window.AudioContext || window.webkitAudioContext

export default class Synth {
    constructor(store) {
        const audioCtx = new AudioContext()
        this.oscillators = []
        this.sequencer = new Sequencer(store, this.oscillators)
        for (let i = 0; i < 3; i++) {
            this.oscillators.push(new Oscillator(store, audioCtx, i))
        }
        this.mixer = new Mixer(store, audioCtx, this.oscillators)
        this.filter = new Filter(store, audioCtx)
        this.delay = new Delay(store, audioCtx)
        this.distortion = new Distortion(store, audioCtx)
        this.reverb = new Reverb(store, audioCtx)
        this.output = new Output(audioCtx)

        this.mixer
            .connect(this.filter)
            .connect(this.delay)
            .connect(this.distortion)
            .connect(this.reverb)
            .connect(this.output)
    }
}
