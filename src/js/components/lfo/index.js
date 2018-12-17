import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WAVEFORMS from '../waveforms'
import {
    lfoToggle,
    lfoSetTarget,
    lfoSetFrequency,
    lfoSetWaveform,
} from '../../actions/lfo'
import {
    LFO_PITCH,
    LFO_AMPLITUDE,
    LFO_FILTER_FREQUENCY,
    LFO_FILTER_RESONANCE,
    LFO_DELAY,
    LFO_DISTORTION,
} from '../../audio/lfo/targets'


const TARGETS = [
    [LFO_PITCH, 'Pitch'],
    [LFO_AMPLITUDE, 'Amplitude'],
    [LFO_FILTER_FREQUENCY, 'Filter Frequency'],
    [LFO_FILTER_RESONANCE, 'Filter Resonance'],
    [LFO_DELAY, 'Delay'],
    [LFO_DISTORTION, 'Distortion'],
]

const mapStateToProps = (state, ownProps) => (state.lfos[ownProps.index])

const mapDispatchToProps = (dispatch, ownProps) => ({
    onToggleClick: () => {
        dispatch(lfoToggle(ownProps.index))
    },
    onTargetSelect: e => {
        dispatch(lfoSetTarget(ownProps.index, e.target.value))
    },
    onFrequencyChange: e => {
        const frequency = parseFloat(e.target.value)
        dispatch(lfoSetFrequency(ownProps.index, frequency))
    },
    onWaveformClick: waveform => {
        dispatch(lfoSetWaveform(ownProps.index, waveform))
    }
})

const LFO = ({ name, enabled, target, frequency, waveform, onToggleClick, onTargetSelect, onFrequencyChange, onWaveformClick }) => (
    <div className="card bg-dark border-light text-light">
        <div className="card-body">
            <h5 className="card-title mb-4">
                {name}
                <button type="button" className="btn btn-secondary float-right" onClick={onToggleClick}>
                    {enabled ? <span className="oi oi-media-stop"/> : <span className="oi oi-media-play"/>}
                </button>
            </h5>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <select className="form-control" value={target} onChange={onTargetSelect}>
                            { TARGETS.map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            )) }
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6 className="float-left">FREQ</h6>
                    <input type="range"
                        className="float-right"
                        min="0.1"
                        max="10"
                        step="0.1"
                        value={frequency}
                        onChange={onFrequencyChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    { WAVEFORMS.map(([waveformType, Icon], index) => (
                        <button key={index} onClick={() => onWaveformClick(waveformType)}
                            className={'btn ' + (waveformType === waveform ? 'btn-outline-light' : 'btn-outline-dark')}>
                            <Icon width="35" height="35"/>
                        </button>
                    )) }
                </div>
            </div>
        </div>
    </div>
)

LFO.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    target: PropTypes.string.isRequired,
    frequency: PropTypes.number.isRequired,
    waveform: PropTypes.string.isRequired,
    onToggleClick: PropTypes.func.isRequired,
    onTargetSelect: PropTypes.func.isRequired,
    onFrequencyChange: PropTypes.func.isRequired,
    onWaveformClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(LFO)