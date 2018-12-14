export default class Output {
    constructor(audioCtx) {
        this.node = audioCtx.createGain()
        this.node.connect(audioCtx.destination)
    }
}
