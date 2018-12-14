import Channel from './channel'


export default class Mixer {
    constructor(store, audioCtx, inputs) {
        this.channels = []
        for (let i = 0; i < inputs.length; i++) {
            this.channels.push(new Channel(store, audioCtx, i, inputs[i]))
        }
    }

    connect(destination) {
        this.channels.forEach((channel) => {
            channel.connect(destination.node)
        })
        return destination
    }
}
