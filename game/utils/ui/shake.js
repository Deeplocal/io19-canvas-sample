/**
 * A class for shaking things up
 */
export default class Shake {
    /**
     * Default constructor
     *
     * @param {number} duration - The duration in ms to shake for
     * @param {number} frequency - The frequency to use in hz
     */
    constructor (duration, frequency) {
        // The duration in milliseconds
        this.duration = parseInt(duration);

        // The frequency in Hz
        this.frequency = parseInt(frequency);

        // The sample count = number of peaks/valleys in the Shake
        const sampleCount = (duration / 1000) * frequency;

        // Populate the samples array with randomized values between -1.0 and 1.0
        this.samples = [];
        for (let i = 0; i < sampleCount; i++) {
            this.samples.push(Math.random() * 2 - 1);
        }

        // Init the time variables
        this.startTime = null;
        this.t = null;

        // Flag that represents if the shake is active
        this.isShaking = false;
    }

    /**
     * The start function
     */
    start () {
        this.startTime = new Date().getTime();
        this.t = 0;
        this.isShaking = true;
    }

    /**
     * The update function
     */
    update () {
        this.t = new Date().getTime() - this.startTime;
        if (this.t > this.duration) this.isShaking = false;
    }

    /**
     * The noise function
     *
     * @param {number} s - The s
     *
     * @return {number}
     */
    noise (s) {
        // Retrieve the randomized value from the samples
        if (s >= this.samples.length) return 0;
        return this.samples[s];
    }

    /**
     * Simple amplitude function
     *
     * @param {number} t -  time
     *
     * @return {number}
     */
    amplitude (t) {
        // Check if optional param was passed
        if (t == undefined) {
            // return zero if we are done shaking
            if (!this.isShaking) return 0;
            t = this.t;
        }

        // Get the previous and next sample
        const s = t / 1000 * this.frequency;
        const s0 = Math.floor(s);
        const s1 = s0 + 1;

        // Get the current decay
        const k = this.decay(t);

        // Return the current amplitude
        return (this.noise(s0) + (s - s0) * (this.noise(s1) - this.noise(s0))) * k;
    }

    /**
     * A decay function
     *
     * @param {number} t - Time in ms
     * @return {number}
     */
    decay (t) {
        // Linear decay
        if (t >= this.duration) return 0;
        return (this.duration - t) / this.duration;
    }
}
