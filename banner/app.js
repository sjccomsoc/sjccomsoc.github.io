function GameOfLife () {
 
	this.init = function (turns,width,height) {
		this.board = new Array(height);
		for (var x = 0; x < height; x++) {
			this.board[x] = new Array(width);
			for (var y = 0; y < width; y++) {
				this.board[x][y] = Math.round(Math.random());
			}
		}
		this.turns = turns;
	}
 
	this.nextGen = function() {
		this.boardNext = new Array(this.board.length);
		for (var i = 0; i < this.board.length; i++) {
			this.boardNext[i] = new Array(this.board[i].length);
		}
		for (var x = 0; x < this.board.length; x++) {
			for (var y = 0; y < this.board[x].length; y++) {
				var n = 0;
				for (var dx = -1; dx <= 1; dx++) {
					for (var dy = -1; dy <= 1; dy++) {
						if ( dx == 0 && dy == 0){}
						else if (typeof this.board[x+dx] !== 'undefined'
								&& typeof this.board[x+dx][y+dy] !== 'undefined'
								&& this.board[x+dx][y+dy]) {
							n++;
						}
					}	
				}
				var c = this.board[x][y];
				switch (n) {
					case 0:
					case 1:
						c = 0;
						break;
					case 2:
						break; 
					case 3:
						c = 1;
						break;
					default:
						c = 0;
				}
				this.boardNext[x][y] = c;
			}
		}
		this.board = this.boardNext.slice();
	}
 
	this.print = function(ctx,w,h) {
		if (!w)
			w = 8;
		if (!h)
			h = 8;
		for (var x = 0; x < this.board.length; x++) {
			var l = "";
			for (var y = 0; y < this.board[x].length; y++) {
				if (this.board[x][y])
				// x and y reversed to draw matrix like it looks in source
				// rather than the "actual" positions
					ctx.fillStyle = "orange";
				else
					ctx.fillStyle = "black";
				ctx.fillRect(y*h,x*w,h,w);
			}
		}
	}
 
	this.start = function(ctx,w,h) {
		for (var t = 0; t < this.turns; t++) {
			this.print(ctx,w,h);
			this.nextGen()
		}
	}
 
}

var loopi = 0
	
function init() {
	// Change document title and text under canvas
	document.title = "Computer Society 149th Open Day Stall";
	x = 50
	var c = new GameOfLife();
	//c.board = [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]];
	c.init(null,x,x);
 
	// Get canvas contexts or return 1
	c.canvas = document.getElementById('canvas');
	if (c.canvas.getContext) {
		c.ctx = c.canvas.getContext('2d');
	} else {
		return 1;
	}
	
	win = [window.innerWidth,window.innerHeight];
	
	if (win[0] < win[1]) {
		win = win[0]
	} else {
		win = win[1]
	}
	
	document.getElementById("canvas").width = Math.round(win*0.95)
	document.getElementById("canvas").height = Math.round(win*0.95)
	// Run main() at set interval
	setInterval(
		function(){
			run(c,c.ctx,Math.round(win*0.95/x),Math.round(win*0.95/x))
			loopi++
			if (loopi > Math.round(3*(Math.random()*100+80))) {
				loopi = 0
				location.reload()
			}
	},250);
	return 0;
}

/*function init() {
	// Change document title and text under canvas
	document.title = "Conway's Game of Life";
 
	// Setup game boards for Conway's Game of Life
	var blinker = new GameOfLife();
	blinker.board = [
		[0,1,0],
		[0,1,0],
		[0,1,0]];
 
	var glider = new GameOfLife();
	glider.board = [
		[0,0,0,0,0,0],
		[0,0,1,0,0,0],
		[0,0,0,1,0,0],
		[0,1,1,1,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0]];
 
	var random = new GameOfLife();
	random.init(null,8,8);
 
	// Get canvas contexts or return 1
	blinker.canvas = document.getElementById('blinker');
	glider.canvas = document.getElementById('glider');
	random.canvas = document.getElementById('random');
	if (blinker.canvas.getContext && glider.canvas.getContext && random.canvas.getContext) {
		blinker.ctx = blinker.canvas.getContext('2d');
		glider.ctx = glider.canvas.getContext('2d');
		random.ctx = random.canvas.getContext('2d');
	} else {
		return 1;
	}
 
 
	// Run main() at set interval
	setInterval(function(){run(glider,glider.ctx,25,25)},250);
	setInterval(function(){run(blinker,blinker.ctx,25,25)},250);
	setInterval(function(){run(random,random.ctx,25,25)},250);
	return 0;
}*/

function run(game,ctx,w,h) {
	game.print(ctx,w,h);
	game.nextGen()
		
	return 0;
}
 