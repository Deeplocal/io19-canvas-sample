/**
 * This is a simple class that gives us an easy interface
 * to creating buttons on the screen
 */
export default class StartButton {
    /**
     * Default constructor
     *
     * @param {number} x - x absolute offset
     * @param {number} y - y absolute offset
     * @param {string} img - The image to make the button from
     */
    constructor (x, y, img = '') {
        this.button = document.createElement('img');
        this.button.onclick = () => {
            this.onclick();
        };
        this.button.ontouchend = () => {
            this.onclick();
        };

        this.button.style.left = `${x}px`;
        this.button.style.top = `${y}px`;
        this.button.style.marginTop = '-40px';
        this.button.style.marginLeft = '-123.5px';
        this.button.classList = 'pulse';
        this.button.style.position = 'absolute';
        this.button.style.zIndex = 9;
        this.button.src = img;

        document.body.append(this.button);

        this.destroyed = false;
    }

    /**
     * Removes the html object from the page
     */
    destroy () {
        // Protect from a double click
        if (!this.destroyed) {
            this.destroyed = true;
            this.button.classList = 'action-pill-animation-go-away';
            setTimeout(() => {
                this.button.parentNode.removeChild(this.button);
            }, 2000);
        }
    }
}
