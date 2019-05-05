/**
 * This class will expose a way to but the ghost
 * speech bubble on screen
 */
export default class SpeechBubble {
    /**
     * Default constructor
     *
     * @param {string} text - The text to display
     */
    constructor (text) {
        this.sbcontainer = document.createElement('div');
        this.sbcontainer.className = 'ghost-speech-bubble';
        this.text = document.createElement('div');
        this.text.className = 'text';
        this.text.innerHTML = text;
        this.sbcontainer.append(this.text);
        document.body.append(this.sbcontainer);
    }

    /**
     * Destroy this speech bubble
     *
     * @return {Promise}
     */
    destroy () {
        return new Promise((resolve) => {
            this.sbcontainer.classList.add('fadeOut');
            setTimeout(() => {
                this.sbcontainer.parentNode.removeChild(this.sbcontainer);
                resolve();
            }, 1300);
        });
    }

    /**
     * A simple way to set the id of this html element
     *
     * @param {string} id - The id to give this node
     */
    setId (id) {
        this.sbcontainer.id = id;
    }
}
