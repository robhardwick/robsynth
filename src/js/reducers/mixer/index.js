import { MIXER_CHANNEL_TOGGLE, MIXER_CHANNEL_SET } from '../../actions/mixer/types'


const initialState = Array.from({length: 3}, () => ({
    enabled: true,
    value: 1
}))

const mixer = (state = initialState, action) => {
    switch (action.type) {
    case MIXER_CHANNEL_TOGGLE:
        return state.map((channel, index) => (
            index === action.channel
                ? {...channel, enabled: !channel.enabled}
                : channel
        ))
    case MIXER_CHANNEL_SET:
        return state.map((channel, index) => (
            index === action.channel
                ? {...channel, value: action.value}
                : channel
        ))
    default:
        return state
    }
}

export default mixer