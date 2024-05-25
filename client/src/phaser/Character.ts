import Phaser from 'phaser';
import { Direction, getTargetPositionFromGameObjectPositionAndDirection } from './utils';

export default class Character extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;
    //_phaserGameObject: Phaser.GameObjects.Sprite;
    _direction: Direction;
    _isMoving: boolean = false;
    _targetPosition: Phaser.Math.Vector2;
    _previousTargetPosition: Phaser.Math.Vector2;
    _spriteGridMovementFinishedCallback!: Function;
    _idleFrameConfig: string | number | undefined;
    _origin!: {x: number, y: number};
    _animationKey!: string;
    //_collisionLayer
    //_otherCharactersToCheckForCollisionsWith
    _spriteChangedDirectionCallback!: Function;
    //_objectsToCheckForCollisionsWith;

    constructor(config:{
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame: string | number,
        animKey: string,
        origin: {x: number, y: number} | undefined,
        depth?: number,
        scale?: number
        shadowAlpha?: number
      }) 
    {
        super(config.scene, config.x, config.y, config.texture, config.frame);
        this.setDepth(config.depth ? config.depth : -1)
        this.setScale(config.scale ? config.scale : 1)
        this.scene = config.scene;
        this.scene.add.existing(this);
        this._origin = config.origin ? { ...config.origin } : { x: 0.5, y: 0.5 };
        this._animationKey = config.animKey;
        this._idleFrameConfig=config.frame
        this._direction = Direction.NONE;
        this._targetPosition = new Phaser.Math.Vector2(config.x, config.y);
        this._previousTargetPosition = new Phaser.Math.Vector2(config.x, config.y);
        this._isMoving = false;
        this.play(`${this._animationKey}-IDLE`);

        // this._phaserGameObject = this.scene.add
        // .sprite(config.position.x, config.position.y, config.assetKey, this._getIdleFrame())
        // .setOrigin(this._origin.x, this._origin.y);

        // this.scene.add.existing(this);
        // this.scene.physics.world.enable(this as any);
    }

    get isMoving(){
        return this._isMoving;
    }

    get direction() {
        return this._direction;
    }

    moveCharacter(direction: Direction) {
      //console.log("character moveCharacter...")
        if (this._isMoving) {
          //console.log("isMoving true...")
          return;
        }
        this._moveSprite(direction);
    }

    _moveSprite(direction: Direction) {
        //console.log("moving sprite..")
        const changedDirection = this._direction !== direction;
        this._direction = direction;
    
        if (changedDirection) {
          if (this._spriteChangedDirectionCallback !== undefined) {
            this._spriteChangedDirectionCallback();
          }
        }
        
        // if hit blocking tile then dont do anything
        if (this._isBlockingTile()) {
          //console.log("hit blocking tile...")
          return;
        }
    
        this._isMoving = true; // to lock movement until tween is done
        this.#handleSpriteMovement();
    }

    update(){
      if (this._isMoving) {
        return;
      }
  
      // stop current animation and show idle frame
      const idleFrame = this.anims.currentAnim?.frames[1].frame.name;
      this.anims.stop();
      if (!idleFrame) {
        return;
      }
      switch (this._direction) {
        case Direction.DOWN:
        case Direction.LEFT:
        case Direction.RIGHT:
        case Direction.UP:
          this.setFrame(idleFrame);
          this.play(`${this._animationKey}-IDLE`);
          break;
        case Direction.NONE:
          break;
        default:
          // We should never reach this default case
          //exhaustiveGuard(this._direction);
      }
    }

    _isBlockingTile() {
        if (this._direction === Direction.NONE) {
          return false;
        }
    
        const targetPosition = this._targetPosition.clone();
        const updatedPosition = getTargetPositionFromGameObjectPositionAndDirection(targetPosition, this._direction, this.scene.tileSize);
    
        return (
          this.#doesPositionCollideWithCollisionLayer(updatedPosition) ||
          this.#doesPositionCollideWithOtherCharacter(updatedPosition) ||
          this.#doesPositionCollideWithObject(updatedPosition)
        );
    }

    // main function to move the character
    #handleSpriteMovement() {
      // console.log("handling sprite movement...")
      // console.log("current x is: ", this.x)
      // console.log("current y is: ", this.y)

      if (this._direction === Direction.NONE) {
        //console.log("direction is none... returning...")
        return;
      }
  
      const updatedPosition = getTargetPositionFromGameObjectPositionAndDirection(
        this._targetPosition, this._direction, this.scene.tileSize);

      this._previousTargetPosition = this._targetPosition.clone();
      this._targetPosition.x = updatedPosition.x;
      this._targetPosition.y = updatedPosition.y;
      
      this.scene.add.tween({
        delay: 0,
        duration: 600,
        y: {
          from: this.y,
          start: this.y,
          to: this._targetPosition.y,
        },
        x: {
          from: this.x,
          start: this.x,
          to: this._targetPosition.x,
        },
        targets: this,
        
        onComplete: () => {
          this._isMoving = false;
          this._previousTargetPosition = this._targetPosition.clone();
          if (this._spriteGridMovementFinishedCallback) {
            this._spriteGridMovementFinishedCallback();
          }
        },
      });
    }

    #doesPositionCollideWithCollisionLayer(position: Direction) {
        // if (!this._collisionLayer) {
        //   return false;
        // }
    
        // const { x, y } = position;
        // const tile = this._collisionLayer.getTileAtWorldXY(x, y, true);
    
        // return tile.index !== -1;
        return false;
      }
    
    
    #doesPositionCollideWithOtherCharacter(position: Direction) {
        // const { x, y } = position;
        // if (this._otherCharactersToCheckForCollisionsWith.length === 0) {
        //   return false;
        // }
    
        // // checks if the new position that this character wants to move to is the same position that another
        // // character is currently at, or was previously at and is moving towards currently
        // const collidesWithACharacter = this._otherCharactersToCheckForCollisionsWith.some((character) => {
        //   return (
        //     (character._targetPosition.x === x && character._targetPosition.y === y) ||
        //     (character._previousTargetPosition.x === x && character._previousTargetPosition.y === y)
        //   );
        // });
        // return collidesWithACharacter;
        return false;
      }
    
    
    #doesPositionCollideWithObject(position: Direction) {
        // const { x, y } = position;
        // if (this._objectsToCheckForCollisionsWith.length === 0) {
        //   return false;
        // }
    
        // const collidesWithObject = this._objectsToCheckForCollisionsWith.some((object) => {
        //   return object.position.x === x && object.position.y === y;
        // });
        // return collidesWithObject;
        return false;
    }
}