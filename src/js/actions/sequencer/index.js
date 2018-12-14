import {
    SEQUENCER_PLAY,
    SEQUENCER_STOP,
    SEQUENCER_NEXT,
    SEQUENCER_SET_PRESET,
    SEQUENCER_SET_STEP,
    SEQUENCER_SET_BPM,
} from './types'


export const sequencerPlay = () => (
    { type: SEQUENCER_PLAY }
)

export const sequencerStop = () => (
    { type: SEQUENCER_STOP }
)

export const sequencerNext = () => (
    { type: SEQUENCER_NEXT }
)

export const sequencerSetPreset = (preset) => (
    { type: SEQUENCER_SET_PRESET, preset }
)

export const sequencerSetStep = (step, value) => (
    { type: SEQUENCER_SET_STEP, step, value }
)

export const sequencerSetBPM = (bpm) => (
    { type: SEQUENCER_SET_BPM, bpm }
)