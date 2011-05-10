function Gameboard() {
	this.cells = [];
	
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

	this.getBlockType = function (blockCoordinates) {
		if (!(blockCoordinates instanceof Array)) throw 'WrongTypeArgument';

		return this.cells[blockCoordinates[1]][blockCoordinates[0]];
	}
	
	this.changeBlockType = function (blockCoordinates, newType)	{
		if (!(blockCoordinates instanceof Array)) throw 'WrongTypeArgument';
		
		this.cells[blockCoordinates[1]][blockCoordinates[0]] = newType;
	}
}

exports.mGameboard = Gameboard;