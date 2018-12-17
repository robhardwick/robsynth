import {
    LFO_TOGGLE,
    LFO_SET_TARGET,
    LFO_SET_FREQUENCY,
    LFO_SET_WAVEFROM,
} from '../../actions/lfo/types'


const initialState = Array.from({length: 4}, () => ({
    enabled: false,
    target: 'pitch',
    frequency: 0,
    waveform: 'sine',
}))

const lfos = (state = initialState, action) => {
    switch (action.type) {
    case LFO_TOGGLE:
        return state.map((lfo, index) => (
            index === action.index
                ? {...lfo, enabled: !lfo.enabled}
                : lfo
        ))
    case LFO_SET_TARGET:
        return state.map((lfo, index) => (
            index === action.index
                ? {...lfo, target: action.target}
                : lfo
        ))
    case LFO_SET_FREQUENCY:
        return state.map((lfo, index) => (
            index === action.index
                ? {...lfo, frequency: action.frequency}
                : lfo
        ))
    case LFO_SET_WAVEFROM:
        return state.map((lfo, index) => (
            index === action.index
                ? {...lfo, waveform: action.waveform}
                : lfo
        ))
    default:
        return state
    }
}

export default lfos