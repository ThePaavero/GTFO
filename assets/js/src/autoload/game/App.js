Game.App = function() {

	var running = false;
	var game_over = false;
	var canvas;
	var context;
	var images = [
		'assets/img/splash.png',
		'assets/img/game_over.png',
		'assets/img/player_sprite.png',
		'assets/img/enemy_sprite.png',
		'assets/img/heart.png'
	];
	var pixel_size           = Game.Settings.pixel_size;
	var show_fps             = true;
	var enemy_spawn_interval = 5000;
	var player;
	var enemies              = [];
	var points               = 0;
	var enemy_speed          = 1;

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
		if(game_over === true)
		{
			showGameOverScreen();
			return;
		}

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
		drawPoints();

		window.game_running = running;
		window.Game.Globals.canvas = canvas;
		window.Game.Globals.context = context;

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
		var player_x = player.getX();
		var player_y = player.getY();

		var player_orientation_x = player.getOrientationX();

		var reach = 5;

		var player_left   = 0;
		var player_right  = 0;
		var player_top    = 0;
		var player_bottom = 0;

		player_top = player_y;
		player_bottom = player_y + player.getHeight();

		// Any enemies getting hit?
		for(var i in enemies)
		{
			var enemy_x      = enemies[i].getX();
			var enemy_y      = enemies[i].getY();
			var enemy_width  = enemies[i].getWidth();
			var enemy_height = enemies[i].getHeight();

			var attack_point = null;

			player_left = player_x - reach;
			player_right = (player_x + player.getWidth()) + reach;

			if(player_orientation_x === 'left')
			{
				attack_point_x = player_left + reach;
			}
			else
			{
				attack_point_x = player_right + reach;
			}

			var attack_point_y = player_top + 5;
			var attack_spread = 12;

			if(
				(
					enemy_x > attack_point_x - attack_spread &&
					enemy_x < attack_point_x + attack_spread
				) && (
					enemy_y > attack_point_y - (attack_spread*2) &&
					enemy_y < attack_point_y + (attack_spread*2)
				)
			)
			{
				hitEnemy(enemies[i], i, player_orientation_x);
			}
		}
	};

	var hitEnemy = function(enemy, key, player_orientation_x)
	{
		enemy.getHit(player_orientation_x);

		console.log('☻ RIGHT IN THE KISSER');

		points += 10;

		if(enemy.getHealth() < 1)
		{
			// Die, motherfucker
			points += 100;
			console.log('LOL DEAD');
			enemy.die();
			enemies.splice(key, 1);
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
		var enemy = new Game.Modules.Enemy(canvas, getImage('enemy_sprite'), enemy_speed);
		enemy.init();

		enemy.spawnRandomOutside();
		enemy.setTarget(player);
		enemy.followTarget();

		enemies.push(enemy);

		if(enemy_spawn_interval > 300)
		{
			enemy_spawn_interval -= 200;
			console.log(enemy_spawn_interval);
		}
		if(enemy_speed < 4)
		{
			enemy_speed += 0.1;
		}
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

	var drawPoints = function()
	{
		var points_x = 600;
		var points_y = 33;

		context.font = '30pt "silkscreennormal"';
		context.fillStyle = 'white';
		context.fillText(points + ' pts', points_x, points_y);
	};

	var gameOver = function()
	{
		running = false;
		game_over = true;
		console.log('GAME OVER LOL');
	};

	var showGameOverScreen = function()
	{
		context.drawImage(getImage('game_over'), 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
	};

};
