Game.App = function() {

	var running = false;

	var canvas;
	var context;
	var images = [
		'assets/img/player_sprite.png'
	];

	var pixel_size    = 3;
	var player_width  = 30;
	var player_height = 30;

	var show_fps = true;

	var player_coords = {
		'idle' : { x: 0, y: 0 },
		'punch': { x: 76, y: 0 },
		'kick' : { x: 121, y: 0 }
	};

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

	var enemy_spawn_interval = 5000;

	this.init = function()
	{
		console.log('Game starting...');

		// Load images
		var loaded_images = 0;
		var image_count = images.length;
		for(var i in images)
		{
			var path = images[i];

			var img = new Image();
			img.src = path;
			img.onload = function()
			{
				loaded_images ++;
				console.log('Loaded image ' + loaded_images + ' of ' + image_count);
				if(loaded_images === image_count)
				{
					running = true;
				}
			};
		}

		doKeys();
		spawnEnemies();
	};

	this.setCanvas = function(_canvas)
	{
		canvas  = _canvas;
		context = canvas.getContext('2d');
	};

	this.onFrame = function()
	{
		if( ! running)
		{
			return;
		}

		resetCanvas();

		/* Game logic goes here */

		drawCanvas();

		if(show_fps)
		{
			var fps = countFPS();
			showFPS(fps);
		}
	};

	// -----------------------------------------------------------------------

	var resetCanvas = function()
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	var drawCanvas = function()
	{
		drawPlayer();
	};

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

		context.drawImage(getImage('player_sprite'), coord_x, coord_y, player_width, player_height, player_x, player_y, player_width, player_height);
	};

	// Stolen from http://stackoverflow.com/a/19775485
	var countFPS = (function () {
		var lastLoop = (new Date()).getMilliseconds();
		var count = 1;
		var fps = 0;

		return function () {
			var currentLoop = (new Date()).getMilliseconds();
			if (lastLoop > currentLoop) {
				fps = count;
				count = 1;
			} else {
				count += 1;
			}
			lastLoop = currentLoop;
			return fps;
		};
	}());

	var showFPS = function(fps)
	{
		$('#fps').html(fps + ' FPS');
	};

	var getImage = function(name)
	{
		var img = new Image();
		img.src = 'assets/img/' + name + '.png';
		return img;
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

		Mousetrap.bind('space', attack);
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
		if(player_action.attack === true)
		{
			return false;
		}

		if(player_move.right || player_move.left || player_move.up || player_move.down)
		{
			punch();
			return;
		}

		kick();
	};

	var punch = function()
	{
		clearTimeout(attack_stop_timeout);

		player_action.punch = true;
		player_x += (player_orientation_x === 'left' ? (pixel_size * 1) : (pixel_size * -3));

		attack_stop_timeout = setTimeout(function()
		{
			player_action.punch = false;
		}, 200);
	};

	var kick = function()
	{
		clearTimeout(attack_stop_timeout);

		player_action.kick = true;
		player_x += (player_orientation_x === 'left' ? (pixel_size * -1) : (pixel_size));

		attack_stop_timeout = setTimeout(function()
		{
			player_action.kick = false;
		}, 350);
	};

	var spawnEnemies = function()
	{
		setInterval(spawnEnemy, enemy_spawn_interval);
	};

	var spawnEnemy = function()
	{
		if(running === false)
		{
			return;
		}

		console.log('Spawning enemy');
	};

};
