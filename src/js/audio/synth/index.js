import Sequencer from '../sequencer'
import Oscillator from '../oscillator'
import Mixer from '../mixer'
import Filter from '../filter'
import Delay from '../delay'
import Distortion from '../distortion'
import Reverb from '../reverb'
import LFO from '../lfo'
import Output from '../output'


const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

const initSynth = (store) => {
    // Oscillators
    const oscillators = []
    for (let i = 0; i < 3; i++) {
        oscillators.push(new Oscillator(store, audioCtx, i))
    }
    const instruments = [].concat(oscillators)

    // Sequencer
    const sequencer = new Sequencer(store, oscillators)
    instruments.push(sequencer)

    // Mixer
    const mixer = new Mixer(store, audioCtx, oscillators)
    instruments.push(mixer)

    // Filter
    const filter = new Filter(store, audioCtx)
    instruments.push(filter)

    // Delay
    const delay = new Delay(store, audioCtx)
    instruments.push(delay)

    // Distortion
    const distortion = new Distortion(store, audioCtx)
    instruments.push(distortion)

    // Reverb
    const reverb = new Reverb(store, audioCtx)
    instruments.push(reverb)

    // LFOs
    for (let i = 0; i < 4; i++) {
        instruments.push(new LFO(store, audioCtx, i, instruments))
    }

    // Output
    const output = new Output(audioCtx)

    // Connect signal path
    mixer
        .connect(filter)
        .connect(delay)
        .connect(distortion)
        .connect(reverb)
        .connect(output)
}

export default initSynth