Game.Modules.Enemy = function(_canvas, _image) {

	var canvas = _canvas;
	var image = _image;
	var context = canvas.getContext('2d');

	var coords = {
		x: 0,
		y: 0
	};

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

		console.log(coords);
	};

	this.setTarget = function(_target)
	{
		target = _target;
	};

	this.followTarget = function()
	{
		//
	};

	this.onFrame = function()
	{
		//
	};

};
