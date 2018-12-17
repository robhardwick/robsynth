import {
    LFO_TOGGLE,
    LFO_SET_TARGET,
    LFO_SET_FREQUENCY,
    LFO_SET_WAVEFROM,
} from './types'


export const lfoToggle = (index) => (
    { type: LFO_TOGGLE, index }
)

export const lfoSetTarget = (index, target) => (
    { type: LFO_SET_TARGET, index, target }
)

export const lfoSetFrequency = (index, frequency) => (
    { type: LFO_SET_FREQUENCY, index, frequency }
)

export const lfoSetWaveform = (index, waveform) => (
    { type: LFO_SET_WAVEFROM, index, waveform }
)