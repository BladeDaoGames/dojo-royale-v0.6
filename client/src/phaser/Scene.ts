import Phaser from 'phaser';
import { SceneKeys, AssetKeys, MovementKeys } from '@/config/phaser';

export class Scene extends Phaser.Scene{
    static readonly SCALEFACTOR = 3;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined

    constructor(){
        super(SceneKeys.Scene1)
    }

    preload(){
        this.cursors = this?.input?.keyboard?.createCursorKeys();
        this.load.image(AssetKeys.BlackBlankTile, "/phaser/tiles/blacktile.png")
        this.load.tilemapTiledJSON(AssetKeys.BlankDuneMap, "/phaser/maps/blank-dune.json")
    }

    create(){
        //this.cursors = this.input.keyboard.createCursorKeys();
        const blankDuneTileMap = this.make.tilemap({key: AssetKeys.BlankDuneMap})
        blankDuneTileMap.addTilesetImage("blacktile", AssetKeys.BlackBlankTile)
        const layer = blankDuneTileMap.createLayer(0, "blacktile", 0,0)
    }

    update(t:number, d:number){
    }

}