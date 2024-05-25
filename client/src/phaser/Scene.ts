import Phaser from 'phaser';
import { SceneKeys, AssetKeys, MovementKeys } from '@/config/phaser';
import {Player, Controls, Direction, PlayerWeb3Manager } from '.'
import { createAnims } from './animations';

export class Scene extends Phaser.Scene{
    static readonly SCALEFACTOR = 3;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    panSpeed: number;
    mapWidth: number;
    mapHeight: number;
    tileSize: number;
    #player: Player | undefined;
    #playerGroup: PlayerWeb3Manager | undefined;
    _controls: Controls | undefined;

    constructor(){
        super(SceneKeys.Scene1)
        this.panSpeed = 5;
        this.mapWidth = 13;
        this.mapHeight = 13;
        this.tileSize = 64;
    }

    preload(){
        //this.cursors = this?.input?.keyboard?.createCursorKeys();
        // this.load.image(AssetKeys.BlackBlankTile, "/phaser/tiles/blacktile.png")
        // this.load.tilemapTiledJSON(AssetKeys.BlankDuneMap, "/phaser/maps/blank-dune.json")
        

        // pillar
        this.load.spritesheet("pillar", "/phaser/sprites/pillar.png", {
            frameWidth: 64,
            frameHeight: 88
        })

        this.load.atlas("straightC", "/phaser/sprites/sc1.png", "/phaser/sprites/sc1.json")
    }

    create(){
        //this.cursors = this.input.keyboard.createCursorKeys();
        // const blankDuneTileMap = this.make.tilemap({
        //     key: AssetKeys.BlankDuneMap,
        // })
        const mapWidth = this.mapWidth
        const mapHeight = this.mapHeight
        const tileSize = this.tileSize
        createAnims(this.anims)
        this._controls = new Controls(this);
    
        // Set the world bounds to match the map size
        this.physics.world.setBounds(0, 0, mapWidth * tileSize, mapHeight * tileSize);
    
        const blankDuneTileMap = this.make.tilemap({
            //key: AssetKeys.BlankDuneMap,
            width: mapWidth,
            height: mapHeight,
            tileWidth: tileSize,
            tileHeight: tileSize
        })

        // add image onto the tilemap
        //const tileset = blankDuneTileMap?.addTilesetImage("blacktile", AssetKeys.BlackBlankTile)

        //const layer = blankDuneTileMap.createLayer("MovementLayer", "blacktile", 0,0)
        const tileset = blankDuneTileMap.addTilesetImage("tiles", "tiles", tileSize, tileSize);
        const layer = blankDuneTileMap.createBlankLayer("Layer 1", tileset as Phaser.Tilemaps.Tileset);
        layer?.fill(0)//.setOrigin(0.5, 1);

        // console.log(layer?.tileToWorldXY(0, 0))
        // console.log(layer?.tileToWorldXY(14, 14))
        

        // Create a group to hold the sprites
        const pillarGroup = this.physics.add.staticGroup();
        // add pillars (voted bomberman mapsize is 17x15. We do 17x17 here)
        // place 1 pillar seperated by 1 tile starting from 1,1
        // (add them into an array)
        const pillar1 = this.add.sprite(0.5*tileSize, tileSize, "pillar").setOrigin(0.5, 1)
        const pillar2 = this.add.sprite(
            tileSize*(mapWidth-0.5), 
            tileSize*mapHeight, "pillar").setOrigin(0.5, 1)
        

        for (let i = 1; i < mapWidth; i+=2){
            for (let j = 1; j < mapHeight; j+=2){
                pillarGroup.create(i*64+(tileSize/2), j*64+tileSize, "pillar").setOrigin(0.5, 1)
            }
        }
        //const player = this.add.sprite(tileSize*3/2, tileSize*(mapHeight-1)+(tileSize/2), "straightC").setOrigin(0.5, 0.5).setScale(0.8)
        // this.#player = new Player({
        //     scene:this, x:64+32, y:128+32, texture:"straightC", frame:"sc1(Down)0.png",
        //     animKey: "sc", origin: {x:0.5, y:0.5},
        // }).setScale(0.8)
        //this.add.existing(player2);
        this.#playerGroup = new PlayerWeb3Manager({
            scene:this, x:64+32, y:128+32, texture:"straightC", frame:"sc1(Down)0.png",
            animKey: "sc", origin: {x:0.5, y:0.5},
            scale: 0.8, shadowAlpha: 0.5
        })
        this.#player = this.#playerGroup.getPlayer();

        // Set the camera bounds to match the world bounds
        this.cameras.main.setBounds(0, 0, mapWidth * tileSize, mapHeight * tileSize);
        // Scale the game to fit the canvas
        const scaleX = Number(this.sys.game.config.width) / (mapWidth * tileSize);
        const scaleY = Number(this.sys.game.config.height) / (mapHeight * tileSize);
        const scale = Math.min(scaleX, scaleY);
        this.cameras.main.setZoom(scale);
    }   

    update(t:number, d:number){
        const wasSpaceKeyPressed = this?._controls?.wasSpaceKeyPressed();
        if (wasSpaceKeyPressed) {
            //console.log("Space key was pressed");
        }
        const selectedDirectionHeldDown = this?._controls?.getDirectionKeyPressedDown();
        const selectedDirectionPressedOnce = this?._controls?.getDirectionKeyJustPressed();

        if (selectedDirectionHeldDown !== Direction.NONE && !this._controls?.isInputLocked) {
            //console.log("moving player...")
            //this.#player?.moveCharacter(selectedDirectionHeldDown);
            this.#playerGroup?.moveCharacter(selectedDirectionHeldDown);
        }
        this.#playerGroup?.update();
        
            // For panning camera using arrow keys
            // Check for arrow key presses and update camera position
            // if (this?.cursors?.left.isDown) {
            //     this.cameras.main.scrollX -= this.panSpeed;
            // } else if (this.cursors?.right.isDown) {
            //     this.cameras.main.scrollX += this.panSpeed;
            // }
        
            // if (this.cursors?.up.isDown) {
            //     this.cameras.main.scrollY -= this.panSpeed;
            // } else if (this.cursors?.down.isDown) {
            //     this.cameras.main.scrollY += this.panSpeed;
            // }
    }

}