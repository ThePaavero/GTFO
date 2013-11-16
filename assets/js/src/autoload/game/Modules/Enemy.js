Game.Modules.Enemy = function(_canvas, _image) {

	var self = this;

	var canvas        = _canvas;
	var image         = _image;
	var context       = canvas.getContext('2d');
	var enemy_speed_x = 1;
	var enemy_speed_y = 1;
	var enemy_width   = 24;
	var enemy_height  = 36;

	var coords = {
		x: 0,
		y: 0
	};

	var heading_to_x = 0;
	var heading_to_y = 0;

	var following_interval = 1000;

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

		var x = target.getX();
		var y = target.getY();

		heading_to_x = x;
		heading_to_y = y;

		setTimeout(function()
		{
			self.followTarget();
		}, following_interval);
	};

	this.onFrame = function()
	{
		var target_x = heading_to_x;
		var target_y = heading_to_y;

		if(target_x < coords.x)
		{
			coords.x -= enemy_speed_x;
		}
		else if(target_x > coords.x)
		{
			coords.x += enemy_speed_x;
		}

		if(target_y < coords.y)
		{
			coords.y -= enemy_speed_y;
		}
		else if(target_y > coords.y)
		{
			coords.y += enemy_speed_y;
		}

		context.drawImage(image, 0, 0, enemy_width, enemy_height, coords.x, coords.y, enemy_width, enemy_height);
	};

};

Game.Modules.Enemy.prototype = Game.Modules.Character.prototype;
