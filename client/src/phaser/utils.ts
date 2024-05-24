import Phaser from 'phaser';

export enum Direction {
    LEFT = "LEFT",
    UP = "UP",
    RIGHT = "RIGHT",
    DOWN = "DOWN",
    NONE = "NONE"
}

export const getTargetPositionFromGameObjectPositionAndDirection = (
    position: Phaser.Math.Vector2, 
    direction: Direction,
    tileSize: number
) => {
    const { x, y } = position;
    switch (direction) {
        case Direction.UP:
            return new Phaser.Math.Vector2({ x, y: y - tileSize });
        case Direction.DOWN:
            return new Phaser.Math.Vector2({ x, y: y + tileSize });
        case Direction.LEFT:
            return new Phaser.Math.Vector2({ x: x - tileSize, y });
        case Direction.RIGHT:
            return new Phaser.Math.Vector2({ x: x + tileSize, y });
        default:
            return position;
    }
}