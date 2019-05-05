// -- Local imports -- //
import VideoPlayer from '../utils/videoplayer';
import Assistant from '../utils/assistant';
import Database from '../utils/db';
import ButtonManager from '../utils/ui/buttonmanager';
import AudioPlayer from '../utils/audioplayer';

// -- Local constants -- //
import {
    HALL_INTRO, HALL_FIRST_Q, HALL_FIRST_CORRECT, HALL_FIRST_WRONG,
    HALL_SECOND_Q, HALL_SECOND_CORRECT, HALL_SECOND_WRONG, HALL_BORED, HALL_BOO,
} from '../constants/voice';

import {
    HALL_INTRO_CC, HALL_FIRST_Q_CC, HALL_FIRST_CORRECT_CC, HALL_FIRST_WRONG_CC,
    HALL_SECOND_Q_CC, HALL_SECOND_CORRECT_CC, HALL_SECOND_WRONG_CC, HALL_BORED_CC, HALL_BOO_CC,
} from '../constants/closedcaptions';

import { HALL } from '../constants/breakpoints';

import { FIRST_QUESTION, SECOND_QUESTION } from '../constants/multiplechoice';

import { HALL_AUDIO } from '../constants/audio';

// -- Local assets -- //
import BACKGROUND from '../videos/4-HALL-ALL.mp4';


/**
 * The HallScene class
 */
export default class HallScene {
    /**
     * Default constructor
     *
     * @param {Assistant} assistant - Our assistant class
     * @param {Database} db - Our firebase db
     */
    constructor (assistant, db) {
        this.assistant = assistant;
        this.db = db;
        this.breakpoints = HALL;
    }

    /**
     * Start playing this scene
     */
    start () {
        this.state = 'first';
        this.vp = new VideoPlayer(BACKGROUND, this.breakpoints);
        this.ap = new AudioPlayer(HALL_AUDIO);
        this.vp.start();
        setTimeout(() => {
            // Play the ghost boop
            this.ap.start();
        }, 500);


        // When we finished playing a particular oneshot
        // used mostly for voice queues
        this.vp.onplayed = (id) => {
            if (id === 'appear') {
                // We are actually able to add a break to the end of the ssml, which will give
                // us a pause without having to use set timeout!
                this.assistant.say(HALL_INTRO, HALL_INTRO_CC, false).then(() => {
                    // Play the door closing sound
                    this.ap.advance();
                    // Delay the BOO so you can hear the door close
                    setTimeout(() => {
                        this.assistant.say(HALL_BOO, HALL_BOO_CC, false).then(() => {
                            this.assistant.say(HALL_FIRST_Q, HALL_FIRST_Q_CC, true).then(() => {
                                this.adjustSpeechBubble().then(() => {
                                    this.buttonManager = new ButtonManager(FIRST_QUESTION, 2);
                                    this.buttonManager.onCorrect = this.firstCorrect.bind(this);
                                    this.buttonManager.onIncorrect = this.incorrect.bind(this);
                                });
                            });
                        });
                    }, 1000);
                });
            }
        };

        // When we are done playing this loop
        this.vp.onDone = () => {
            // hopefull the gc picks this up
            this.vp = null;
            this.ap = null;
            this.nextScene();
        };
    }

    /**
     * The user got the first question correct
     */
    firstCorrect () {
        this.onAction({ action: 'build_number' });
    }

    /**
     * The user got the second question correct
     */
    secondCorrect () {
        this.onAction({ action: 'zero' });
    }

    /**
     * The user got the question wrong
     */
    incorrect () {
        this.onAction({ action: 'foo_bar' });
    }

    /**
     * Move the speech bubble up
     *
     * @return {Promise}
     */
    adjustSpeechBubble () {
        return new Promise((resolve) => {
            try {
                const q = document.getElementById('question');
                q.style.top = '120px';
            } catch (e) {
                console.log('not rendered yet');
            }

            setTimeout(() => {
                resolve();
            }, 1300);
        });
    }


    /**
     * This function will be attached to the assistant canvas update
     * function and will be called on every voice interaction during this
     * scene
     *
     * @param {Object} nState - The new state given by assistant canvas
     * @param {string} nState.action - The action being preformed
     */
    onAction (nState) {
        if (this.state === 'first' && nState.action === 'build_number') {
            // Set the state as north
            this.state = 'north';
            //
            this.buttonManager.destroy();
            this.vp.playById('correct', true);

            this.assistant.say(HALL_FIRST_CORRECT, HALL_FIRST_CORRECT_CC, false).then(() => {
                this.db.getQuestion('first').then((playerInfo) => {
                    const text = `You are the first explorer to get that right since Player ${playerInfo.id} who answered ${playerInfo.mins} minutes ago. You may pass.`;
                    setTimeout(() => {
                        this.assistant.say({ voice: text, gender: 'male' }, { captions: [{ text: text, time: 8000 }], ghost: true }).then(() => {
                            this.ap.advance();
                            this.vp.advanceNow(true);
                            this.db.updateQuestion('first');
                        });
                    }, 500);
                });
            });
        } else if (this.state === 'first' && nState.action !== 'build_number' && nState.action !== undefined) {
            // Set our state to second
            this.state = 'second';

            // Destroy the buttons
            this.buttonManager.destroy();
            // Play the disapprove video
            this.vp.playById('incorrect');

            // Start saying they were wrong
            this.assistant.say(HALL_FIRST_WRONG, HALL_FIRST_WRONG_CC, false).then(() => {
                // Hack to wait for fade animations
                setTimeout(() => {
                    this.assistant.say(HALL_SECOND_Q, HALL_SECOND_Q_CC, true).then(() => {
                        this.adjustSpeechBubble().then(() => {
                            this.buttonManager = new ButtonManager(SECOND_QUESTION, 0);
                            this.buttonManager.onCorrect = this.secondCorrect.bind(this);
                            this.buttonManager.onIncorrect = this.incorrect.bind(this);
                        });
                    });
                }, 1500);
            });
        } else if (this.state === 'second' && nState.action === 'zero') {
            // Set our state to north
            this.state = 'north';
            // Destroy the buttons
            this.buttonManager.destroy();

            this.vp.playById('correct', true);


            this.assistant.say(HALL_SECOND_CORRECT, HALL_SECOND_CORRECT_CC, false).then(() => {
                this.db.getQuestion('second').then((playerInfo) => {
                    const text = `You are the first explorer to get that right since Player ${playerInfo.id} who answered ${playerInfo.mins} minutes ago. You may pass.`;
                    setTimeout(() => {
                        this.assistant.say({ voice: text, gender: 'male' }, { captions: [{ text: text, time: 8000 }], ghost: true }).then(() => {
                            this.ap.advance();
                            this.vp.advanceNow(true);
                            this.db.updateQuestion('second');
                        });
                    }, 500);
                });
            });
        } else if (this.state === 'second' && nState.action !== 'zero') {
            // Go north
            this.buttonManager.destroy();

            this.vp.playById('incorrect', true);
            this.assistant.say(HALL_SECOND_WRONG, HALL_SECOND_WRONG_CC, false).then(() => {
                this.assistant.say(HALL_BORED, HALL_BORED_CC, false).then(() => {
                    this.ap.advance();
                    this.vp.advanceNow(true);
                });
            });
        }
    }
}
