// -- Local imports -- //
import OfficeScene from './scenes/office';
import JungleScene from './scenes/jungle';
import Assistant from './utils/assistant';
import TempleGateScene from './scenes/templegate';
import HallScene from './scenes/hall';
import LavaScene from './scenes/lava';
import RoofScene from './scenes/roof';
import Database from './utils/db';

const assistant = new Assistant();
const db = new Database();

const ofcs = new OfficeScene(assistant, db);
const jgls = new JungleScene(assistant);
const tmplgs = new TempleGateScene(assistant);
const hals = new HallScene(assistant, db);
const lvas = new LavaScene(assistant, db);
const rofs = new RoofScene(assistant, db);

import CLOSE_BUTTON from './images/x-button.svg';
import SHOW_BUTTON from './images/help-button.svg';


window.onload = () => {
    const htbtn = document.getElementById('howto');
    const btnimg = document.getElementById('helpbtnimg');
    const htimg = document.getElementById('howtoimg');
    const loading = document.getElementById('loadingdiv');

    window.assistantCanvasCallbacks = assistant;
    assistantCanvas.onLoad(1, 'assistantCanvasCallbacks');

    db.getGameMode().then((speedmode) => {
        ofcs.nextScene = (level = 'jungle') => {
            // So that we can teleport
            switch (level) {
                case 'jungle':
                    assistant.onAction = jgls.onAction.bind(jgls);
                    jgls.start();
                    break;
                case 'gate':
                    assistant.onAction = tmplgs.onAction.bind(tmplgs);
                    tmplgs.start();
                    break;
                case 'hallway':
                    assistant.onAction = hals.onAction.bind(hals);
                    hals.start();
                    break;
                case 'lava':
                    assistant.onAction = lvas.onAction.bind(lvas);
                    lvas.start();
                    break;
                case 'roof':
                    assistant.onAction = rofs.onAction.bind(rofs);
                    rofs.start();
                    break;
            }
        };

        // Roof always loops to beginning
        rofs.nextScene = () => {
            document.body.style.backgroundColor = 'white';
            loading.style.zIndex = 100;
            htbtn.style.zIndex = 0;

            // Hide it once we're done
            setTimeout(() => {
                loading.style.zIndex = 0;
                document.body.style.backgroundColor = 'black';
                htbtn.style.zIndex = 100;
            }, Number(process.env.LOADING_TIMEOUT));
            assistant.onAction = ofcs.onAction.bind(ofcs);
            ofcs.start();
        };

        if (speedmode) {
            ofcs.nextScene = () => {
                assistant.onAction = tmplgs.onAction.bind(tmplgs);
                tmplgs.start();
            };
            tmplgs.nextScene = () => {
                assistant.onAction = hals.onAction.bind(hals);
                hals.start();
            };
            hals.nextScene = () => {
                assistant.onAction = rofs.onAction.bind(rofs);
                rofs.start();
            };
        } else {
            // Play in regular mode
            jgls.nextScene = () => {
                assistant.onAction = tmplgs.onAction.bind(tmplgs);
                tmplgs.start();
            };

            tmplgs.nextScene = () => {
                assistant.onAction = hals.onAction.bind(hals);
                hals.start();
            };

            hals.nextScene = () => {
                assistant.onAction = lvas.onAction.bind(lvas);
                lvas.start();
            };

            lvas.nextScene = () => {
                assistant.onAction = rofs.onAction.bind(rofs);
                rofs.start();
            };
        }

        // For now leave this so I don't have to change things
        // to deploy while testing
        if (process.env.NODE_ENV === 'production') {
            assistant.onAction = ofcs.onAction.bind(ofcs);
            ofcs.start();
        } else {
            assistant.onAction = rofs.onAction.bind(rofs);
            rofs.start();
        }
    });

    htimg.style.zIndex = 0;
    htbtn.onclick = () => {
        if (htimg.style.zIndex === '0') {
            // Set visible
            btnimg.src = CLOSE_BUTTON;
            htimg.style.zIndex = 10;
        } else {
            btnimg.src = SHOW_BUTTON;
            htimg.style.zIndex = 0;
        }
    };

    setTimeout(() => {
        loading.style.zIndex = 0;
        document.body.style.backgroundColor = 'black';
        htbtn.style.zIndex = 100;
    }, Number(process.env.LOADING_TIMEOUT));
};
