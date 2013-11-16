Game.App = function() {

	var running = false;
	var canvas;
	var context;
	var images = [
		'assets/img/player_sprite.png',
		'assets/img/heart.png'
	];
	var pixel_size = Game.Settings.pixel_size;
	var show_fps = true;
	var enemy_spawn_interval = 5000;
	var player;

	var player_health = 5;

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
					var player_image = new Image();
					player_image.src = images[0];
					player = new Game.Modules.Player(canvas, player_image);
					player.init();
				}
			};
		}

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
		player.onFrame();
		drawHealth();
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

		var enemy = new Game.Modules.Enemy();
		// enemy.spawnRandomOutside();
		// enemy.locatePlayer();
		// enemy.followPlayer();

		console.log('Spawning enemy');
	};

	var drawHealth = function()
	{
		var heart_x = 10;
		var heart_y = 10;
		var hearts = player_health;
		while(hearts --)
		{
			context.drawImage(getImage('heart'), 0, 0, 28, 28, heart_x, heart_y, 28, 28);
			heart_x += 35;
		}
	};

};
