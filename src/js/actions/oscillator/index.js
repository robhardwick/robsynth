import {
    OSCILLATOR_SET_TYPE,
    OSCILLATOR_SET_DETUNE,
} from './types'


export const oscillatorSetType = (index, oscillatorType) => (
    { type: OSCILLATOR_SET_TYPE, index, oscillatorType }
)

export const oscillatorSetDetune = (index, detune) => (
    { type: OSCILLATOR_SET_DETUNE, index, detune }
)