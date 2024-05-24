import Phaser from 'phaser';
import { animations } from '@/config/phaser/animations';
import { frame } from 'framer-motion';
const globalframeRate = 10;

export const createAnims = (anims: Phaser.Animations.AnimationManager) => {
    // anims.create({
    //     key: 'sc-down',
    //     frames: anims.generateFrameNames('straightC', {
    //         start: 0,
    //         end: 3,
    //         prefix: 'sc1(Down)',
    //         suffix: '.png'
    //     }),
    //     repeat: -1,
    //     frameRate: frameRate
    // });

    for (const [key, value] of Object.entries(animations)) {
        const { key: animKey, direction } = value;
        for (const [dir, config] of Object.entries(direction)) {
            const { start, end, prefix, suffix, repeat, frameRate } = config;
            anims.create({
                key: `${animKey}-${dir}`,
                frames: anims.generateFrameNames(key, {
                    start,
                    end,
                    prefix,
                    suffix
                }),
                repeat,
                frameRate: frameRate || globalframeRate
            });
        }
    }

}