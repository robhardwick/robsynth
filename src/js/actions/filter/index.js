import { FILTER_SET_FREQUENCY, FILTER_SET_RESONANCE } from './types'


export const filterSetFrequency = (frequency) => (
    { type: FILTER_SET_FREQUENCY, frequency }
)

export const filterSetResonance = (resonance) => (
    { type: FILTER_SET_RESONANCE, resonance }
)