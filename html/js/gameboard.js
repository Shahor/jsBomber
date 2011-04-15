function Gameboard() {
	this.indestructible = new Image();
	this.indestructible.src = 'images/wall.png';
	/* Board is 600x600, sprites are 40x40 => 15 cells
	/* Block codes 
	0 = empty
	1 = destructible
	2 = indestructible
	3 = bonus
	4 = bomb
	*/
	this.canvas = document.getElementById('gameBoard');
	this.ctx = this.canvas.getContext('2d');

	this.cleanCtx = function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	this.drawBoard = function () {
		this.drawIndestructibleWalls();
	}
	
	this.drawIndestructibleWalls = function() {
		for (var i = 0; i < 15; i++)
		{
			if (i % 2 == 1) /* Odd */
			{
				for (var j = 0; j < 15; j++)
				{
					if (j % 2 == 1) /* Odd */
					{
						this.ctx.drawImage(this.indestructible, j * 40, i * 40, this.indestructible.width, this.indestructible.height);
					}
				}
			} 
		}
	}
}