import { FILTER_SET_FREQUENCY, FILTER_SET_RESONANCE } from '../../actions/filter/types'


const initialState = {
    frequency: 2000,
    resonance: 0
}

const filter = (state = initialState, action) => {
    switch (action.type) {
    case FILTER_SET_FREQUENCY:
        return {
            ...state,
            frequency: action.frequency
        }
    case FILTER_SET_RESONANCE:
        return {
            ...state,
            resonance: action.resonance
        }
    default:
        return state
    }
}

export default filter