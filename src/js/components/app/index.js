import React from 'react'
import Sequencer from '../sequencer'
import Oscillator from '../oscillator'
import Mixer from '../mixer'
import Filter from '../filter'
import Delay from '../delay'
import Distortion from '../distortion'
import Reverb from '../reverb'
import LFO from '../lfo'

const App = () => (
    <div>
        <div className="row">
            <div className="col m-4">
                <Sequencer/>
            </div>
        </div>
        <div className="row">
            <div className="col m-4">
                <Oscillator index={0} name="OSC1"/>
            </div>
            <div className="col m-4">
                <Oscillator index={1} name="OSC2"/>
            </div>
            <div className="col m-4">
                <Oscillator index={2} name="OSC3"/>
            </div>
        </div>
        <div className="row">
            <div className="col-6 m-4">
                <Mixer/>
            </div>
            <div className="col m-4">
                <div className="row">
                    <div className="col">
                        <Filter/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <Delay/>
                    </div>
                </div>
            </div>
            <div className="col m-4">
                <div className="row">
                    <div className="col">
                        <Distortion/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <Reverb/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col m-3">
                <LFO index={0} name="LFO1"/>
            </div>
            <div className="col m-3">
                <LFO index={1} name="LFO2"/>
            </div>
            <div className="col m-3">
                <LFO index={2} name="LFO3"/>
            </div>
            <div className="col m-3">
                <LFO index={3} name="LFO4"/>
            </div>
        </div>
    </div>
)

export default App