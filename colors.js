/* exported Colors */
/* global console */

"use strict";

var Colors = (function() {
	var self = {};
	self.rgb = {};

	self.rgb.round = function(number) {
		return Math.min(Math.max(Math.round(number), 0), 255);
	};

	self.rgb.extract = function(string) {
		var pattern = /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;
		var colors = pattern.exec(string.toLowerCase());
		colors = colors.slice(1, 4);

		for (var i = 0; i < colors.length; i++) {
			colors[i] = parseInt(colors[i]);
		}

		return colors;
	};

	self.rgb.string = function(colors) {
		return "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
	};

	self.rgb.transition = function(start, end, steps) {
		// TODO: Take color list to create multiple transitions instead of start and end.
		start = self.rgb.extract(start);
		end = self.rgb.extract(end);

		var red = (end[0] - start[0]) / (steps - 1);
		var green = (end[1] - start[1]) / (steps - 1);
		var blue = (end[2] - start[2]) / (steps - 1);

		var colors = [];
		for (var i = 0; i < steps; i++) {
			var tmp = [];
			tmp[0] = self.rgb.round(start[0] + red * i);
			tmp[1] = self.rgb.round(start[1] + green * i);
			tmp[2] = self.rgb.round(start[2] + blue * i);

			colors.push(self.rgb.string(tmp));
		}

		return colors;
	};

	self.rgb.transitions = function(colors, steps) {
		if (colors.length >= steps) {
			return colors;
		} else {
			var transition = [];

			//console.log(steps);
			//console.log(colors.length);

			steps = Math.round(steps / (colors.length  - 1)) + 1;
			//console.log(steps);
			// TODO: Handle overlapping colors of the transition.
			for (var i = 0; i < colors.length - 1; i++) {
				var c;
				//console.log(c);

				if (i < colors.length - 2) {
					console.log("not last");
					c = self.rgb.transition(colors[i], colors[i+1], steps + 1);
					c = c.slice(0, c.length - 2);
				} else {
					console.log("last");
					c = self.rgb.transition(colors[i], colors[i+1], steps);
				}

				Array.prototype.push.apply(transition, c);
			}

			console.log(transition);

			return transition;
		}
	};

	self.rgb.loop = function(first, second, steps) {
		steps = (steps + 2) / 2;
		var transition = self.rgb.transition(first, second, steps);
		var complete = transition.slice(0, transition.length - 1);
		return complete.concat(transition.slice(1).reverse());
	};

	return self;
})();
