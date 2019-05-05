// -- Local imports -- //
import VideoPlayer from '../utils/videoplayer';
import Assistant from '../utils/assistant';
import Button from '../utils/ui/button';
import StartButton from '../utils/ui/startbutton';
import AudioPlayer from '../utils/audioplayer';
import Database from '../utils/db';

// -- Local constants -- //
import { OFFICE } from '../constants/breakpoints';
import { OFFICE_TIRED } from '../constants/voice';
import { OFFICE_TIRED_CC } from '../constants/closedcaptions';
import { OFFICE_AUDIO } from '../constants/audio';

// -- Local assets -- //
import BACKGROUND from '../videos/1-OFFICE-ALL.mp4';
import BUTTON from '../images/start-button.png';

/**
 * The office scene
 */
export default class OfficeScene {
    /**
     * Default constructor
     *
     * @param {Assistant} assistant - Our assistant class
     * @param {Database} db - The firebase db
     */
    constructor (assistant, db) {
        this.assistant = assistant;
        this.db = db;
    }

    /**
     * Start playing through the video scene
     */
    start () {
        this.db.addPlay();
        this.state = 'start';
        this.vp = new VideoPlayer(BACKGROUND, OFFICE);
        this.ap = new AudioPlayer(OFFICE_AUDIO);
        this.vp.start();
        this.ap.start();

        // When we finished playing a particular oneshot
        // this is used mostly for voice cues
        this.vp.onplayed = (id) => {
            if (id === 'intro') {
                // Tell the user they look tired
                this.assistant.say(OFFICE_TIRED, OFFICE_TIRED_CC, true).then(() => {
                    this.tiredButton = new Button(440, 420, 'CLOSE EYES');
                    this.tiredButton.onclick = () => {
                        this.onAction({ action: 'close_eyes' });
                    };
                });
            } else if (id === 'office') {
                // Play the next audio source
                this.ap.advance();
            }
        };

        // When we are done playing this loop
        this.vp.onDone = () => {
            // hopefull the gc picks this up
            this.vp = null;
            this.ap = null;
            this.nextScene();
        };

        this.startbutton = new StartButton(512, 350, BUTTON);
        this.startbutton.onclick = () => {
            this.onAction({ action: 'start' });
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
        if (this.state === 'start' && nState.action === 'start') {
            // Set our next state
            this.state = 'eyes';
            // Clean up old buttons
            this.startbutton.destroy();
            // Advance the video player past this loop
            this.vp.advanceNow();
        } else if (this.state === 'start' && nState.action === 'teleport') {
            this.startbutton.destroy();
            this.vp.killall();
            this.vp = null;
            console.log(nState.level);
            this.nextScene(nState.level);
        } else if (this.state === 'eyes' && nState.action === 'close_eyes') {
            this.ap.advance();
            this.tiredButton.destroy();
            this.vp.advanceNow();
        }
    }
}
