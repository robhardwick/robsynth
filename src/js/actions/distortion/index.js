import { DISTORTION_TOGGLE, DISTORTION_SET_VALUE } from './types'


export const distortionToggle = () => (
    { type: DISTORTION_TOGGLE }
)

export const distortionSetValue = (value) => (
    { type: DISTORTION_SET_VALUE, value }
)