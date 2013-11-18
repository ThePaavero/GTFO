
Game.Settings = {

	pixel_size: 3,
	bombs     : false

};

(function()
{
	var hash = window.location.hash;

	if(hash === '')
	{
		return;
	}

	var pairs = hash.replace('#', '').split('&');

	for(var i in pairs)
	{
		var bits = pairs[i].split('=');
		var key = bits[0];
		var value = bits[1];

		if(value === 'true' || value === '1')
		{
			value = true;
		}
		else if(value === 'false' | value === '0')
		{
			value = false;
		}

		Game.Settings[key] = value;
	}

	console.log(Game.Settings);

})();