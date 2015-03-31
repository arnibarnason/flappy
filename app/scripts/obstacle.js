window.Obstacle = (function() {
	'use strict';

	var HOLEWIDTH = 100;
	var INITIALPOSITION = 110;
	var SPEED = 0.4;

	var Obstacle = function(el, game, start) {
		this.el = el;
		this.lower = this.el.find('.lower');
		this.upper = this.el.find('.upper');
		this.game = game;
		this.startPos = start;
		this.yHole = Math.floor((Math.random() * 450) + 10);
		this.pos = {x: 0, y: 0};
	};

	Obstacle.prototype.reset = function() {
		this.pos.x = this.startPos;
		this.upper.css('height', this.yHole);
		this.lower.css('top', HOLEWIDTH);
		this.lower.css('top', HOLEWIDTH);
	};

	Obstacle.prototype.repeat = function() {
		this.pos.x = INITIALPOSITION;
		this.yHole = Math.floor((Math.random() * 450) + 10);
		this.upper.css('height', this.yHole);
		this.lower.css('top', HOLEWIDTH);
		this.lower.css('top', HOLEWIDTH);
	};

	Obstacle.prototype.onFrame = function() {
		if (this.pos.x < -10) {
			this.repeat();
		}
		this.pos.x -= SPEED;

		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + 0 + 'em)');
	};

	return Obstacle;

})();