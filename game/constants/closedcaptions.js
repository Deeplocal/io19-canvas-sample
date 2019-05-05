const OFFICE_TIRED_CC = {
    captions: [
        {
            text: 'Hey, you look really tired!',
            time: 2000,
        },
        {
            text: 'Say "close my eyes" to take a nap',
            time: 2000,
        },
    ],
};

const JUNGLE_START_CC = {
    captions: [
        {
            text: 'What happened? It looks like we\'re in some sort of jungle.',
            time: 3500,
        },

    ],
};

const JUNGLE_PICKUP_CC = {
    captions: [
        {
            text: 'Hey! Look over there! A chainsaw on the ground!',
            time: 2300,
        },
        {
            text: 'Just say "pick up the chainsaw" to use it.',
            time: 2000,
        },
    ],
};

const JUNGLE_BRUSH_CLEARED_CC = {
    captions: [
        {
            text: 'Feels good to clear some brush',
            time: 2000,
        },
        {
            text: 'instead of sitting at the computer all day.',
            time: 3000,
        },
    ],
};

const TMPL_GATE_INTRO_CC = {
    captions: [
        {
            text: 'It looks like a forgotten temple.',
            time: 2000,
        },
        {
            text: 'There\'s some kind of mechanism on the door.',
            time: 1500,
        },
        {
            text: 'Let\'s take a closer look.',
            time: 1000,
        },
    ],
};

const TMPL_GATE_PUZZLE_CC = {
    captions: [
        {
            text: 'It looks like a word puzzle. What does it say?',
            time: 3000,
        },
    ],
};

const TMPL_GATE_NOTHING_HAPPENS_CC = {
    captions: [
        {
            text: 'Nothing happens. Try something else.',
            time: 3000,
        },
    ],
};

const TMPL_GATE_TOUGH_CC = {
    captions: [
        {
            text: 'That was a tough one!',
            time: 2000,
        },
    ],
};

const HALL_INTRO_CC = {
    captions: [
        {
            text: 'Uh oh, this guy doesn\'t look friendly!',
            time: 2000,
        },
        {
            text: 'Too bad the door closed behind us.',
            time: 2000,
        },
    ],
};
const HALL_BOO_CC = {
    ghost: true,
    captions: [
        {
            text: 'Boo!',
            time: 1000,
        },
    ],
};
const HALL_FIRST_Q_CC = {
    ghost: true,
    captions: [
        {
            text: 'I am the ghost of irrelevant trivia. You may not pass unless you successfully answer my challenge.',
            time: 6000,
        },
        {
            text: 'First question: how do you become an Android developer?',
            time: null,
        },
    ],
};

const HALL_FIRST_CORRECT_CC = {
    ghost: true,
    captions: [
        {
            text: 'You must have done this before.',
            time: 2000,
        },
    ],
};

const HALL_FIRST_WRONG_CC = {
    ghost: true,
    captions: [
        {
            text: 'Wrong! In Android you become a developer by tapping "build number" 7 times.',
            time: 5000,
        },
    ],
};

const HALL_SECOND_Q_CC = {
    ghost: true,
    captions: [
        {
            text: 'Next question: how many software developers does it take to change a lightbulb?',
            time: null,
        },
    ],
};

const HALL_SECOND_CORRECT_CC = {
    ghost: true,
    captions: [
        {
            text: 'Correct! Changing a lightbulb is a hardware issue.',
            time: 3000,
        },
    ],
};

const HALL_SECOND_WRONG_CC = {
    ghost: true,
    captions: [
        {
            text: 'Wrong! The answer is zero. Changing a lightbulb is a hardware issue.',
            time: 3000,
        },
    ],
};

const HALL_BORED_CC = {
    ghost: true,
    captions: [
        {
            text: 'You bore me! I shall let you pass to save myself the trouble of speaking with you any further!',
            time: 4500,
        },
    ],
};

const LAVA_LIGHT_PROMPT_CC = {
    captions: [
        {
            text: 'It\'s really dark in here. Better turn on the lights.',
            time: 3000,
        },
    ],
};

const LAVA_ON_LIGHTS_CC = {
    captions: [
        {
            text: 'Hey, that works here too! Nice!',
            time: 4500,
        },
        {
            text: 'It looks like players who\'ve been here before us have weighed in',
            time: 3000,
        },
        {
            text: 'on this eternal question. So, what do you say, tabs or spaces?',
            time: 3000,
        },
    ],
};

const LAVA_TAB_PEOPLE_CC = {
    captions: [
        {
            text: 'Yeah totally, those tabs people are the worst!',
            time: 2000,
        },
    ],
};

const LAVA_SPACES_PEOPLE_CC = {
    captions: [
        {
            text: 'Yeah totally, those spaces people are the worst!',
            time: 2000,
        },
    ],
};

const LAVA_LAVA_CC = {
    captions: [
        {
            text: 'Uh oh, lava – let\'s get out of here!',
            time: 2000,
        },
    ],
};

const LAVA_RESPAWN_CC = {
    captions: [
        {
            text: 'Ouch! Good thing I had a quarter to respawn us. Let\'s try again.',
            time: 3000,
        },
    ],
};

const LAVA_JUMP_CC = {
    captions: [
        {
            text: 'Phew! We made it!',
            time: 2000,
        },
    ],
};

const ROOF_INTRO_CC = {
    captions: [
        {
            text: 'It looks like that artifact fell out of place.',
            time: 2000,
        },
        {
            text: 'We better put it back.',
            time: 1000,
        },
        {
            text: 'I\'ve seen a lot of movies, and I bet that\'s our way out of here!',
            time: 2300,
        },
    ],
};

const ROOF_BUTTERFINGERS_CC = {
    captions: [
        {
            text: 'Butterfingers! You broke it!',
            time: 2000,
        },
        {
            text: 'Uh oh, thats not good. We triggered an earthquake!',
            time: 2500,
        },
        {
            text: 'I hope it doesn\'t last long.',
            time: 1500,
        },
    ],
};

const ROOF_DREAM_CC = {
    captions: [
        {
            text: 'What? That was all a dream?',
            time: 3000,
        },
        {
            text: 'Bummer, I guess we better answer this email...',
            time: 2300,
        },
    ],
};

export {
    // Office
    OFFICE_TIRED_CC,
    // Jungle
    JUNGLE_START_CC,
    JUNGLE_PICKUP_CC,
    JUNGLE_BRUSH_CLEARED_CC,
    // Temple gate
    TMPL_GATE_INTRO_CC,
    TMPL_GATE_PUZZLE_CC,
    TMPL_GATE_NOTHING_HAPPENS_CC,
    TMPL_GATE_TOUGH_CC,
    // Hall
    HALL_INTRO_CC,
    HALL_BOO_CC,
    HALL_FIRST_Q_CC,
    HALL_FIRST_CORRECT_CC,
    HALL_FIRST_WRONG_CC,
    HALL_SECOND_Q_CC,
    HALL_SECOND_CORRECT_CC,
    HALL_SECOND_WRONG_CC,
    HALL_BORED_CC,
    // Lava
    LAVA_LIGHT_PROMPT_CC,
    LAVA_ON_LIGHTS_CC,
    LAVA_TAB_PEOPLE_CC,
    LAVA_SPACES_PEOPLE_CC,
    LAVA_LAVA_CC,
    LAVA_RESPAWN_CC,
    LAVA_JUMP_CC,
    // Roof
    ROOF_INTRO_CC,
    ROOF_BUTTERFINGERS_CC,
    ROOF_DREAM_CC,
};
