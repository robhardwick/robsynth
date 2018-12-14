import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    reverbToggle,
    reverbReverseToggle,
    reverbSetLength,
    reverbSetDecay,
} from '../../actions/reverb'


const mapStateToProps = state => (state.reverb)

const mapDispatchToProps = dispatch => ({
    onToggleClick: () => {
        dispatch(reverbToggle())
    },
    onReverseClick: () => {
        dispatch(reverbReverseToggle())
    },
    onLengthChange: e => {
        const length = parseFloat(e.target.value)
        dispatch(reverbSetLength(length))
    },
    onDecayChange: e => {
        const decay = parseFloat(e.target.value)
        dispatch(reverbSetDecay(decay))
    }
})

const Reverb = ({ enabled, reverse, length, decay, onToggleClick, onReverseClick, onLengthChange, onDecayChange }) => (
    <div className="card bg-dark border-light text-light">
        <div className="card-body">
            <h5 className="card-title mb-4">
                RVB
                <div className="btn-group float-right">
                    <button type="button" className="btn btn-secondary float-left" onClick={onToggleClick}>
                        {enabled ? <span className="oi oi-audio"/> : <span className="oi oi-ban"/>}
                    </button>
                    <button type="button" className="btn btn-secondary float-right" onClick={onReverseClick}>
                        {reverse ? <span className="oi oi-arrow-circle-left"/> : <span className="oi oi-arrow-circle-right"/>}
                    </button>
                </div>
            </h5>
            <div className="row">
                <div className="col">

                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6 className="float-left">LEN</h6>
                    <input type="range"
                        className="float-right"
                        min="1"
                        max="10"
                        step="0.1"
                        value={length}
                        onChange={onLengthChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6 className="float-left">DLY</h6>
                    <input type="range"
                        className="float-right"
                        min="0"
                        max="10"
                        step="0.1"
                        value={decay}
                        onChange={onDecayChange}/>
                </div>
            </div>
        </div>
    </div>
)

Reverb.propTypes = {
    enabled: PropTypes.bool.isRequired,
    reverse: PropTypes.bool.isRequired,
    length: PropTypes.number.isRequired,
    decay: PropTypes.number.isRequired,
    onToggleClick: PropTypes.func.isRequired,
    onReverseClick: PropTypes.func.isRequired,
    onLengthChange: PropTypes.func.isRequired,
    onDecayChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reverb)