export class GameMap {

	private grid:string[];
	private rawGrid;
	private tileWidth:number;
	private tileHeight:number;
	public tiles:Phaser.Physics.Arcade.Group;

	loadStrings(file:string) {
		let rawFile = new XMLHttpRequest();
		let result;

		rawFile.onerror = function() {
			console.log("Impossible de charger le niveau");
		}

		rawFile.onreadystatechange = function() {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status === 0) {
					result = rawFile.responseText;
				}
			}
		}

		rawFile.open("GET", file, false);
		rawFile.send(null);

		return result;
	}

	constructor(params) {

		this.rawGrid = this.loadStrings('assets/levels/level1.txt');
		this.grid = this.rawGrid.split('\n').map(item => item.split(''));
		
		this.tileWidth = 32;
		this.tileHeight = 32;
		this.tiles = params.scene.physics.add.staticGroup();

		for (let line = 0; line < this.grid.length; line++) {

			for (let col = 0; col < this.grid[line].length; col++) {

				if (this.grid[line][col] !== '0') {

					this.tiles.create(
						col * this.tileWidth + (this.tileWidth / 2), 
						line * this.tileHeight - (this.tileHeight / 2), 
						'ground'
					);

				}
			}
		}
	}
}