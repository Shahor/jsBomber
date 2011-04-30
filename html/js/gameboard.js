function Gameboard() {
	this.cellSize = 40;
	this.cells = [];
	this.indestructible = new Image();
	this.indestructible.src = 'images/wall.png';
	this.floor = new Image();
	this.floor.src = 'images/sand.png';
	this.destructible = new Image()
	this.destructible.src = 'images/brick.png';
	this.bomb = new Image();
	this.bomb.src = 'images/bomb.png';
	
	this.canvas = document.getElementById('gameBoard');
	this.ctx = this.canvas.getContext('2d');
	
	this.cleanCtx = function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	this.build = function () {
			/* Empty lines */
			for (var i = 0; i < 15; i++)
			{
				this.cells[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1];
			}
			
			/* Spawn points */
			this.cells[0][0] = this.cells[0][1] = this.cells[1][0] = 0;
			this.cells[0][14] = this.cells[0][13] = this.cells[1][14] = 0;
			this.cells[13][0] = this.cells[14][0] = this.cells[14][1] = 0;
			this.cells[14][13] = this.cells[13][14] = this.cells[14][14] = 0;
			
			/* Indestructible walls */
			for (var i = 0; i < 15; i++)
			{
				if (i % 2 == 1) /* Odd */
				{
					for (var j = 0; j < 15; j++)
					{
						if (j % 2 == 1) /* Odd */
						{
							this.cells[i][j] = 2;
						}
					}
				}
			}
	}
	
	this.drawBoard = function () {
		var yCellsNumber = (this.canvas.height / this.cellSize);
		var xCellsNumber = (this.canvas.width / this.cellSize);
		
		for (var i = 0; i < yCellsNumber; i++)
		{
			for (var j = 0; j < xCellsNumber; j++)
			{
				switch (this.cells[i][j])
				{
					
					/* Board is 600x600, sprites are 40x40 => 15 cells
					/* Block codes 
					0 = empty
					1 = destructible
					2 = indestructible
					3 = bonus
					4 = bomb
					*/
					case 1:
						this.ctx.drawImage(this.destructible, j * 40, i * 40, this.indestructible.width, this.indestructible.height);
						break;
					case 2:
						this.ctx.drawImage(this.indestructible, j * 40, i * 40, this.indestructible.width, this.indestructible.height);
						break;
					case 4:
						this.ctx.drawImage(this.bomb, j * 40, i * 40, this.indestructible.width, this.indestructible.height);
						break;	
					case 0:
						this.ctx.drawImage(this.floor, j * 40, i * 40, this.indestructible.width, this.indestructible.height);
						break;
					default:
						break;
				}
			}
		}
	}

	this.getBlockType = function (blockCoordinates) {
		if (!(blockCoordinates instanceof Array)) throw 'WrongTypeArgument';

		return this.cells[blockCoordinates[1]][blockCoordinates[0]];
	}
	
	this.changeBlockType = function (blockCoordinates, newType)
	{
		console.log("ENTERING CHANGE TYPE");
		if (!(blockCoordinates instanceof Array)) throw 'WrongTypeArgument';
		
		this.cells[blockCoordinates[1]][blockCoordinates[0]] = newType;
	}
}