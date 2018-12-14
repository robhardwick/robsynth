import {
    REVERB_TOGGLE,
    REVERB_REVERSE_TOGGLE,
    REVERB_SET_LENGTH,
    REVERB_SET_DECAY
} from './types'


export const reverbToggle = () => (
    { type: REVERB_TOGGLE }
)

export const reverbReverseToggle = () => (
    { type: REVERB_REVERSE_TOGGLE }
)

export const reverbSetLength = (length) => (
    { type: REVERB_SET_LENGTH, length }
)

export const reverbSetDecay = (decay) => (
    { type: REVERB_SET_DECAY, decay }
)