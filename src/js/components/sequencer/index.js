import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    sequencerPlay,
    sequencerStop,
    sequencerSetPreset,
    sequencerSetStep,
    sequencerSetBPM
} from '../../actions/sequencer'
import FREQUENCIES from '../../audio/sequencer/frequencies'
import PRESETS from '../../reducers/sequencer/presets'


const CANVAS_HEIGHT = 340
const BUTTONS_WIDTH = 210

const COLOUR_BG = 'rgb(52, 58, 64)'
const COLOUR_FG = 'rgb(255, 255, 255)'
const COLOUR_HIGHLIGHT = 'rgb(108, 117, 125)'


const mapStateToProps = state => (state.sequencer)

const mapDispatchToProps = dispatch => ({
    onPlayClick: () => {
        dispatch(sequencerPlay())
    },
    onStopClick: () => {
        dispatch(sequencerStop())
    },
    onPresetSelect: e => {
        dispatch(sequencerSetPreset(e.target.value))
    },
    onSequenceClick: (e, sequence, width) => {
        let bounds = e.target.getBoundingClientRect()
        let x = e.clientX - bounds.left
        let y = e.clientY - bounds.top

        let step = Math.floor((x / width) * sequence.length)
        let value = Math.ceil(((CANVAS_HEIGHT - y) / CANVAS_HEIGHT) * FREQUENCIES.length)

        dispatch(sequencerSetStep(step, value))
    },
    onBPMChange: e => {
        const bpm = parseInt(e.target.value, 10)
        dispatch(sequencerSetBPM(bpm))
    },
})

const getRect = (step, sequence, width, blockWidth, blockHeight) => ([
    ((step / sequence.length) * width) + 0.5,
    (((FREQUENCIES.length - sequence[step]) / FREQUENCIES.length) * CANVAS_HEIGHT) + 0.5,
    blockWidth,
    blockHeight
])

export default @connect(mapStateToProps, mapDispatchToProps)
class Sequencer extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0 }
    }

    componentDidMount() {
        this.setState({width: this.container.clientWidth - BUTTONS_WIDTH})
    }

    componentDidUpdate() {
        const blockWidth = this.state.width / this.props.sequence.length
        const blockHeight = CANVAS_HEIGHT / FREQUENCIES.length

        const context = this.canvas.getContext('2d')

        // Background
        context.fillStyle = COLOUR_BG
        context.fillRect(0, 0, this.state.width, CANVAS_HEIGHT)

        // Draw sequence
        context.fillStyle = COLOUR_HIGHLIGHT
        for (let i = 0; i < this.props.sequence.length; i++) {
            if (this.props.sequence[i]) {
                context.fillRect(...getRect(
                    i,
                    this.props.sequence,
                    this.state.width,
                    blockWidth,
                    blockHeight
                ))
            }
        }

        // Draw grid
        context.strokeStyle = COLOUR_HIGHLIGHT
        context.beginPath()
        for (let x = blockWidth; x <= this.state.width; x += blockWidth) {
            context.moveTo(x + 0.5, 0.5)
            context.lineTo(x + 0.5, CANVAS_HEIGHT + 0.5)
        }
        for (let y = blockHeight; y <= CANVAS_HEIGHT; y += blockHeight) {
            context.moveTo(0 + 0.5, y + 0.5)
            context.lineTo(this.state.width + 0.5, y + 0.5)
        }
        context.stroke()

        // Draw current step
        context.fillStyle = COLOUR_FG
        if (this.props.sequence[this.props.step]) {
            context.fillRect(...getRect(
                this.props.step,
                this.props.sequence,
                this.state.width,
                blockWidth,
                blockHeight
            ))
        }
    }

    render() {
        return (
            <div className="card bg-dark border-light text-light">
                <div className="card-body" ref={(c) => { this.container = c }}>
                    <h5 className="card-title">SEQ</h5>
                    <div className="row">
                        <div className="col text-center">
                            <div className="btn-group-vertical w-100 mb-2">
                                <button type="button" className="btn btn-secondary" onClick={this.props.onPlayClick}>
                                    {this.props.playing ? <span className="oi oi-media-pause"/> : <span className="oi oi-media-play"/>}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={this.props.onStopClick}>
                                    <span className="oi oi-media-stop"/>
                                </button>
                            </div>
                            <div className="form-group">
                                <select className="form-control" value={this.props.preset} onChange={this.props.onPresetSelect}>
                                    { PRESETS.map((preset, index) => (
                                        <option value={index} key={index}>{preset.name}</option>
                                    )) }
                                </select>
                            </div>
                            <h6>BPM</h6>
                            <input type="range"
                                style={{
                                    webkitAppearance: 'slider-vertical'
                                }}
                                min="30"
                                max="480"
                                step="1"
                                value={this.props.bpm}
                                onChange={this.props.onBPMChange}/>
                            <p>{this.props.bpm}</p>
                        </div>
                        <div className="col">
                            <canvas ref={(c) => { this.canvas = c }}
                                width={this.state.width}
                                height={CANVAS_HEIGHT}
                                onClick={e => this.props.onSequenceClick(e, this.props.sequence, this.state.width)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Sequencer.propTypes = {
    playing: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired,
    preset: PropTypes.number.isRequired,
    sequence: PropTypes.arrayOf(PropTypes.number).isRequired,
    bpm: PropTypes.number.isRequired,
    onPlayClick: PropTypes.func.isRequired,
    onStopClick: PropTypes.func.isRequired,
    onPresetSelect: PropTypes.func.isRequired,
    onSequenceClick: PropTypes.func.isRequired,
    onBPMChange: PropTypes.func.isRequired,
}