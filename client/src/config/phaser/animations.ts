import { Direction } from '@/phaser/utils';
import { repeat } from 'rxjs';

export const animations = {
    'straightC': {
        key: "sc",
        direction: {
            ["IDLE"]: {
                start: 0,
                end: 3,
                prefix: 'sc1(Down)',
                suffix: '.png',
                repeat: -1,
                frameRate: 5,
            },
            [Direction.DOWN]: {
                start: 0,
                end: 3,
                prefix: 'sc1(Down)',
                suffix: '.png',
                repeat: -1,
                frameRate: 10,
            },
            [Direction.LEFT]: {
                start: 0,
                end: 3,
                prefix: 'sc1(Left)',
                suffix: '.png',
                repeat: -1,
                frameRate: 10,
            },
            [Direction.RIGHT]: {
                start: 0,
                end: 3,
                prefix: 'sc1(Right)',
                suffix: '.png',
                repeat: -1,
                frameRate: 10,
            },
            [Direction.UP]: {
                start: 0,
                end: 3,
                prefix: 'sc1(Up)',
                suffix: '.png',
                repeat: -1,
                frameRate: 10,
            },
        },

    },
};
