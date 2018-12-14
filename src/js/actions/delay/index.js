import { DELAY_TOGGLE, DELAY_SET_TIME } from './types'


export const delayToggle = () => (
    { type: DELAY_TOGGLE }
)

export const delaySetTime = (time) => (
    { type: DELAY_SET_TIME, time }
)