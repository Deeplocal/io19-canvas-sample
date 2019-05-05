// -- Local imports -- //
import Button from './button';

/**
 * A button manager class to make things a little cleaner
 */
export default class ButtonManager {
    /**
     * Default constructor
     *
     * @param {Object[]} options - The different options to display
     * @param {string} options[].text - The text of the button
     * @param {number} options[].x - The x offset
     * @param {number} options[].y - The y offset
     * @param {string} options[].width - The potential width
     * @param {number} correct - which index is correct
     */
    constructor (options, correct) {
        this.buttons = [];

        // Create all of our buttons
        for (let i = 0; i < options.length; i++) {
            const button = options[i];
            this.buttons.push(new Button(button.x, button.y, button.text, button.width, 'square-'));
            if (i === correct) {
                this.buttons[i].onclick = () => {
                    this.onCorrect();
                };
            } else {
                this.buttons[i].onclick = () => {
                    this.onIncorrect(i);
                };
            }
        }
    }

    /**
     * Destroy all the button
     *
     * @param {number} index - If we should only delete one
     */
    destroy (index = null) {
        if (index === null) {
            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].destroy();
            }
        } else {
            this.buttons[index].destroy();
        }
        // Clean up any remaining ghost speech bubbles
        const q = document.getElementById('question');
        if (q !== null) {
            q.parentNode.removeChild(q);
        }
    }
}
