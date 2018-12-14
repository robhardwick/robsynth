import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { distortionToggle, distortionSetValue } from '../../actions/distortion'

const mapStateToProps = state => (state.distortion)

const mapDispatchToProps = dispatch => ({
    onToggleClick: () => {
        dispatch(distortionToggle())
    },
    onValueChange: e => {
        const value = parseInt(e.target.value, 10)
        dispatch(distortionSetValue(value))
    }
})

const Distortion = ({ enabled, value, onToggleClick, onValueChange }) => (
    <div className="card bg-dark border-light text-light">
        <div className="card-body">
            <h5 className="card-title">
                DST
                <button type="button" className="btn btn-secondary float-right" onClick={onToggleClick}>
                    {enabled ? <span className="oi oi-audio"/> : <span className="oi oi-ban"/>}
                </button>
            </h5>
            <div className="row">
                <div className="col align-middle">
                    <input type="range"
                        min="0"
                        max="1000"
                        step="1"
                        value={value}
                        onChange={onValueChange}/>
                </div>
            </div>
        </div>
    </div>
)

Distortion.propTypes = {
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onToggleClick: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Distortion)