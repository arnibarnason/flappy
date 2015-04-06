window.Obstacle = (function() {
	'use strict';

	var INITIALPOSITION = 110;
	var SPEED = 0.4;

	var Obstacle = function(el, game, start) {
		this.el = el;
		this.lower = this.el.find('.lower');
		this.upper = this.el.find('.upper');
		this.game = game;
		this.startPos = start;
		this.yHole = Math.floor((Math.random() * 300) + 10);
		this.pos = {x: 0, y: 0};
		this.holewidth = parseInt($('input[name="difficulty"]:checked').val());
	};

	Obstacle.prototype.reset = function() {
		this.pos.x = this.startPos;
		this.holewidth = parseInt($('input[name="difficulty"]:checked').val());
		this.yHole = Math.floor((Math.random() * 300) + 10);
		this.upper.css('height', this.yHole);
		this.lower.css('top', this.holewidth);
		this.lower.css('top', this.holewidth);
	};

	Obstacle.prototype.repeat = function() {
		this.pos.x = INITIALPOSITION;
		this.yHole = Math.floor((Math.random() * 300) + 10);
		this.upper.css('height', this.yHole);
		this.lower.css('top', this.holewidth);
		this.lower.css('top', this.holewidth);
	};

	Obstacle.prototype.onFrame = function() {
		if (this.pos.x < -10) {
			this.repeat();
		}
		this.pos.x -= SPEED;

		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + 0 + 'em, 0)');
	};

	return Obstacle;

})();