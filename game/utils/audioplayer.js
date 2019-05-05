/**
 * A simple class to play sound assets
 */
export default class AudioPlayer {
    /**
     * Default constructor
     *
     * @param {Object[]} clips - The audio clips to play
     * @param {string} clips[].src - The audio source
     * @param {boolean} clips[].loop - Should we loop the audio clip
     */
    constructor (clips) {
        // Be sure to copy
        this.clips = Array.from(clips);
        this.audio = document.getElementById('ado');
        // For now disable the audio
        // this.audio.volume = 0;
    }

    /**
     * Play a new audio clip
     *
     * @param {Object} clip - The new audio source
     * @param {string} clip.src - The source of this clip
     * @param {boolean} clip.loop - Should we loop this clip
     * @return {Promise}
     */
    play (clip) {
        return new Promise((resolve) => {
            // Stop anything that might be playing
            // this.audio.stop();
            // Set the new source
            this.audio.src = clip.src;
            this.audio.loop = clip.loop;
            this.audio.muted = false;
            if (clip.muted) {
                this.audio.muted = true;
            }
            // Load it
            this.audio.load();
            // Play it!
            this.audio.play();
            this.audio.onended = () => {
                resolve();
            };
        });
    }

    /**
     * Keep track of which clip to play
     */
    stateLoop () {
        const clip = this.clips.shift();

        if (clip !== undefined) {
            if (clip.loop) {
                // Eventually advance will be called
                this.play(clip);
            } else {
                // Call stateloop when the clip is done playing
                this.play(clip).then(() => {
                    this.stateLoop();
                });
            }
        }
    }

    /**
     * Force the next audio clip to play
     *
     * @param {number} numToSkip - The number of audio clips to skip
     */
    advance (numToSkip = 0) {
        for (let i = 0; i < numToSkip; i++) {
            this.clips.shift();
        }
        this.stateLoop();
    }

    /**
     * Start playing the audio for this scene
     */
    start () {
        this.stateLoop();
    }
}
