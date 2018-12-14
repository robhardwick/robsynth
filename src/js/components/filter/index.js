import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterSetFrequency, filterSetResonance } from '../../actions/filter'


const mapStateToProps = state => (state.filter)

const mapDispatchToProps = dispatch => ({
    onFrequencyChange: e => {
        const frequency = parseFloat(e.target.value)
        dispatch(filterSetFrequency(frequency))
    },
    onResonanceChange: e => {
        const resonance = parseFloat(e.target.value)
        dispatch(filterSetResonance(resonance))
    },
})

const Filter = ({ frequency, resonance, onFrequencyChange, onResonanceChange }) => (
    <div className="card bg-dark border-light text-light">
        <div className="card-body">
            <h5 className="card-title">FLT</h5>
            <div className="row">
                <div className="col">
                    <h6 className="float-left">FREQ</h6>
                    <input type="range"
                        className="float-right"
                        min="0"
                        max="2000"
                        step="1"
                        value={frequency}
                        onChange={onFrequencyChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6 className="float-left">RES</h6>
                    <input type="range"
                        className="float-right"
                        min="0"
                        max="30"
                        step="0.1"
                        value={resonance}
                        onChange={onResonanceChange}/>
                </div>
            </div>
        </div>
    </div>
)

Filter.propTypes = {
    frequency: PropTypes.number.isRequired,
    resonance: PropTypes.number.isRequired,
    onFrequencyChange: PropTypes.func.isRequired,
    onResonanceChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)