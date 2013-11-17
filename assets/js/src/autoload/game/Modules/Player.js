Game.Modules.Player = function(_canvas, _image) {

	var canvas        = _canvas;
	var image         = _image;
	var context       = canvas.getContext('2d');
	var ok_to_get_hit = true;
	var ok_to_attack  = true;

	var godmode = false;

	var punch_callback;
	var kick_callback;

	var player_width  = 30;
	var player_height = 30;

	var pixel_size = Game.Settings.pixel_size;

	var player_coords = {
		'idle'   : { x: 0, y: 0 },
		'punch'  : { x: 76, y: 0 },
		'kick'   : { x: 121, y: 0 },
		'hurting': { x: 235, y: 0 }
	};

	var player_health = 4;

	var player_x = 100;
	var player_y = 80;

	var player_speed = {
		'up'   : 2,
		'down' : 2,
		'left' : 3,
		'right': 3
	};

	player_orientation_x = 'right';
	player_orientation_y = 'down';

	var player_move = {};
	player_move.left  = false;
	player_move.right = false;
	player_move.up    = false;
	player_move.down  = false;

	var player_action = {};
	player_action.attack = false;

	var blinking = false;
	var attack_stop_timeout;

	this.init = function()
	{
		this.blink();
		doKeys();
	};

	this.onFrame = function()
	{
		drawPlayer();
	};

	this.getX = function()
	{
		return player_x;
	};

	this.getY = function()
	{
		return player_y;
	};

	this.getWidth = function()
	{
		return player_width;
	};

	this.getHeight = function()
	{
		return player_height;
	};

	this.getHit = function(enemy_orientation_x)
	{
		if(ok_to_get_hit === false || godmode === true)
		{
			return;
		}

		player_health --;
		ok_to_get_hit = false;
		player_action.hurting = true;

		player_x += enemy_orientation_x === 'left' ? -20 : 20;

		setTimeout(function()
		{
			ok_to_get_hit = true;
			player_action.hurting = false;
		}, 500);
	};

	this.getHealth = function()
	{
		return player_health;
	};

	this.getOrientationX = function()
	{
		return player_orientation_x;
	};

	this.setOnPunchCallback = function(callback)
	{
		punch_callback = callback;
	};

	this.setOnKickCallback = function(callback)
	{
		kick_callback = callback;
	};

	// -----------------------------------------------------------------------

	var drawPlayer = function()
	{
		var left_wall = 0;
		if(player_x < left_wall)
		{
			player_x = left_wall;
			return;
		}

		var right_wall = canvas.width - player_width;
		if(player_x > right_wall)
		{
			player_x = right_wall;
			return;
		}

		var top_wall = 0;
		if(player_y < top_wall)
		{
			player_y = top_wall;
			return;
		}

		var bottom_wall = canvas.height - player_height;
		if(player_y > bottom_wall)
		{
			player_y = bottom_wall;
			return;
		}

		var state = 'idle';
		var idling = true;

		if(player_move.left)
		{
			player_x -= player_speed.left;
			idling = false;
		}
		if(player_move.right)
		{
			player_x += player_speed.right;
			idling = false;
		}
		if(player_move.up)
		{
			player_y -= player_speed.up;
			idling = false;
		}
		if(player_move.down)
		{
			player_y += player_speed.down;
			idling = false;
		}
		if(player_action.punch)
		{
			state = 'punch';
			idling = false;
		}
		if(player_action.kick)
		{
			state = 'kick';
			idling = false;
		}
		if(player_action.hurting)
		{
			state = 'hurting';
			idling = false;
		}

		var coord_x = player_coords[state].x;
		var coord_y = player_coords[state].y;

		if(player_orientation_x === 'right')
		{
			coord_y += 66;
		}

		// Blink?
		if( ! blinking)
		{
			if(state === 'idle' && idling && (Math.round(Math.random() * 100)) === 1)
			{
				coord_x = 39;
				blinking = true;
				setTimeout(function()
				{
					blinking = false;
				}, 200);
			}
		}
		else
		{
			coord_x = 39;
		}

		context.drawImage(image, coord_x, coord_y, player_width, player_height, player_x, player_y, player_width, player_height);
	};

	var doKeys = function()
	{
		Mousetrap.bind('a', moveLeft, 'keydown');
		Mousetrap.bind('a', stopLeft, 'keyup');

		Mousetrap.bind('d', moveRight, 'keydown');
		Mousetrap.bind('d', stopRight, 'keyup');

		Mousetrap.bind('w', moveUp, 'keydown');
		Mousetrap.bind('w', stopUp, 'keyup');

		Mousetrap.bind('s', moveDown, 'keydown');
		Mousetrap.bind('s', stopDown, 'keyup');

		Mousetrap.bind('space', attack, 'keydown');
		Mousetrap.bind('space', function()
		{
			ok_to_attack = true;
		}, 'keyup');
	};

	var moveLeft = function()
	{
		player_move.left = true;

		if(player_orientation_x === 'right')
		{
			player_orientation_x = 'left';
		}
	};

	var stopLeft = function()
	{
		player_move.left = false;
	};

	var moveRight = function()
	{
		if(player_x > canvas.width)
		{
			return;
		}

		player_move.right = true;

		if(player_orientation_x === 'left')
		{
			player_orientation_x = 'right';
		}
	};

	var stopRight = function()
	{
		player_move.right = false;
	};

	var moveUp = function()
	{
		player_move.up = true;
	};

	var stopUp = function()
	{
		player_move.up = false;
	};

	var moveDown = function()
	{
		player_move.down = true;
	};

	var stopDown = function()
	{
		player_move.down = false;
	};

	var attack = function()
	{
		if(ok_to_attack === false)
		{
			return;
		}

		ok_to_attack = false;

		if(player_move.right || player_move.left || player_move.up || player_move.down)
		{
			punch();
			return;
		}

		kick();
	};

	var punch = function()
	{
		player_action.punch = false;

		clearTimeout(attack_stop_timeout);

		player_action.kick = false;
		player_action.punch = true;

		attack_stop_timeout = setTimeout(function()
		{
			player_action.punch = false;
		}, 100);

		punch_callback();
	};

	var kick = function()
	{
		player_action.kick = false;

		clearTimeout(attack_stop_timeout);

		player_action.punch = false;
		player_action.kick = true;

		attack_stop_timeout = setTimeout(function()
		{
			player_action.kick = false;
		}, 100);

		kick_callback();
	};

};

Game.Modules.Player.prototype = Game.Modules.Character.prototype;
