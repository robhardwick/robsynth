import { OSCILLATOR_SET_TYPE, OSCILLATOR_SET_DETUNE } from '../../actions/oscillator/types'


const initialState = Array.from({length: 3}, () => ({
    type: 'triangle',
    detune: 0
}))

const oscillators = (state = initialState, action) => {
    switch (action.type) {
    case OSCILLATOR_SET_TYPE:
        return state.map((oscillator, index) => (
            index === action.index
                ? {...oscillator, type: action.oscillatorType}
                : oscillator
        ))
    case OSCILLATOR_SET_DETUNE:
        return state.map((oscillator, index) => (
            index === action.index
                ? {...oscillator, detune: action.detune}
                : oscillator
        ))
    default:
        return state
    }
}

export default oscillators