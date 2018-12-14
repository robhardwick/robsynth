import { combineReducers } from 'redux'
import sequencer from './sequencer'
import oscillators from './oscillators'
import mixer from './mixer'
import filter from './filter'
import delay from './delay'
import distortion from './distortion'
import reverb from './reverb'


export default combineReducers({
    sequencer,
    oscillators,
    mixer,
    filter,
    delay,
    distortion,
    reverb,
})