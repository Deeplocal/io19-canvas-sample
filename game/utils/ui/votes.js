/**
 * A class for handling our votes
 */
export default class Votes {
    /**
     * Default constructor
     *
     * @param {number} tabs - Number of tab votes
     * @param {number} spaces - Number of spaces votes
     */
    constructor (tabs, spaces) {
        this.tabContainer = document.createElement('div');
        this.tabContainer.classList = 'vote-container vote-left';
        this.tabVotes = document.createElement('div');
        this.tabVotes.classList = 'vote-numeral';
        this.tabVotes.innerHTML = tabs;
        this.tabContainer.appendChild(this.tabVotes);

        this.spaceContainer = document.createElement('div');
        this.spaceContainer.classList = 'vote-container vote-right';
        this.spaceVotes = document.createElement('div');
        this.spaceVotes.classList = 'vote-numeral';
        this.spaceVotes.innerHTML = spaces;
        this.spaceContainer.appendChild(this.spaceVotes);

        document.body.appendChild(this.tabContainer);
        document.body.appendChild(this.spaceContainer);
    }

    /**
     * Hide this action pill
     */
    hide () {
        this.tabContainer.style.zIndex = 0;
        this.spaceContainer.style.zIndex = 0;
    }

    /**
     * Show this action pill
     */
    show () {
        this.tabContainer.style.zIndex = 5;
        this.spaceContainer.style.zIndex = 5;
    }

    /**
     * Update the number of tab votes
     *
     * @param {number} nTabs - The new number of tabs
     */
    updateTabs (nTabs) {
        this.tabContainer.classList.add('vote-digit-change');
        setTimeout(() => {
            this.tabVotes.innerHTML = nTabs;
        }, 750);

        setTimeout(() => {
            this.tabContainer.classList.remove('vote-digit-change');
        }, 1700);
    }

    /**
     * Update the number of space votes
     *
     * @param {number} nSpaces - The new number of spaces
     */
    updateSpaces (nSpaces) {
        this.spaceContainer.classList.add('vote-digit-change');
        setTimeout(() => {
            this.spaceVotes.innerHTML = nSpaces;
        }, 750);

        setTimeout(() => {
            this.spaceContainer.classList.remove('vote-digit-change');
        }, 1700);
    }

    /**
     * Remove the votes
     */
    destroy () {
        this.tabContainer.parentNode.removeChild(this.tabContainer);
        this.spaceContainer.parentNode.removeChild(this.spaceContainer);
    }
}
