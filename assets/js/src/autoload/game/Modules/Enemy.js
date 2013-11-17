
Game.Modules.Enemy = function(_canvas, _image, _enemy_speed) {

	var self  = this;
	var alive = true;

	var canvas        = _canvas;
	var image         = _image;
	var context       = canvas.getContext('2d');
	var health        = 3;
	var enemy_speed = _enemy_speed;

	var enemy_speed_x_original = enemy_speed;
	var enemy_speed_x = enemy_speed_x_original;

	var enemy_speed_y_original = enemy_speed;
	var enemy_speed_y = enemy_speed_y_original;
	var enemy_orientation_x = 'right';

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
		var above_or_under = Math.round(Math.random()) === 0 ? 'above' : 'under';

		var x = Math.round((Math.random() * canvas.width));
		var y = 0;

		if(above_or_under === 'above')
		{
			y = Math.round((Math.random() * 30) * -1);
		}
		else
		{
			y = Math.round(Math.random() * 30) + canvas.height;
		}

		coords.x = x;
		coords.y = y;
	};

	this.setTarget = function(_target)
	{
		target = _target;
	};

	this.followTarget = function()
	{
		var x = target.getX();
		var y = target.getY();

		heading_to_x = x;
		heading_to_y = y;

		if(window.game_running === false)
		{
			return;
		}

		setTimeout(function()
		{
			self.followTarget();
		}, following_interval);
	};

	this.onFrame = function()
	{
		if(window.game_running && alive)
		{
			var target_x = heading_to_x;
			var target_y = heading_to_y;

			if(target_x < coords.x)
			{
				coords.x -= enemy_speed_x;
				enemy_orientation_x = 'left';
			}
			else if(target_x > coords.x)
			{
				coords.x += enemy_speed_x;
				enemy_orientation_x = 'right';
			}

			if(target_y < coords.y)
			{
				coords.y -= enemy_speed_y;
			}
			else if(target_y > coords.y)
			{
				coords.y += enemy_speed_y;
			}

			// Some jitter plz
			coords.x += randomFromInterval(-1, 1);
			coords.y += randomFromInterval(-1, 1);
		}

		var sprite_x = 0;
		var sprite_y = 0;

		if(enemy_orientation_x === 'left')
		{
			sprite_y = 48;
		}

		context.drawImage(image, sprite_x, sprite_y, enemy_width, enemy_height, coords.x, coords.y, enemy_width, enemy_height);

		checkForTargetHit();
	};

	this.getX = function()
	{
		return coords.x;
	};

	this.getY = function()
	{
		return coords.y;
	};

	this.getWidth = function()
	{
		return enemy_width;
	};

	this.getHeight = function()
	{
		return enemy_height;
	};

	this.getHealth = function()
	{
		return health;
	};

	this.getHit = function(player_orientation_x)
	{
		if( ! alive)
		{
			return;
		}

		health --;

		var bounce = player_orientation_x === 'left' ? -20 : 20;
		coords.x += bounce;

		setTimeout(function()
		{
			enemy_speed_x = enemy_speed_x_original;
			console.log('Speed X returned to original');
		}, 800);

		// Get stunned for a while
		alive = false;
		setTimeout(function()
		{
			alive = true;
		}, 300);
	};

	this.die = function()
	{
		sprite_x = 61;
		alive = false;
	};

	// -----------------------------------------------------------------------

	var checkForTargetHit = function()
	{
		var target_x = target.getX();
		var target_y = target.getY();

		var my_x = coords.x;
		var my_y = coords.y;

		if((my_x >= target_x && my_x <= target_x + target.getWidth()) && (my_y >= target_y && my_y <= target_y + target.getHeight()))
		{
			console.log('Player gets hit');
			target.getHit(enemy_orientation_x);
		}
	};

};

Game.Modules.Enemy.prototype = Game.Modules.Character.prototype;
