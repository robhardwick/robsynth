import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { delayToggle, delaySetTime } from '../../actions/delay'

const mapStateToProps = state => (state.delay)

const mapDispatchToProps = dispatch => ({
    onToggleClick: () => {
        dispatch(delayToggle())
    },
    onTimeChange: e => {
        const time = parseFloat(e.target.value)
        dispatch(delaySetTime(time))
    }
})

const Delay = ({ enabled, time, onToggleClick, onTimeChange }) => (
    <div className="card bg-dark border-light text-light">
        <div className="card-body">
            <h5 className="card-title">
                DLY
                <button type="button" className="btn btn-secondary float-right" onClick={onToggleClick}>
                    {enabled ? <span className="oi oi-audio"/> : <span className="oi oi-ban"/>}
                </button>
            </h5>
            <div className="row">
                <div className="col">
                    <input type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={time}
                        onChange={onTimeChange}/>
                </div>
            </div>
        </div>
    </div>
)

Delay.propTypes = {
    enabled: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    onToggleClick: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Delay)