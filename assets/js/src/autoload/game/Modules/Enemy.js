Game.Modules.Enemy = function(_canvas, _image) {

	var self = this;

	var canvas = _canvas;
	var image = _image;
	var context = canvas.getContext('2d');

	var coords = {
		x: 0,
		y: 0
	};

	var following_interval = 4000;

	var target;

	this.init = function()
	{
		//
	};

	this.spawnRandomOutside = function()
	{
		var x = Math.round((Math.random() * 30) * -1);
		var y = Math.round((Math.random() * 30) * -1);

		coords.x = x;
		coords.y = y;
	};

	this.setTarget = function(_target)
	{
		target = _target;
	};

	this.followTarget = function()
	{
		console.log('Enemy refollowing target');
		// TODO

		setTimeout(function()
		{
			self.followTarget();
		}, following_interval);
	};

	this.onFrame = function()
	{
		//
	};

};

Game.Modules.Enemy.prototype = Game.Modules.Character.prototype;
