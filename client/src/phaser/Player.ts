import Phaser from 'phaser';
import Character from './Character';
import { Direction } from './utils';

export class Player extends Character {
    constructor(config:{
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame: string | number,
        animKey: string,
        origin: {x: number, y: number} | undefined,
        depth?: number
      }) {
        super(config);
    }

    moveCharacter(direction: Direction | undefined): void {
        //console.log("player moveCharacter...")
        //if direction is undefined return
        if (direction === undefined) {
            return;
        }

        super.moveCharacter(direction);

        // Player specific animation
        switch (this._direction) {
            case Direction.DOWN:
            case Direction.LEFT:
            case Direction.RIGHT:
            case Direction.UP:
              if (
                !this.anims.isPlaying ||
                this.anims.currentAnim?.key !== `${this._animationKey}-${this._direction}`
              ) {
                //console.log("this._animationKey: ", this._animationKey)
                //console.log("this._direction: ", this._direction)
                this.play(`${this._animationKey}-${this._direction}`);
              }
              break;
            case Direction.NONE:
              break;
            default:
              // We should never reach this default case
              //exhaustiveGuard(this._direction);
        }
    }

}