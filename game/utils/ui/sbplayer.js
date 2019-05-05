import SpeechBubble from './sb';
/**
 * This will play the ghost speech bubbles
 */
export default class SpeechBubblePlayer {
    /**
     * Default constructor
     *
     * @param {Object[]} captions - The ghost captions to play
     * @param {string} captions[].text - The text to put in the bubble
     * @param {number} captions[].time - The time to display the text for (in ms)
     */
    constructor (captions) {
        this.bubbleQueue = Array.from(captions);
    }

    /**
     * Show the ghost speech bubble if there is still
     * one to show
     */
    display () {
        const caption = this.bubbleQueue.shift();
        if (caption !== undefined) {
            const sb = new SpeechBubble(caption.text);
            if (caption.time !== null) {
                setTimeout(() => {
                    sb.destroy().then(() => {
                        this.display();
                    });
                }, caption.time);
            } else {
                sb.setId('question');
            }
        }
    }

    /**
     * Start the bubble showing loop
     */
    start () {
        this.display();
    }
}
