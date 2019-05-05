// -- Local imports -- //
import VideoPlayer from '../utils/videoplayer';
import Assistant from '../utils/assistant';
import Button from '../utils/ui/button';
import AudioPlayer from '../utils/audioplayer';
import Database from '../utils/db';

// -- Local constants -- //
import { ROOF_INTRO, ROOF_BUTTERFINGERS, ROOF_DREAM } from '../constants/voice';
import { ROOF_INTRO_CC, ROOF_BUTTERFINGERS_CC, ROOF_DREAM_CC } from '../constants/closedcaptions';
import { ROOF } from '../constants/breakpoints';
import { ROOF_AUDIO } from '../constants/audio';

// -- Local assets -- //
import BACKGROUND from '../videos/6-ROOF-ALL.mp4';


/**
 * The RoofScene class
 */
export default class RoofScene {
    /**
     * Default constructor
     *
     * @param {Assistant} assistant - Our assistant class
     * @param {Database} db - Our firebase db
     */
    constructor (assistant, db) {
        this.assistant = assistant;
        this.db = db;
    }

    /**
     * Start playing the lava scene
     */
    start () {
        this.state = 'place';
        this.vp = new VideoPlayer(BACKGROUND, ROOF);
        this.ap = new AudioPlayer(ROOF_AUDIO);
        this.vp.start();
        setTimeout(() => {
            this.ap.start();
        }, 1000);


        // When we finished playing a particular oneshot
        // used mostly for voice queues
        this.vp.onplayed = (id) => {
            if (id === 'intro') {
                this.assistant.say(ROOF_INTRO, ROOF_INTRO_CC, true).then(() => {
                    this.placeArtifactButton = new Button(450, 412, 'ARTIFACT');
                    this.placeArtifactButton.onclick = () => {
                        this.onAction({ action: 'place_artifact' });
                    };
                });
            } else if (id === 'inhand') {
                this.ap.advance();
                setTimeout(() => {
                    this.assistant.say(ROOF_BUTTERFINGERS, ROOF_BUTTERFINGERS_CC).then(() => {
                        this.ap.advance();
                    });
                }, 500);
            } else if (id === 'broken') {
                this.vp.shake();
            } else if (id === 'game_over') {
                setTimeout(() => {
                    this.ap.advance();
                }, 2000);
            } else if (id === 'closed') {
                this.ap.advance();
                setTimeout(() => {
                    this.assistant.say(ROOF_DREAM, ROOF_DREAM_CC);
                }, 1000);
            }
        };

        // When we are done playing this loop
        this.vp.onDone = () => {
            // hopefull the gc picks this up
            this.vp = null;
            this.ap = null;
            this.db.addFinish();
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
        if (this.state === 'place' && nState.action === 'place_artifact') {
            this.state = 'pixel';
            this.placeArtifactButton.destroy();
            this.vp.advanceNow();
        } else if (this.state === 'pixel' && nState.action === 'pixel') {
            this.vp.advanceNow();
        }
    }
}
