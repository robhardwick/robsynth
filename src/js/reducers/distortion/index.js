import { DISTORTION_TOGGLE, DISTORTION_SET_VALUE }  from '../../actions/distortion/types'


const initialState = {
    enabled: false,
    value: 500
}

const delay = (state = initialState, action) => {
    switch (action.type) {
    case DISTORTION_TOGGLE:
        return {
            ...state,
            enabled: !state.enabled
        }
    case DISTORTION_SET_VALUE:
        return {
            ...state,
            value: action.value
        }
    default:
        return state
    }
}

export default delay