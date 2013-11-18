
Game.Modules.Bomb = function(_canvas, _image, _data) {

	var self  = this;

	var spin_toggle  = true;
	var has_exploded = false;

	var canvas      = _canvas;
	var image       = _image;
	var context     = canvas.getContext('2d');
	var data        = _data;
	var bomb_x      = _data.from_x;
	var bomb_y      = _data.from_y;
	var speed       = 1;
	var bomb_width  = 12;
	var bomb_height = 1000;
	var bjoing      = 10;
	var bjoing_roof = false;
	var sprite_y    = bomb_height;
	var curve;

	this.init = function()
	{
		//
	};

	this.draw = function()
	{
		if( ! data)
		{
			console.log('WTF');
			return;
		}

		if(bomb_x < data.to_x)
		{
			bomb_x += speed;
		}
		else if(bomb_x > data.to_x)
		{
			bomb_x -= speed;
		}
		if(bomb_y < data.to_y)
		{
			bomb_y += speed;
		}
		else if(bomb_y > data.to_y)
		{
			bomb_y -= speed;
		}

		// Spin!
		spin_toggle = ! spin_toggle;

		var sprite_x = spin_toggle ? 0 : 16;

		context.drawImage(image, sprite_x, 0, bomb_width, bomb_height, bomb_x, bomb_y, bomb_width, bomb_height);

		if(bomb_x === data.to_x && bomb_y === data.to_y)
		{
			explode();
		}
	};

	this.hasExploded = function()
	{
		return has_exploded;
	};

	var explode = function()
	{
		// Check for hit, todo
		// Do animation, todo
		// Remove me
		has_exploded = true;
	};

};
