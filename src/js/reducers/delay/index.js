import { DELAY_TOGGLE, DELAY_SET_TIME } from '../../actions/delay/types'


const initialState = {
    enabled: false,
    time: 0
}

const delay = (state = initialState, action) => {
    switch (action.type) {
    case DELAY_TOGGLE:
        return {
            ...state,
            enabled: !state.enabled
        }
    case DELAY_SET_TIME:
        return {
            ...state,
            time: action.time
        }
    default:
        return state
    }
}

export default delay