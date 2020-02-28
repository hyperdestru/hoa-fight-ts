import { Input } from 'phaser';
import { Player } from '../prefabs/player';
import { GameMap } from '../prefabs/gameMap';


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: 'Game'
};


export class GameScene extends Phaser.Scene {
	
	private player1: Player;
	private player2: Player;
	private gameMap: GameMap;


	setColliders() {
		this.physics.add.collider(this.player1, this.player2);
		this.physics.add.collider( [this.player1, this.player2], this.gameMap.tiles);
	}


	constructor() {
		super(sceneConfig);
	}


	preload() {

		this.load.pack(
			"preload",
			"assets/pack.json",
			"preload"
		);
		
	}


	create() {

		this.gameMap = new GameMap( {scene: this} );

		this.player1 = new Player({
			scene: this,
			x: 150, 
			y: 300,
			key: 'player',
			controlKeys: {
				right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
				left: Phaser.Input.Keyboard.KeyCodes.LEFT,
				jump: Phaser.Input.Keyboard.KeyCodes.UP
			}
		});

		this.player2 = new Player({
			scene: this,
			x: 600,
			y: 400,
			key: 'player',
			controlKeys: {
				right: Phaser.Input.Keyboard.KeyCodes.D,
				left: Phaser.Input.Keyboard.KeyCodes.Q,
				jump: Phaser.Input.Keyboard.KeyCodes.SPACE
			}
		});

		this.setColliders();

	}

	update() {

		this.player1.update();
		this.player2.update();

	}
}
