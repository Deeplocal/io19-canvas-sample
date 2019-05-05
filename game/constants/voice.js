// ------------------- Office ------------------- //
const OFFICE_TIRED = {
    voice: 'Hey, you look really tired! Say "close my eyes" to take a nap',
    gender: '',
};

// ------------------- Jungle ------------------- //
const JUNGLE_START = {
    voice: 'What happened? It looks like we\'re in some sort of jungle<break time="2000ms" />',
    gender: '',
};

const JUNGLE_PICKUP = {
    voice: 'Hey! Look over there! A chainsaw on the ground! Just say "pick up the chainsaw" to use it.',
    gender: '',
};


const JUNGLE_BRUSH_CLEARED = {
    voice: 'Feels good to clear some brush instead of sitting at the computer all day...',
    gender: '',
};

// ------------------- Temple Gate ------------------- //
const TMPL_GATE_INTRO = {
    voice: 'It looks like a forgotten temple. There\'s some kind of mechanism on the door. Let\'s take a closer look.',
    gender: '',
};
const TMPL_GATE_PUZZLE = {
    voice: 'It looks like a word puzzle,<break time="500ms" />what does it say?',
    gender: '',
};
const TMPL_GATE_NOTHING_HAPPENS = {
    voice: 'Nothing happens, try something else.',
    gender: '',
};
const TMPL_GATE_TOUGH = {
    voice: 'That was a tough one!',
    gender: '',
};

// ------------------- Hallway ------------------- //
const HALL_INTRO = {
    voice: 'Uh oh, this guy doesn\'t look friendly! Too bad the door closed behind us. <break time="1500ms" />',
    gender: '',
};
const HALL_BOO = {
    voice: 'Boo!<break time="1000ms" />',
    gender: 'male',
};
const HALL_FIRST_Q = {
    voice: 'I am the ghost of irrelevant trivia. You may not pass unless you successfully answer my challenge.<break time="2000ms" />First question: how do you become an Android developer?',
    gender: 'male',
};
const HALL_FIRST_CORRECT = {
    voice: 'You must have done this before.',
    gender: 'male',
};
const HALL_FIRST_WRONG = {
    voice: 'Wrong! In Android you become a developer by tapping "build number" 7 times.',
    gender: 'male',

};
const HALL_SECOND_Q = {
    voice: 'Next question: how many software developers does it take to change a lightbulb?',
    gender: 'male',
};
const HALL_SECOND_CORRECT = {
    voice: 'Correct! Changing a lightbulb is a hardware issue.',
    gender: 'male',
};
const HALL_SECOND_WRONG = {
    voice: 'Wrong! The answer is zero, changing a lightbulb is a hardware issue.<break time="1000ms" />',
    gender: 'male',
};
const HALL_BORED = {
    voice: 'You bore me! I shall let you pass to save myself the trouble of speaking with you any further!',
    gender: 'male',
};

// ------------------- Lava Room ------------------- //
const LAVA_LIGHT_PROMPT = {
    voice: 'It\'s really dark in here, better turn on the lights.',
    gender: '',
};
const LAVA_ON_LIGHTS = {
    voice: 'Hey, that works here too! Nice!<break time="2500ms" />It looks like players who\'ve been here before us have weighed in on this eternal question. So,<break time="500ms" /> what do you say, tabs or spaces?',
    gender: '',
};
const LAVA_TAB_PEOPLE = {
    voice: 'Yeah totally, those tabs people are the worst!',
    gender: '',
};
const LAVA_SPACES_PEOPLE = {
    voice: 'Yeah totally, those spaces people are the worst!',
    gender: '',
};
const LAVA_LAVA = {
    voice: 'Uh oh, lava\' <break time="500ms" /> let\'s get out of here!',
    gender: '',
};
const LAVA_RESPAWN = {
    voice: 'Ouch! Good thing I had a quarter to respawn us. Let\'s try again.',
    gender: '',
};
const LAVA_JUMP = {
    voice: 'Phew! We made it!',
    gender: '',
};

// ------------------- Roof ------------------- //
const ROOF_INTRO = {
    voice: 'It looks like that artifact fell out of place. We better put it back. I\'ve seen a lot of movies, and I bet that\'s our way out of here!',
    gender: '',
};
const ROOF_BUTTERFINGERS = {
    voice: 'Butterfingers! You broke it! Uh oh, thats not good, we triggered an earthquake! I hope it doesn\'t last long.',
    gender: '',
};
const ROOF_DREAM = {
    voice: 'What? That was all a dream?? <break time="1500ms" />Bummer, I guess we better answer this email...',
    gender: '',
};
// ------------------- Common ------------------- //
const DAVE = {
    voice: 'Im sorry Dave, Im afraid I cant do that.',
    gender: '',
};

export {
    OFFICE_TIRED,
    DAVE,
    JUNGLE_START,
    JUNGLE_PICKUP,
    JUNGLE_BRUSH_CLEARED,
    TMPL_GATE_INTRO,
    TMPL_GATE_NOTHING_HAPPENS,
    TMPL_GATE_TOUGH,
    TMPL_GATE_PUZZLE,
    HALL_INTRO,
    HALL_BOO,
    HALL_FIRST_Q,
    HALL_FIRST_CORRECT,
    HALL_FIRST_WRONG,
    HALL_SECOND_Q,
    HALL_SECOND_CORRECT,
    HALL_SECOND_WRONG,
    HALL_BORED,
    LAVA_ON_LIGHTS,
    LAVA_LIGHT_PROMPT,
    LAVA_TAB_PEOPLE,
    LAVA_SPACES_PEOPLE,
    LAVA_LAVA,
    LAVA_RESPAWN,
    LAVA_JUMP,
    ROOF_INTRO,
    ROOF_BUTTERFINGERS,
    ROOF_DREAM,
};
