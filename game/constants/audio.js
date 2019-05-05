// -- Local assets -- //
import START_AMBIENT from '../sounds/2-JUNGLE-ambient-loop_01.mp3';
import OFFICE_AMBIENT from '../sounds/1-OFFICE-office-murmer-loop_02.mp3';
import OFFICE_YAWN from '../sounds/1-OFFICE-yawn-oneshot_01.mp3';

import JUNGLE_AMBIENT from '../sounds/2-JUNGLE-ambient-loop_01.mp3';
import JUNGLE_CHAINSAW from '../sounds/2-JUNGLE-chainsaw-cut-oneshot_02.mp3';

import TEMPLE_AMBIENT from '../sounds/2-JUNGLE-ambient-loop_01.mp3';
import TEMPLE_DOOR from '../sounds/3-TEMPLE-door-creaking-open-oneshot_01.mp3';
import TEMPLE_HUM from '../sounds/3-TEMPLE-dramatic-drone-oneshot_02.mp3';
import TEMPLE_GEARS from '../sounds/3-TEMPLE-gears-crunching-oneshot_01.mp3';

import HALL_AMBIENT from '../sounds/4-HALL-ambient-loop_01.mp3';
import HALL_DOOR from '../sounds/4-HALL-door-slam-shut-oneshot_01.mp3';
import HALL_GHOST_APPEAR from '../sounds/4-HALL-ghost-appear-oneshot_01.mp3';
import HALL_GHOST_DISAPPEAR from '../sounds/4-HALL-ghost-disappear-oneshot_01.mp3';

import LAVA_AMBIENT from '../sounds/5-LAVA-ambient-loop_01.mp3';
import LAVA_BRIDGE from '../sounds/5-LAVA-bridge-collapse-oneshot_01.mp3';
import LAVA_LAVA_AMBIENT from '../sounds/5-LAVA-lava-ambient-loop_01.mp3';
import LAVA_STONE from '../sounds/5-LAVA-stone-dust-puff-oneshot_01.mp3';
import LAVA_TORCHES from '../sounds/5-LAVA-torches_01.mp3';

import ROOF_AMBIENT from '../sounds/6-ROOF-ambient-loop_01.mp3';
import ROOF_EARTHQUAKE from '../sounds/6-ROOF-earthquake-oneshot_01.mp3';
import ROOF_SHATER from '../sounds/6-ROOF-pottery-shatter-oneshot_01.mp3';
import ROOF_GAME_OVER from '../sounds/game_over.mp3';

const OFFICE_AUDIO = [
    {
        src: START_AMBIENT,
        loop: true,
    },
    {
        src: OFFICE_AMBIENT,
        loop: true,
    },
    {
        src: OFFICE_YAWN,
        loop: false,
    },
];

const JUNGLE_AUDIO = [
    {
        src: JUNGLE_AMBIENT,
        loop: true,
    },
    {
        src: JUNGLE_CHAINSAW,
        loop: false,
    },
    {
        src: JUNGLE_AMBIENT,
        loop: true,
    },
];

const TEMPLE_AUDIO = [
    {
        src: TEMPLE_AMBIENT,
        loop: true,
    },
    {
        src: TEMPLE_GEARS,
        loop: false,
    },
    {
        src: TEMPLE_DOOR,
        loop: false,
    },
    {
        src: TEMPLE_AMBIENT,
        loop: true,
    },
    {
        src: TEMPLE_HUM,
        loop: true,
    },
];

const HALL_AUDIO = [
    {
        src: HALL_GHOST_APPEAR,
        loop: false,
    },
    {
        src: HALL_AMBIENT,
        loop: true,
        muted: true,
    },
    {
        src: HALL_DOOR,
        loop: false,
    },
    {
        src: HALL_AMBIENT,
        loop: true,
        muted: true,
    },
    {
        src: HALL_GHOST_DISAPPEAR,
        loop: false,
    },
    {
        src: HALL_AMBIENT,
        loop: true,
        muted: true,
    },
];

const LAVA_AUDIO = [
    {
        src: LAVA_AMBIENT,
        loop: true,
    },
    {
        src: LAVA_TORCHES,
        loop: true,
    },
    {
        src: LAVA_STONE,
        loop: false,
    },
    {
        src: LAVA_LAVA_AMBIENT,
        loop: true,
    },
    {
        src: LAVA_BRIDGE,
        loop: false,
    },
    {
        src: LAVA_LAVA_AMBIENT,
        loop: true,
    },
];

const ROOF_AUDIO = [
    {
        src: ROOF_AMBIENT,
        loop: true,
    },
    {
        src: ROOF_SHATER,
        loop: false,
    },
    {
        src: ROOF_AMBIENT,
        loop: true,
    },
    {
        src: ROOF_EARTHQUAKE,
        loop: true,
    },
    {
        src: OFFICE_AMBIENT,
        loop: true,
    },
    {
        src: ROOF_GAME_OVER,
        loop: false,
    },
];


export {
    OFFICE_AUDIO,
    JUNGLE_AUDIO,
    TEMPLE_AUDIO,
    HALL_AUDIO,
    LAVA_AUDIO,
    ROOF_AUDIO,
};
