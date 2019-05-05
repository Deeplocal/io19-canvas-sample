/**
 * This is a simple class that gives us an easy interface
 * to creating buttons on the screen
 */
export default class Button {
    /**
     * Default constructor
     *
     * @param {number} x - x absolute offset
     * @param {number} y - y absolute offset
     * @param {string} text - Text to be placed in the button
     * @param {string} width - Possible width of button
     * @param {string} classN - Possible alternate class name
     */
    constructor (x, y, text = '', width = null, classN = null) {
        this.button = document.createElement('div');
        this.button.classList = `${classN || ''}action-pill action-pill-animation-appear`;

        this.button.onclick = () => {
            this.button.classList.remove(`${classN || ''}action-pill-animation-pulse`);
            this.onclick();
        };
        this.button.ontouchend = () => {
            this.button.classList.remove(`${classN || ''}action-pill-animation-pulse`);
            this.onclick();
        };

        this.button.style.left = `${x}px`;
        this.button.style.top = `${y}px`;

        // Catch null && undefined with double equals instead
        // of triple equals
        if (width !== null) {
            this.button.style.width = width;
        }

        this.button.innerHTML = text;

        document.body.append(this.button);

        setTimeout(() => {
            this.button.classList = `${classN || ''}action-pill ${classN || ''}action-pill-animation-pulse`;
        }, 500);
    }

    /**
     * Hide this action pill
     */
    hide () {
        this.button.style.zIndex = 0;
    }

    /**
     * Show this action pill
     */
    show () {
        this.button.style.zIndex = 5;
    }

    /**
     * Alows us to dynamically change button text
     *
     * @param {string} ntext - The text to put on the button
     */
    updateText (ntext) {
        this.button.innerHTML = ntext;
    }

    /**
     * Removes the html object from the page
     */
    destroy () {
        this.button.classList.add('action-pill-animation-go-away');
        setTimeout(() => {
            try {
                this.button.parentNode.removeChild(this.button);
            } catch (e) {
                console.log('Button already destroyed!');
            }
        }, 500);
    }
}
