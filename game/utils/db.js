// -- Third party imports -- //
import firebase from 'firebase/app';
import 'firebase/firestore';

// -- Local constants -- //
import CONFIG from '../.env.json';

/**
 * The Database class will wrap all our useful
 * db interactions
 */
export default class Database {
    /**
     * Default constructor
     */
    constructor () {
        firebase.initializeApp({
            apiKey: CONFIG.API_KEY,
            authDomain: CONFIG.AUTH_DOMAIN,
            projectId: CONFIG.PROJECT_ID,
        });
        this.db = firebase.firestore();
        this.id = (Math.floor(Math.random() * Math.floor(3)) + 1).toString();
    }


    /**
     * Add a game play to our metrics
     */
    addPlay () {
        this.db.collection('metrics').doc('plays').get().then((doc) => {
            let currentPlays = doc.data().value;
            currentPlays++;
            this.db.collection('metrics').doc('plays').set({
                value: currentPlays,
            });
        });
    }

    /**
     * Get the current number of votes
     *
     * @param {string} tabOrSpace - Which to get the vote for. Must be "tabs" or "spaces"
     * @return {Promise}
     */
    getVotes (tabOrSpace) {
        return new Promise((resolve, reject) => {
            if (tabOrSpace !== 'spaces' && tabOrSpace !== 'tabs') {
                reject(new Error('Invalid vote cast, please only vote for "tabs" or "spaces"'));
                return;
            }

            this.db.collection('votes').doc(tabOrSpace).get().then((info) => {
                resolve(info.data().value);
            });
        });
    }

    /**
     * User has voted
     *
     * @param {string} tabOrSpace - Which to vote for. Must be "tabs" or "spaces"
     * @return {Promise}
     */
    vote (tabOrSpace) {
        return new Promise((resolve, reject) => {
            if (tabOrSpace !== 'spaces' && tabOrSpace !== 'tabs') {
                reject(new Error('Invalid vote cast, please only vote for "tabs" or "spaces"'));
                return;
            }

            this.getVotes(tabOrSpace).then((currentVotes) => {
                currentVotes++;
                this.db.collection('votes').doc(tabOrSpace).set({
                    value: currentVotes,
                }).then(() => {
                    resolve(currentVotes);
                });
            });
        });
    }

    /**
     * Get the last player id and minutes of the question
     *
     * @param {string} firstOrSecond - Which question to get info for
     * @return {Promise}
     */
    getQuestion (firstOrSecond) {
        return new Promise((resolve, reject) => {
            if (firstOrSecond !== 'first' && firstOrSecond !== 'second') {
                reject(new Error('Invalid question string, must be "first" or "second"'));
                return;
            }

            this.db.collection('questions').doc(firstOrSecond).get().then((info) => {
                const data = info.data();

                const now = firebase.firestore.Timestamp.now();
                const minsdiff = (now.seconds - data.time.seconds) / 60;
                resolve({
                    id: data.playerid,
                    mins: Math.floor(minsdiff),
                });
            });
        });
    }

    /**
     * Update the value for the next encounter
     *
     * @param {string} firstOrSecond - Which question to update
     */
    updateQuestion (firstOrSecond) {
        if (firstOrSecond !== 'first' && firstOrSecond !== 'second') {
            new Error('Invalid question string, must be "first" or "second"');
            return;
        }
        this.db.collection('questions').doc(firstOrSecond).set({
            playerid: this.id,
            time: firebase.firestore.Timestamp.now(),
        });
    }

    /**
     * Add a game finish to our metrics
     */
    addFinish () {
        this.db.collection('metrics').doc('finishes').get().then((doc) => {
            let currentPlays = doc.data().value;
            currentPlays++;
            this.db.collection('metrics').doc('finishes').set({
                value: currentPlays,
            });
        });
    }

    /**
     * Returns the game mode we are currently in
     *
     * @return {Promise}
     */
    getGameMode () {
        return new Promise((resolve) => {
            this.db.collection('mode').doc('speedmode').get().then((doc) => {
                resolve(doc.data().mode);
            });
        });
    }
}
