function Gameboard() {
	this.canvas = document.getElementById('gameBoard');
	this.ctx = this.canvas.getContext('2d');

	this.cleanCtx = function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
}