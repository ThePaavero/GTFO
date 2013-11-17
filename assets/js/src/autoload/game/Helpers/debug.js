
Game.Helpers.Debug = function(x, y, w, h, color)
{
	var context = window.Game.Globals.context;
	var canvas  = window.Game.Globals.canvas;

	context.rect(x, y, w, h);
	context.fill();
};
