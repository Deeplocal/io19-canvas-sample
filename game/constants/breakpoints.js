const OFFICE = [
    {
        start: 0,
        duration: 4167,
        loop: true,
    },
    {
        start: 4167,
        duration: 2083,
        loop: false,
        id: 'office',
    },
    {
        start: 6250,
        duration: 4167,
        loop: false,
        id: 'intro',
    },
    {
        start: 10417,
        duration: 4167,
        loop: true,
    },
    {
        start: 14583,
        duration: 4167,
        loop: false,
    },
];

const JUNGLE = [
    {
        start: 0,
        duration: 4167,
        loop: false,
        id: 'entered',
    },
    {
        start: 4167,
        duration: 4167,
        loop: true,
    },
    {
        start: 8333,
        duration: 8333,
        loop: false,
        id: 'cleared',
    },
    {
        start: 16667,
        duration: 4167,
        loop: true,
    },
    {
        start: 20833,
        duration: 2083,
        loop: false,
    },
];

const TMPL_GATE = [
    {
        start: 0,
        duration: 4167,
        loop: false,
        id: 'intro',
    },
    {
        start: 4167,
        duration: 4167,
        loop: true,
    },
    {
        start: 8333,
        duration: 4167,
        loop: false,
        id: 'puzzle',
    },
    {
        start: 12500,
        duration: 4167,
        loop: true,
    },
    {
        start: 16667,
        duration: 4167,
        loop: false,
        id: 'gears',
    },
    {
        start: 20833,
        duration: 10416,
        loop: false,
    },
];

const HALL = [
    {
        start: 0,
        duration: 3000,
        loop: false,
        id: 'appear',
    },
    {
        start: 3000,
        duration: 1167,
        loop: false,
    },
    {
        start: 4167,
        duration: 4167,
        loop: true,
        skipshift: true,
    },
    {
        start: 8333,
        duration: 4167,
        loop: false,
        ignore: true,
        id: 'correct',
    },
    {
        start: 12500,
        duration: 4167,
        loop: false,
        ignore: true,
        id: 'incorrect',
    },
    {
        start: 16667,
        duration: 4167,
        loop: false,
    },
];

const LAVA = [
    {
        start: 0,
        duration: 4167,
        loop: true,
    },
    {
        start: 4167,
        duration: 2000,
        loop: false,
        id: 'lights_on',
    },
    {
        start: 6167,
        duration: 2167,
        loop: false,
    },
    {
        start: 8333,
        duration: 4167,
        loop: true,
    },
    {
        start: 12500,
        duration: 4167,
        loop: false,
        id: 'voted',
    },
    {
        start: 16667,
        duration: 4167,
        loop: true,
    },
    {
        start: 20833,
        duration: 10417,
        loop: false,
        ignore: true,
        id: 'cross',
    },
    {
        start: 31250,
        duration: 4167,
        loop: true,
        ignore: true,
        id: 'crossloop',
    },
    {
        start: 35417,
        duration: 5417,
        loop: false,
        ignore: true,
        id: 'jump',
    },
    {
        start: 40833,
        duration: 5417,
        loop: false,
        ignore: true,
        id: 'jumpbridge',
    },

];

const ROOF = [
    {
        start: 0,
        duration: 4167,
        loop: false,
        id: 'intro',
    },
    {
        start: 4167,
        duration: 4167,
        loop: true,
    },
    {
        start: 8333,
        duration: 3000,
        loop: false,
        id: 'inhand',
    },
    {
        start: 11333,
        duration: 3250,
        loop: false,
        id: 'broken',
    },
    {
        start: 14583,
        duration: 12834,
        loop: false,
        id: 'closed',
    },
    {
        start: 27417,
        duration: 10583,
        loop: false,
        id: 'game_over',
    },
    {
        start: 38000,
        duration: 12000,
        loop: false,
    },
];

export {
    OFFICE,
    JUNGLE,
    TMPL_GATE,
    HALL,
    LAVA,
    ROOF,
};
