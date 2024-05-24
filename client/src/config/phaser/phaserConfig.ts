import { Scene } from '@/phaser/Scene';

export const phaserConfig = {
    type: Phaser.AUTO,
    parent: "phaser-div",
    //backgroundColor: '#34222E',
    render: {
        antialias: false,
        transparent: true
    },
    width: 480,
    height: 480,
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    //     zoom: 1
    // },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0},
            debug: false
        }
    },
    scene: [Scene]
}