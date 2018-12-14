import {
    SEQUENCER_PLAY,
    SEQUENCER_STOP,
    SEQUENCER_NEXT,
    SEQUENCER_SET_PRESET,
    SEQUENCER_SET_STEP,
    SEQUENCER_SET_BPM
} from '../../actions/sequencer/types'
import PRESETS from './presets'


const initialState = {
    playing: false,
    step: 0,
    preset: 0,
    sequence: PRESETS[0].sequence,
    bpm: 120
}

const sequencer = (state = initialState, action) => {
    switch (action.type) {
    case SEQUENCER_PLAY:
        return {
            ...state,
            playing: !state.playing,
        }
    case SEQUENCER_STOP:
        return {
            ...state,
            playing: false,
            step: 0,
        }
    case SEQUENCER_NEXT:
        return {
            ...state,
            step: (state.step == state.sequence.length - 1) ? 0 : state.step + 1,
        }
    case SEQUENCER_SET_PRESET:
        return {
            ...state,
            preset: action.preset,
            sequence: PRESETS[action.preset].sequence,
        }
    case SEQUENCER_SET_STEP: {
        let sequence = [...state.sequence]
        sequence[action.step] = (sequence[action.step] === action.value)
            ? null 
            : action.value
        return {
            ...state,
            sequence
        }
    }
    case SEQUENCER_SET_BPM:
        return {
            ...state,
            bpm: action.bpm,
        }
    default:
        return state
    }
}
  
export default sequencer