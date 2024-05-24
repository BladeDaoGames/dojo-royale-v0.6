import Phaser from 'phaser';
import { Direction } from './utils';

export class Controls {
    private scene: Phaser.Scene;
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private lockPlayerInput: boolean;
    private enterKey: Phaser.Input.Keyboard.Key | undefined;
    //private spaceKey: Phaser.Input.Keyboard.Key | undefined;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.cursorKeys = this.scene.input.keyboard?.createCursorKeys();
    this.enterKey = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //this.spaceKey = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.lockPlayerInput = false;
  }

  get isInputLocked(): boolean {
    return this.lockPlayerInput;
  }

  set lockInput(val: boolean) {
    this.lockPlayerInput = val;
  }

  wasEnterKeyPressed(): boolean {
    if (this.enterKey === undefined) {
      return false;
    }
    return Phaser.Input.Keyboard.JustDown(this.enterKey);
  }

  /**
   * @returns {boolean}
   */
  wasSpaceKeyPressed(): boolean {
    if (this.cursorKeys === undefined) {
      return false;
    }
    return Phaser.Input.Keyboard.JustDown(this.cursorKeys.space);
  }

  /**
   * @returns {boolean}
   */
  wasBackKeyPressed(): boolean {
    if (this.cursorKeys === undefined) {
      return false;
    }
    return Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift);
  }

  /**
   * @returns {Direction}
   */
  getDirectionKeyJustPressed(): Direction {
    if (this.cursorKeys === undefined) {
      return Direction.NONE;
    }
    let selectedDirection: Direction = Direction.NONE;
    if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)) {
      selectedDirection = Direction.LEFT;
    } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
      selectedDirection = Direction.RIGHT;
    } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
      selectedDirection = Direction.UP;
    } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
      selectedDirection = Direction.DOWN;
    }
    return selectedDirection;
  }

  /**
   * @returns {Direction}
   */
  getDirectionKeyPressedDown(): Direction {
    if (this.cursorKeys === undefined) {
      return Direction.NONE;
    }
    let selectedDirection: Direction = Direction.NONE;
    if (this.cursorKeys.left.isDown) {
      selectedDirection = Direction.LEFT;
      //console.log("left")
    } else if (this.cursorKeys.right.isDown) {
      selectedDirection = Direction.RIGHT;
      //console.log("right")
    } else if (this.cursorKeys.up.isDown) {
      selectedDirection = Direction.UP;
      //console.log("up")
    } else if (this.cursorKeys.down.isDown) {
      selectedDirection = Direction.DOWN;
      //console.log("down")
    }
    return selectedDirection;
  }
}