import ClosedCaption from './ccs';
/**
 * The ClosedCaptionPlayer class
 */
export default class ClosedCaptionPlayer {
    /**
     * @param {Array} captions - An array of captions to play
     * @param {string} captions.text - The text to display
     * @param {string} captions.time - The time to display the text for
     */
    constructor (captions) {
        this.captions = Array.from(captions);
        this.queue = [];
        for (let i = this.captions.length - 1; i >= 0; i--) {
            this.queue.push(new ClosedCaption(this.captions[i]));
        }
    }

    /**
     * Show
     */
    showCaption () {
        const caption = this.queue.pop();
        const ctime = this.captions.shift();

        if (caption !== undefined) {
            setTimeout(() => {
                caption.destroy().then(() => {
                    this.showCaption();
                });
            }, ctime.time);
        }
    }

    /**
     * Start showing the captions
     */
    start () {
        this.showCaption();
    }
}
