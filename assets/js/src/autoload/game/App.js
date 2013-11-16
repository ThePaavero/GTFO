Game.App = function() {

	var running = false;
	var canvas;
	var context;
	var images = [
		'assets/img/splash.png',
		'assets/img/player_sprite.png',
		'assets/img/enemy_sprite.png',
		'assets/img/heart.png'
	];
	var pixel_size           = Game.Settings.pixel_size;
	var show_fps             = true;
	var enemy_spawn_interval = 5000;
	var player;
	var enemies              = [];

	var player_health = 0;

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
					startGame();
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

		player.onFrame();

		for(var i in enemies)
		{
			enemies[i].onFrame();
		}

		if(player.getHealth() < 1)
		{
			gameOver();
			return false;
		}

		drawHealth();

		window.game_running = running;

		if(show_fps)
		{
			var fps = countFPS();
			showFPS(fps);
		}
	};

	// -----------------------------------------------------------------------


	var startGame = function()
	{
		context.drawImage(getImage('splash'), 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

		Mousetrap.bind('space', function()
		{
			Mousetrap.unbind('space');

			running = true;
			player = new Game.Modules.Player(canvas, getImage('player_sprite'));
			player.init();
			player.setOnPunchCallback(playerPunch);
			player.setOnKickCallback(playerKick);
		});
	};

	var playerPunch = function()
	{
		playerKick(); // :P
	};

	var playerKick = function()
	{
		var foot_reach = 10;

		var player_x = player.getX();
		var player_y = player.getY();

		var player_orientation_x = player.getOrientationX();

		// Any enemies getting hit?
		for(var i in enemies)
		{
			var enemy_x      = enemies[i].getX();
			var enemy_y      = enemies[i].getY();
			var enemy_width  = enemies[i].getWidth();
			var enemy_height = enemies[i].getHeight();

			var offset = player_orientation_x === 'left' ? -10 : 10;

			if(((player_x + foot_reach) >= enemy_x && player_x + foot_reach <= (enemy_x + enemy_width)) && (player_y <= enemy_y + enemy_height && player_y >= enemy_y))
			{
				enemies[i].getHit();
				if(enemies[i].getHealth() < 1)
				{
					// die, motherfucker
					console.log('LOL DEAD');
					enemies[i].die();
					enemies.splice(i, 1);
				}
			}
		}
	};

	var resetCanvas = function()
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
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

		console.log('Spawning enemy');
		var enemy = new Game.Modules.Enemy(canvas, getImage('enemy_sprite'));
		enemy.init();

		enemy.spawnRandomOutside();
		enemy.setTarget(player);
		enemy.followTarget();

		enemies.push(enemy);
	};

	var drawHealth = function()
	{
		var heart_x = 10;
		var heart_y = 10;
		var hearts = player.getHealth();
		while(hearts --)
		{
			context.drawImage(getImage('heart'), 0, 0, 28, 28, heart_x, heart_y, 28, 28);
			heart_x += 35;
		}
	};

	var gameOver = function()
	{
		running = false;
		console.log('GAME OVER LOL');
	};

};
