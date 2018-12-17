import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { oscillatorSetType, oscillatorSetDetune } from '../../actions/oscillator'
import WAVEFORMS from '../waveforms'

const mapStateToProps = (state, ownProps) => (state.oscillators[ownProps.index])

const mapDispatchToProps = (dispatch, ownProps) => ({
    onTypeClick: type => {
        dispatch(oscillatorSetType(ownProps.index, type))
    },
    onDetuneChange: e => {
        const detune = parseFloat(e.target.value)
        dispatch(oscillatorSetDetune(ownProps.index, detune))
    }
})

const Oscillator = ({ name, type, detune, onTypeClick, onDetuneChange }) => (
    <div className="card bg-dark border-light text-light">
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="row">
                <div className="col">
                    { WAVEFORMS.map(([waveformType, Icon], index) => (
                        <button key={index} onClick={() => onTypeClick(waveformType)}
                            className={'btn ' + (waveformType === type ? 'btn-outline-light' : 'btn-outline-dark')}>
                            <Icon/>
                        </button>
                    )) }
                </div>
                <div className="col text-center">
                    <h6>DETUNE</h6>
                    <input type="range"
                        style={{
                            webkitAppearance: 'slider-vertical'
                        }}
                        min="-10"
                        max="10"
                        step="0.1"
                        value={detune}
                        onChange={onDetuneChange}/>
                </div>
            </div>
        </div>
    </div>
)

Oscillator.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    detune: PropTypes.number.isRequired,
    onTypeClick: PropTypes.func.isRequired,
    onDetuneChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Oscillator)