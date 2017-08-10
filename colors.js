/* exported Colors */
/* global console */

"use strict";

var Colors = (function() {
	var self = {};
	self.rgb = {};

	self.rgb.pattern = /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;

	self.rgb.round = function(number) {
		return Math.min(Math.max(Math.round(number), 0), 255);
	};

	self.rgb.extract = function(string) {
		string = string.toString().toLowerCase();
		var colors = self.rgb.pattern.exec(string);
		return colors.slice(1, 4).map(Number);
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
			var result = [];
			var pairs = [];

			for (var i = 0; i < colors.length - 1; i++) {
				pairs.push({
					begin: colors[i],
					end: colors[i + 1],
					steps: 0
				});
			}

			var everyOther = self.rgb.rangeEveryOther(pairs.length);
			for (var j = 0, len = steps + (colors.length - 2); j < len; j++) {
				pairs[everyOther[j % pairs.length]].steps++;
			}

			pairs.forEach(function(pair, index) {
				var transition = self.rgb.transition(pair.begin, pair.end, pair.steps);
				if (index > 0) {
					transition = transition.slice(1);
				}
				Array.prototype.push.apply(result, transition);
			});

			return result;
		}
	};

	self.rgb.rangeEveryOther = function(length) {
		length = length - 1;

		var result = [];
		var upper = Math.ceil(length / 2);
		var lower = Math.floor(length / 2);

		for (var i = 0; i <= upper; i++) {
			result.push(i);

			if (i < lower) {
				result.push(length - i);
			}
		}
		return result;
	};

	self.rgb.loop = function(first, second, steps) {
		steps = (steps + 2) / 2;
		var transition = self.rgb.transition(first, second, steps);
		var complete = transition.slice(0, transition.length - 1);
		return complete.concat(transition.slice(1).reverse());
	};

	return self;
})();
