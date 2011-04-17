function Gameboard() {
	this.cells = [];
	this.indestructible = new Image();
	this.indestructible.src = 'images/wall.png';
	this.floor = new Image();
	this.floor.src = 'images/sand.png';
	this.destructible = new Image();
	this.destructible.src = 'images/brick.png';
	
	this.canvas = document.getElementById('gameBoard');
	this.ctx = this.canvas.getContext('2d');
	
	this.cleanCtx = function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	this.build = function () {
		with (this)
		{
			/* Empty lines */
			for (var i = 0; i < 15; i++)
			{
				cells[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1];
			}
			
			/* Spawn points */
			cells[0 ][0 ] = cells[0 ][ 1] = cells[1][ 0] = 0;
			cells[0][14] = cells[0][13] = cells[1][14] = 0;
			cells[13][0] = cells[14][0] = cells[14][1] = 0;
			cells[14][13] = cells[13][14] = cells[14][14] = 0;
			
			/* Indestructible walls */
			for (var i = 0; i < 15; i++)
			{
				if (i % 2 == 1) /* Odd */
				{
					for (var j = 0; j < 15; j++)
					{
						if (j % 2 == 1) /* Odd */
						{
							cells[i][j] = 2;
						}
					}
				}
			}
		}
	}
	
	this.drawBoard = function () {
		for (var i = 0; i < 15; i++)
		{
			for (var j = 0; j < 15; j++)
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
					case 0:
						this.ctx.drawImage(this.floor, j * 40, i * 40, this.indestructible.width, this.indestructible.height);
						break;
					default:
						break;
				}
			}
		}
	}
}