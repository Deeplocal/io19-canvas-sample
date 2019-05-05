/**
 * The ClosedCaption class
 */
export default class ClosedCaption {
    /**
     * Default constrcuctor
     *
     * @param {string} caption - The captions
     */
    constructor (caption) {
        this.cccontainer = document.createElement('div');
        this.bubble = document.createElement('div');


        this.cccontainer.className = 'cc-container';
        this.bubble.className = 'bubble';

        this.text = document.createElement('div');
        this.text.className = 'text';
        this.text.innerHTML = caption.text;

        this.bubble.appendChild(this.text);
        this.cccontainer.appendChild(this.bubble);
        document.body.appendChild(this.cccontainer);
    }

    /**
     * Destroy the html element
     *
     * @return {Promise}
     */
    destroy () {
        // This doesn't actually need to be a promise since it isnt doing anything
        return new Promise((resolve) => {
            this.cccontainer.classList.add('fadeOutDown');


            // Wait the duration of the fade out animation
            setTimeout(() => {
                this.cccontainer.parentNode.removeChild(this.cccontainer);
                resolve();
            }, 2000);
        });
    }
}
