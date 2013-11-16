Game.App = function() {

	var canvas;
	var context;
	var images = [
		'assets/img/player_sprite.png'
	];
	var running = false;

	var show_fps = true;

	var player_coords = {
		'idle' : { x: 0, y: 0 }
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

	player_move = {};
	player_move.left  = false;
	player_move.right = false;
	player_move.up    = false;
	player_move.down  = false;

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
		var width  = 30;
		var height = 30;

		var state = 'idle';

		if(player_move.left)
		{
			player_x -= player_speed.left;
		}
		if(player_move.right)
		{
			player_x += player_speed.right;
		}
		if(player_move.up)
		{
			player_y -= player_speed.up;
		}
		if(player_move.down)
		{
			player_y += player_speed.down;
		}

		var coord_x = player_coords[state].x;
		var coord_y = player_coords[state].y;

		if(player_orientation_x === 'left')
		{
			coord_y += 66;
		}

		context.drawImage(getImage('player_sprite'), coord_x, coord_y, width, height, player_x, player_y, width, height);
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
		Mousetrap.bind('left', moveLeft, 'keydown');
		Mousetrap.bind('left', stopLeft, 'keyup');

		Mousetrap.bind('right', moveRight, 'keydown');
		Mousetrap.bind('right', stopRight, 'keyup');

		Mousetrap.bind('up', moveUp, 'keydown');
		Mousetrap.bind('up', stopUp, 'keyup');

		Mousetrap.bind('down', moveDown, 'keydown');
		Mousetrap.bind('down', stopDown, 'keyup');
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

};
