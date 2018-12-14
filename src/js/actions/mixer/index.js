import { MIXER_CHANNEL_TOGGLE, MIXER_CHANNEL_SET } from './types'


export const mixerChannelToggle = (channel) => (
    { type: MIXER_CHANNEL_TOGGLE, channel }
)

export const mixerChannelSet = (channel, value) => (
    { type: MIXER_CHANNEL_SET, channel, value }
)