// -- Third party imports -- //
import EvenetEmitter from 'eventemitter3';

// -- Local imports -- //

import ClosedCaptionPlayer from './ui/ccsplayer';
import SpeechBubblePlayer from './ui/sbplayer';

/**
 * A classy wrapper for all things canvas
 */
export default class Assistant {
    /**
     * Default constructor
     */
    constructor () {
        this.emitter = new EvenetEmitter();
        this.emitter.emit();
        this.requestIds = {};
        this.timeouts = {};
    }

    /**
     * The function to be called when updates happen
     *
     * @param {string} requestId - The request id
     * @param {Object} newState - The new state
     */
    update (requestId, newState) {
        console.log(newState);
        // React to the new state
        this.onAction(newState);
        // Tell the assistant that you're done with your update.
        assistantCanvas.onUpdateDone(requestId);
    };

    /**
     * This will be set depending on which scene
     * we are currently in
     */
    onAction () { }

    /**
     * The function to be given to the window to be used
     * by the assistant canvas api
     *
     * @param {string} requestId - The request id
     * @param {string} status - The status of the output
     */
    onOutputTtsStatus (requestId, status) {
        for (const key in this.requestIds) {
            if (this.requestIds.hasOwnProperty(key)) {
                if (requestId === this.requestIds[key] && status === 'END') {
                    clearTimeout(this.timeouts[key]);
                    delete this.timeouts[key];
                    delete this.requestIds[key];

                    // Do something after TTS has been output
                    console.log(`Emitting: ${key}`);
                    this.emitter.emit(key);
                }
            }
        }
    };

    /**
     * This function will say a message to the user
     *
     * @param {Object} message - An object with message info
     * @param {string} message.voice - The message to say to the user
     * @param {string} message.gender - The gender of the message
     * @param {Object} captions - The captions to show along with the speech
     * @param {boolean} captions.ghost - Are these ghost closed captions
     * @param {Array} captions.captions - The actual closed captions
     * @param {boolean} openmic - Should we open the mic after speaking
     *
     * @return {Promise}
     */
    say (message, captions, openmic = false) {
        // Create a unique identifier
        const reqKey = Date.now().toString();

        // This promise will only resolve once the assistant is done
        // speaking
        return new Promise((resolve, reject) => {
            // Generate the ssml
            const ssml = `<speak><voice gender="${message.gender}">${message.voice}</voice></speak>`;
            // const ssml = `<speak>${message.voice}</speak>`;
            console.log(`Saying ${ssml} to the user with id: ${reqKey}`);

            this.requestIds[reqKey] = assistantCanvas.outputTts(ssml, openmic);

            // Give the assistant a few seconds to start speaking
            setTimeout(() => {
                if (captions.ghost) {
                    const ccplayer = new SpeechBubblePlayer(captions.captions);
                    ccplayer.start();
                } else {
                    console.log(JSON.stringify(captions.captions));
                    const ccplayer = new ClosedCaptionPlayer(captions.captions);
                    ccplayer.start();
                }
            }, 200);


            this.emitter.on(reqKey, () => {
                resolve();
            }, this);

            // This is for debugging purposes
            this.timeouts[reqKey] = setTimeout(() => {
                console.log(`Timeout ${reqKey} not cleared. Speaking interupted!`);

                delete this.requestIds[reqKey];

                delete this.timeouts[reqKey];
                resolve();
            }, Number(process.env.TIMEOUT));
        });
    }
}
