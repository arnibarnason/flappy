window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var GRAVITY = 150;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var WAIT = true;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.velocity = 0;
		this.highScore = 0;
		this.score = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.velocity = 0;
		this.score = 0;
		$('#score').html(this.score);
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.space) {
			this.jump();
		}
		this.checkCollisionWithBounds();

		if (WAIT && (this.game.obstacle1.pos.x <= 30 && this.game.obstacle1.pos.x >= 28)) {
			this.score++;
			$('#score').html(this.score);
			WAIT = false;
			setTimeout(function () {WAIT = true;}, 3000);
		} else if (WAIT && (this.game.obstacle2.pos.x <= 30 && this.game.obstacle2.pos.x >= 28)){
			this.score++;
			$('#score').html(this.score);
			WAIT = false;
			setTimeout(function () {WAIT = true;}, 3000);
		}

		this.velocity += delta * GRAVITY;
		this.pos.y += delta * this.velocity;

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - 7) {

			if (this.score > this.highScore) {
				this.highScore = this.score;
				$('#highScore').html(this.highScore);
			}
			return this.game.gameover();
		}

		if (this.pos.x >= (this.game.obstacle1.pos.x - 5) &&
			this.pos.x <= (this.game.obstacle1.pos.x + 3)) {

			if ((this.pos.y < (this.game.obstacle1.yHole/10) ||
			this.pos.y > ((this.game.obstacle1.yHole + this.game.obstacle2.holewidth - HEIGHT*10)/10))){
				
				if (this.score > this.highScore) {
					this.highScore = this.score;
					$('#highScore').html(this.highScore);
				}
				return this.game.gameover();
			}
		}

		if (this.pos.x >= (this.game.obstacle2.pos.x - 5) &&
			this.pos.x <= (this.game.obstacle2.pos.x + 3)) {

			if ((this.pos.y < (this.game.obstacle2.yHole/10) ||
			this.pos.y > ((this.game.obstacle2.yHole + this.game.obstacle2.holewidth - HEIGHT*10)/10))){
					
				if (this.score > this.highScore) {
					this.highScore = this.score;
					$('#highScore').html(this.highScore);
				}
				return this.game.gameover();
			}
		}
	};

	Player.prototype.jump = function() {
		this.velocity = -45;
	};

	return Player;

})();
