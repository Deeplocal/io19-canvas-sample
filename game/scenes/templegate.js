// -- Local imports -- //
import VideoPlayer from '../utils/videoplayer';
import Assistant from '../utils/assistant';
import ButtonManager from '../utils/ui/buttonmanager';
import AudioPlayer from '../utils/audioplayer';

// -- Local constants -- //
import { TMPL_GATE } from '../constants/breakpoints';
import {
    TMPL_GATE_INTRO, TMPL_GATE_PUZZLE,
    TMPL_GATE_NOTHING_HAPPENS, TMPL_GATE_TOUGH,
} from '../constants/voice';
import {
    TMPL_GATE_INTRO_CC, TMPL_GATE_PUZZLE_CC,
    TMPL_GATE_NOTHING_HAPPENS_CC, TMPL_GATE_TOUGH_CC,
} from '../constants/closedcaptions';

import { WORD_PUZZLE } from '../constants/multiplechoice';

import { TEMPLE_AUDIO } from '../constants/audio';

// -- Local assets -- //
import BACKGROUND from '../videos/3-TEMPLE-ALL.mp4';


/**
 * The TempleGateScene class
 */
export default class TempleGateScene {
    /**
     * Default constructor
     *
     * @param {Assistant} assistant - Our assistant class
     */
    constructor (assistant) {
        this.assistant = assistant;
        this.breakpoints = TMPL_GATE;
    }

    /**
     * Start playing this scene
     */
    start () {
        this.state = 'inspect';
        this.vp = new VideoPlayer(BACKGROUND, this.breakpoints);
        this.ap = new AudioPlayer(TEMPLE_AUDIO);
        this.vp.start();
        this.ap.start();

        // When we finished playing a particular oneshot
        // used mostly for voice queues
        this.vp.onplayed = (id) => {
            if (id === 'intro') {
                this.assistant.say(TMPL_GATE_INTRO, TMPL_GATE_INTRO_CC, false).then(() => {
                    this.state = 'puzzle';
                    setTimeout(() => {
                        this.vp.advanceNow();
                    }, 1000);
                });
            } else if (id === 'puzzle') {
                this.assistant.say(TMPL_GATE_PUZZLE, TMPL_GATE_PUZZLE_CC, true).then(() => {
                    // Set up our buttons
                    this.btnTimeout = setTimeout(() => {
                        this.buttons = new ButtonManager(WORD_PUZZLE, 2);
                        this.buttons.onCorrect = () => {
                            this.onAction({ action: 'hello_world' });
                        };

                        this.buttons.onIncorrect = (index) => {
                            this.buttons.destroy(index);
                        };
                    }, 5000);
                });
            } else if (id === 'north') {

            } else if (id === 'gears') {
                // Play the gears sound
                this.ap.advance();
                setTimeout(() => {
                    // Play the door opening sound
                    this.ap.advance();
                    setTimeout(() => {
                        this.assistant.say(TMPL_GATE_TOUGH, TMPL_GATE_TOUGH_CC).then(() => {
                            this.ap.advance();
                        });
                    }, 1200);
                }, 2400);
            }
        };

        // When we are done playing this loop
        this.vp.onDone = () => {
            // hopefull the gc picks this up
            this.vp = null;
            this.nextScene();
        };
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
        if (this.state === 'puzzle' && nState.action === 'hello_world') {
            this.state = 'north';
            this.ap.advance();
            clearTimeout(this.btnTimeout);
            try {
                this.buttons.destroy();
            } catch (e) {
                console.log(e);
            }
            this.vp.advanceNow();
        } else if (this.state === 'puzzle' && nState.action !== 'hello_world') {
            this.assistant.say(TMPL_GATE_NOTHING_HAPPENS, TMPL_GATE_NOTHING_HAPPENS_CC, true);
        } else if (this.state === 'north' && nState.action === 'enter_temple') {
            this.goNorthButton.destroy();
            this.vp.advanceNow();
        }
    }
}
