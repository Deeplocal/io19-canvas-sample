// -- Local imports -- //
import VideoPlayer from '../utils/videoplayer';
import Assistant from '../utils/assistant';
import Button from '../utils/ui/button';
import Database from '../utils/db';
import Votes from '../utils/ui/votes';
import AudioPlayer from '../utils/audioplayer';

// -- Local constants -- //
import {
    LAVA_LIGHT_PROMPT, LAVA_ON_LIGHTS, LAVA_SPACES_PEOPLE,
    LAVA_TAB_PEOPLE, LAVA_RESPAWN, LAVA_JUMP, LAVA_LAVA,
} from '../constants/voice';

import {
    LAVA_LIGHT_PROMPT_CC, LAVA_ON_LIGHTS_CC, LAVA_SPACES_PEOPLE_CC,
    LAVA_TAB_PEOPLE_CC, LAVA_RESPAWN_CC, LAVA_JUMP_CC, LAVA_LAVA_CC,
} from '../constants/closedcaptions';

import { LAVA } from '../constants/breakpoints';
import { LAVA_AUDIO } from '../constants/audio';

// -- Local assets -- //
import BACKGROUND from '../videos/5-LAVA-ALL.mp4';


/**
 * The LavaScene class
 */
export default class LavaScene {
    /**
     * Default constructor
     *
     * @param {Assistant} assistant - Our assistant class
     * @param {Database} db - Our firebase db
     */
    constructor (assistant, db) {
        this.assistant = assistant;
        this.db = db;
        this.breakpoints = LAVA;

        // Votes
        this.spaceVotes = 0;
        this.tabVotes = 0;


        this.db.getVotes('spaces').then((votes) => {
            this.spaceVotes = votes;
        });

        this.db.getVotes('tabs').then((votes) => {
            this.tabVotes = votes;
        });
    }

    /**
     * Start playing the lava scene
     */
    start () {
        this.state = 'lights';
        this.vp = new VideoPlayer(BACKGROUND, this.breakpoints);
        this.ap = new AudioPlayer(LAVA_AUDIO);
        this.vp.start();
        this.ap.start();
        this.crossed = false;

        // When we finished playing a particular oneshot
        // used mostly for voice queues
        this.vp.onplayed = (id) => {
            if (id === 'lights_on') {
                this.votes.show();
                this.assistant.say(LAVA_ON_LIGHTS, LAVA_ON_LIGHTS_CC, true).then(() => {
                    // Create the button
                    this.voteSpacesButton = new Button(800, 380, 'SPACES');
                    this.voteSpacesButton.onclick = () => {
                        this.onAction({ action: 'spaces' });
                    };


                    this.voteTabsButton = new Button(125, 380, 'TABS');
                    this.voteTabsButton.onclick = () => {
                        this.onAction({ action: 'tabs' });
                    };
                });
            } else if (id === 'voted') {
                this.assistant.say(LAVA_LAVA, LAVA_LAVA_CC, true);
                this.crossButton = new Button(465, 470, 'CROSS');
                this.crossButton.onclick = () => {
                    this.onAction({ action: 'cross' });
                };

                this.jumpButton = new Button(725, 450, 'JUMP');
                this.jumpButton.onclick = () => {
                    this.onAction({ action: 'jump' });
                };
            } else if (id === 'cross') {
                this.assistant.say(LAVA_RESPAWN, LAVA_RESPAWN_CC, true);
                this.jumpButton.show();
                this.votes.show();
            } else if (id === 'jump' || id === 'jumpbridge') {
                this.vp.pause();
                this.assistant.say(LAVA_JUMP, LAVA_JUMP_CC, false).then(() => {
                    this.nextScene();
                });
            }
        };

        this.assistant.say(LAVA_LIGHT_PROMPT, LAVA_LIGHT_PROMPT_CC, true).then(() => {
            this.turnOnLightsButton = new Button(450, 320, 'LIGHTS');
            this.turnOnLightsButton.onclick = () => {
                this.onAction({ action: 'turn_on_lights' });
            };
        });

        // When we are done playing this loop
        this.vp.onDone = () => {
            // hopefull the gc picks this up
            this.vp = null;
            this.ap = null;
        };
    }

    /**
     * A user has voted
     *
     * @param {string} tabsOrSpaces - "spaces" or "tabs"
     */
    vote (tabsOrSpaces) {
        // Update our state
        this.state = 'lava';

        // Vote either tabs or spaces
        this.db.vote(tabsOrSpaces).then((nVotes) => {
            let speech;
            let ccs;
            this.ap.advance();
            if (tabsOrSpaces === 'tabs') {
                this.votes.updateTabs(nVotes);
                speech = LAVA_SPACES_PEOPLE;
                ccs = LAVA_SPACES_PEOPLE_CC;
            } else if (tabsOrSpaces === 'spaces') {
                this.votes.updateSpaces(nVotes);
                speech = LAVA_TAB_PEOPLE;
                ccs = LAVA_TAB_PEOPLE_CC;
            }

            // Say whatever we need to insult tabs/spaces people
            this.assistant.say(speech, ccs).then(() => {
                this.vp.advanceNow();
            });

            this.voteTabsButton.destroy();
            this.voteSpacesButton.destroy();
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
        if (this.state === 'lights' && nState.action === 'turn_on_lights') {
            this.turnOnLightsButton.destroy();
            this.state = 'vote';
            this.votes = new Votes(this.tabVotes, this.spaceVotes);
            this.vp.advanceNow();
            this.ap.advance();
        } else if (this.state === 'vote' && nState.action === 'tabs') {
            this.vote(nState.action);
        } else if (this.state === 'vote' && nState.action === 'spaces') {
            this.vote(nState.action);
        } else if (this.state === 'lava' && nState.action === 'jump') {
            this.votes.destroy();
            this.jumpButton.destroy();
            this.crossButton.destroy();
            if (this.crossed) {
                this.vp.playById('jump');
            } else {
                this.vp.playById('jumpbridge');
            }
        } else if (this.state === 'lava' && nState.action === 'cross') {
            this.crossed = true;
            this.crossButton.destroy();
            this.votes.hide();
            // First inject cross loop,
            // then cross, this way cross actually plays
            // first
            this.jumpButton.hide();
            this.vp.playById('cross');
            this.vp.queueById('crossloop');
            setTimeout(() => {
                this.ap.advance();
            }, 2000);
        }
    }
}
