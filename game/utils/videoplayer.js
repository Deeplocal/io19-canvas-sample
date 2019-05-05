// -- Local imports -- //
import Shake from './ui/shake';

/**
 * The VideoPlayer class exposes a simple was to
 * scrub through, and loop on certain sections of
 * video.
 */
export default class VideoPlayer {
    /**
     * Default constructor
     *
     * @param {string} vsrc - The source of the video
     * @param {Array} breakpoints - All the breakpoints in the video
     */
    constructor (vsrc, breakpoints) {
        const background = document.getElementById('bg_vid');
        background.src = vsrc;

        this.shouldAdvance = false;
        this.breakpoints = Array.from(breakpoints);
        this.shakeLength = 13000;
        this.currentLoop;
    }

    /**
     * Stop double looping on teleport
     */
    killall () {
        clearTimeout(this.currentLoop);
        this.loopit = () => { };
    }

    /**
     * This function will call itself recursively to loop
     * on a section of video
     *
     * @param {number} timeout - How long the loop will last for
     * @param {number} time - Where to begin in the video clip
     */
    loopit (timeout, time) {
        this.currentLoop = setTimeout(() => {
            if (!this.shouldAdvance) {
                document.getElementById('bg_vid').currentTime = time;
                this.loopit(timeout, time);
            } else {
                this.onlooped();
                this.shouldAdvance = false;
            }
        }, timeout);
    }

    /**
     * Force a hard advance from a loop
     *
     * @param {boolean} consume - Should we ignore the skipshift tag
     */
    advanceNow (consume = false) {
        // Ignore the next skip shift in our list of breakpoints
        if (consume) {
            for (let i = 0; i < this.breakpoints.length; i++) {
                if (this.breakpoints[i].skipshift) {
                    this.breakpoints.splice(i, 1);
                }
            }
        }
        this.shouldAdvance = false;
        clearTimeout(this.currentLoop);
        this.stateLoop();
    }

    /**
     * This function allows you to inject an 'ignored' clip
     * in front of the queue to be played next
     *
     * @param {string} id - Id of the clip to play
     */
    playById (id) {
        for (let i = 0; i < this.breakpoints.length; i++) {
            if (this.breakpoints[i].id === id) {
                const copy = {};
                Object.assign(copy, this.breakpoints[i]);
                copy.ignore = false;
                this.breakpoints.unshift(copy);
                this.advanceNow();
                return;
            }
        }
        throw new Error('id not found in breakpoints');
    }

    /**
     * Pause video playback
     */
    pause () {
        document.getElementById('bg_vid').pause();
    }

    /**
     * Add a clip to the queue
     *
     * @param {string} id - Id of the clip to queue
     */
    queueById (id) {
        for (let i = 0; i < this.breakpoints.length; i++) {
            if (this.breakpoints[i].id === id) {
                const copy = {};
                Object.assign(copy, this.breakpoints[i]);
                copy.ignore = false;
                this.breakpoints.unshift(copy);
                return;
            }
        }
        throw new Error('id not found in breakpoints');
    }

    /**
     * This function handles all the logic of playing clips
     * based on this.breakpoints
     */
    stateLoop () {
        const scene = this.breakpoints.shift();
        // When we are finished processing items
        if (scene === undefined) {
            this.onDone();
            return;
        }

        // If it's important put it back
        if (scene.skipshift) {
            this.breakpoints.unshift(scene);
        }

        // If it's an ignoreable clip
        if (scene.ignore) {
            console.log('Ignoring and calling stateloop');
            this.stateLoop();
            return;
        }

        if (!scene.loop) {
            // If it's not a looped clip, when we are done we need to play
            // the next clip immediately
            this.play(scene.loop, scene.start, scene.duration).then(() => {
                if (scene.id) {
                    this.onplayed(scene.id);
                }

                this.stateLoop();
            });
        } else {
            // Okay we called a loop, lets check if we have an earthquake queued
            if (this.earthquakeQueued) {

            } else {
                // Assume at some point someone will call advance()
                this.play(scene.loop, scene.start, scene.duration);
            }
        }
    }

    /**
     * Actually call .play() on the video tag and start our
     * stateloop
     */
    start () {
        document.getElementById('bg_vid').play().then(() => {
            this.stateLoop();
        }).catch((reason) => {
            console.log('could not play the video');
            console.log(reason);
            // reject();
        });
    }

    /**
     *
     * @param {boolean} looped - Should this clip be looped
     * @param {number} starttime - When the clip should start
     * @param {number} duration - How long the clip is
     *
     * @return {Promise}
     */
    play (looped, starttime, duration) {
        return new Promise((resolve, reject) => {
            if (starttime !== null) {
                starttime = starttime / 1000;
                document.getElementById('bg_vid').currentTime = starttime;
            } else {
                console.log('starttime null, not setting');
            }

            if (looped) {
                this.loopit(duration, starttime);
            } else {
                setTimeout(() => {
                    resolve();
                }, duration);
            }
        });
    }

    /**
     * Shake the background
     *
     * @return {Promise}
     */
    shake () {
        return new Promise((resolve) => {
            this.background = document.getElementById('bg_vid');

            this.xShake = new Shake(this.shakeLength, 40);
            this.yShake = new Shake(this.shakeLength, 40);
            this.xShake.start();
            this.yShake.start();

            window.requestAnimationFrame(this.update.bind(this));
            setTimeout(() => {
                this.background = null;
                resolve();
            }, this.shakeLength + 500);
        });
    }

    /**
     * Update function
     *
     * @param {number} t - The time
     */
    update (t) {
        this.xShake.update();
        this.yShake.update();

        if (this.xShake.isShaking || this.yShake.isShaking) {
            window.requestAnimationFrame(this.update.bind(this));
        }

        const x = this.xShake.amplitude() * 32;
        const y = this.yShake.amplitude() * 32;

        this.background.style.left = `${Math.floor(x - 50).toString()}px`;
        this.background.style.top = `${Math.floor(y - 50).toString()}px`;
    }
}
