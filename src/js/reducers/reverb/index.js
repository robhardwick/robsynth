import {
    REVERB_TOGGLE,
    REVERB_REVERSE_TOGGLE,
    REVERB_SET_LENGTH,
    REVERB_SET_DECAY
} from '../../actions/reverb/types'


const initialState = {
    enabled: true,
    reverse: false,
    length: 0.5,
    decay: 0.5,
}

const reverb = (state = initialState, action) => {
    switch (action.type) {
    case REVERB_TOGGLE:
        return {
            ...state,
            enabled: !state.enabled
        }
    case REVERB_REVERSE_TOGGLE:
        return {
            ...state,
            reverse: !state.reverse
        }
    case REVERB_SET_LENGTH:
        return {
            ...state,
            length: action.length
        }
    case REVERB_SET_DECAY:
        return {
            ...state,
            decay: action.decay
        }
    default:
        return state
    }
}

export default reverb