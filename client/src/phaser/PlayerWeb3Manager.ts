import Phaser from 'phaser';
import { Player, Direction,
    getTargetPositionFromGameObjectPositionAndDirection
 } from '.';

export class PlayerWeb3Manager {
    _player: Player | undefined;
    _shadow: Player | undefined;
    _scene: Phaser.Scene | undefined;

    _targetPosition: Phaser.Math.Vector2;
    _previousPosition: Phaser.Math.Vector2;

     _moveIntentSet: boolean = false;
    // _executingMoveIntent: boolean = false;
    _shadowIsMoving: boolean = false;
    _playerIsMoving: boolean = false;
    _direction: Direction = Direction.NONE;

    constructor(config:{
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame: string | number,
        animKey: string,
        origin: {x: number, y: number} | undefined,
        depth?: number
        scale?: number
        shadowAlpha?: number
      }){
        this._scene = config.scene;
        this._player = new Player(config);
        this._shadow = new Player({...config, depth: config?.depth ? config.depth-1:-2})
            .setAlpha(config.shadowAlpha ? config.shadowAlpha : 0.5)
            ;
        this._targetPosition = new Phaser.Math.Vector2(config.x, config.y);
        this._previousPosition = new Phaser.Math.Vector2(config.x, config.y);
        

    }

    moveCharacter(direction: Direction | undefined): void {
        if (direction === undefined) {
            return;
        }
        
        // set target position for player and shadow
        const targetPosition= getTargetPositionFromGameObjectPositionAndDirection(
            this._previousPosition, direction, this?._scene?.tileSize);
            
        // if the targetPosition is not the same as the current targetPosition
        // and the moveIntentSet is false
        // then update the targetPosition and direction
        if (targetPosition.x !== this._targetPosition.x || targetPosition.y !== this._targetPosition.y)
            if (!this._moveIntentSet){
                this._moveIntentSet = true;
                this._targetPosition = targetPosition.clone();
                this._direction = direction;
            }        
    }
    

    update(){
        
        // if the moveIntent is not set
        // then return
        if (!this._moveIntentSet){
            return;
        }

        // the shadow moves first and end at the target position
        // after shadow has moved then player moves to the end point

        // if shadow is not at the target position
        // then move shadow first
        if (this._shadow?.x !== this._targetPosition.x || this._shadow?.y !== this._targetPosition.y){
            this._shadowIsMoving = true;
            this._shadow?.moveCharacter(this._direction);
        }

        if (this._shadow?.x === this._targetPosition.x && this._shadow?.y === this._targetPosition.y){
            this._shadowIsMoving = false;
        }
        

        // THIS PART MOVES REAL PLAYER AFTER SHADOW HAS MOVED TO SHOW INTENT
    
        // if shadow is at the target position and player is not at the target position
        // then move player
        if (this._shadow?.x === this._targetPosition.x && this._shadow?.y === this._targetPosition.y && !this._shadowIsMoving && (
            this._player?.x !== this._targetPosition.x || this._player?.y !== this._targetPosition.y)
        ){
            this._playerIsMoving = true;
            this._player?.moveCharacter(this._direction);
        }

        if (this._player?.x === this._targetPosition.x && this._player?.y === this._targetPosition.y){
            this._playerIsMoving = false;
        }

        // if player is at the target position
        // then update the previous position to the target position
        // and set the target position to the current position
        if (this._player?.x === this._targetPosition.x && this._player?.y === this._targetPosition.y && !this._playerIsMoving){
            this._previousPosition = new Phaser.Math.Vector2(this._player.x, this._player.y);
            this._targetPosition = new Phaser.Math.Vector2(this._player.x, this._player.y);
            this._shadow?.setPosition(this._player.x, this._player.y);
            this._moveIntentSet = false;
        }
    }

    getPlayer(){
        return this._player;
    }

    getShadow(){
        return this._shadow;
    }
}