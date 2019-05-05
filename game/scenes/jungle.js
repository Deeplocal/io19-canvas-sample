// -- Local imports -- //
import VideoPlayer from '../utils/videoplayer';
import Assistant from '../utils/assistant';
import Button from '../utils/ui/button';
import AudioPlayer from '../utils/audioplayer';

// -- Local constants -- //
import { JUNGLE } from '../constants/breakpoints';
import { JUNGLE_START, JUNGLE_BRUSH_CLEARED, JUNGLE_PICKUP } from '../constants/voice';
import { JUNGLE_START_CC, JUNGLE_BRUSH_CLEARED_CC, JUNGLE_PICKUP_CC } from '../constants/closedcaptions';

// -- Local assets -- //
import BACKGROUND from '../videos/2-JUNGLE-ALL.mp4';
import { JUNGLE_AUDIO } from '../constants/audio';

/**
 * The JungleScene class
 */
export default class JungleScene {
    /**
     * Default constructor
     *
     * @param {Assistant} assistant - Our assistant class
     */
    constructor (assistant) {
        this.assistant = assistant;
        this.breakpoints = JUNGLE;
    }

    /**
     * Start playing this scene
     */
    start () {
        this.state = 'pickup';
        this.vp = new VideoPlayer(BACKGROUND, this.breakpoints);
        this.ap = new AudioPlayer(JUNGLE_AUDIO);
        this.vp.start();
        setTimeout(() => {
            this.ap.start();
        }, 1000);


        // When we finished playing a particular oneshot
        // used mostly for voice queues
        this.vp.onplayed = (id) => {
            if (id === 'entered') {
                this.assistant.say(JUNGLE_START, JUNGLE_START_CC).then(() => {
                    this.assistant.say(JUNGLE_PICKUP, JUNGLE_PICKUP_CC, true).then(() => {
                        this.pickupButton = new Button(350, 400, 'CHAINSAW');
                        this.pickupButton.onclick = () => {
                            this.onAction({ action: 'pick_up' });
                        };
                    });
                });
            } else if (id === 'cleared') {
                this.assistant.say(JUNGLE_BRUSH_CLEARED, JUNGLE_BRUSH_CLEARED_CC, true).then(() => {
                    this.goNorthButton = new Button(700, 210, 'GO NORTH');
                    this.goNorthButton.onclick = () => {
                        this.onAction({ action: 'go_north' });
                    };
                });
            }
        };

        // When we are done playing this loop
        this.vp.onDone = () => {
            this.vp = null;
            this.ap = null;
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
        if (this.state === 'pickup' && nState.action === 'pick_up') {
            this.state = 'north';
            this.pickupButton.destroy();
            this.vp.advanceNow();
            setTimeout(() => {
                this.ap.advance();
            }, 1000);
        } else if (this.state === 'north' && nState.action === 'go_north') {
            this.goNorthButton.destroy();
            this.vp.advanceNow();
        }
    }
}
