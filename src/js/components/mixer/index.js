import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mixerChannelToggle, mixerChannelSet } from '../../actions/mixer'


const mapStateToProps = state => ({ channels: state.mixer })

const mapDispatchToProps = dispatch => ({
    onToggleClick: index => {
        dispatch(mixerChannelToggle(index))
    },
    onValueChange: (index, e) => {
        const value = parseFloat(e.target.value)
        dispatch(mixerChannelSet(index, value))
    }
})

const Mixer = ({ channels, onToggleClick, onValueChange }) => (
    <div className="card bg-dark border-light text-light">
        <div className="card-body">
            <h5 className="card-title">MIX</h5>
            <div className="row">
                { channels.map(({enabled, value}, index) => (
                    <div key={index} className="col">
                        <h5>OSC{index + 1}</h5>
                        <button type="button" className="btn btn-secondary float-left" onClick={() => onToggleClick(index)}>
                            {enabled ? <span className="oi oi-audio"/> : <span className="oi oi-ban"/>}
                        </button>
                        <input type="range"
                            style={{
                                webkitAppearance: 'slider-vertical'
                            }}
                            min="0"
                            max="1"
                            step="0.01"
                            value={value}
                            onChange={(e) => onValueChange(index, e)}/>
                    </div>
                )) }
            </div>
        </div>
    </div>
)

Mixer.propTypes = {
    channels: PropTypes.arrayOf(
        PropTypes.objectOf({
            enabled: PropTypes.bool.isRequired,
            value: PropTypes.number.isRequired,
        })
    ),
    onToggleClick: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Mixer)