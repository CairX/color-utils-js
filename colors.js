/* exported Colors */
/* global console */

"use strict";

var Colors = (function() {

	/* ------------------------------------------------- *
	 * Exporeted methods.
	 * ------------------------------------------------- */
	var self = {};
	self.rgb = {};


	/* ------------------------------------------------- *
	 * Round the RGB value. Limited to 0-255.
	 *
	 * @param number {Integer} The number to round.
	 *
	 * @return {Integer} Value from 0 to 255.
	 * ------------------------------------------------- */
	self.rgb.round = function(number) {
		number = Math.round(number);
		if (number < 0) {
			return 0;
		} else if (number > 255) {
			return 255;
		} else {
			return number;
		}
	};


	/* ------------------------------------------------- *
	 * Extract RGB values from string based on the
	 * following format: rgb(xxx, xxx, xxx)
	 *
	 * @param string {String} Color string.
	 *
	 * @return {Array} Integer color values.
	 *                 Red = 0
	 *                 Green = 1
	 *                 Blue = 2
	 * ------------------------------------------------- */
	self.rgb.extract = function(string) {
		var pattern = /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;
		var colors = pattern.exec(string.toLowerCase());
		colors = colors.slice(1, 4);

		for (var i = 0; i < colors.length; i++) {
			colors[i] = parseInt(colors[i]);
		}

		return colors;
	};


	/* ------------------------------------------------- *
	 * Convert array of color values into string.
	 *
	 * @param colors {Array} List of colors with an
	 *                       expected order of red(0),
	 *                       green(1) and blue(2).
	 *
	 * @return {string} Colors in string format:
	 *                  rgb(xxx, xxx, xxx)
	 * ------------------------------------------------- */
	self.rgb.string = function(colors) {
		return "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
	};


	/* ------------------------------------------------- *
	 * Create list of colors that transist from given
	 * start value to end.
	 *
	 * @param start {String} Color, rgb(xxx, xxx, xxx).
	 * @param end {String} Color, rgb(xxx, xxx, xxx).
	 * @param steps {Integer} Number of transition steps.
	 *
	 * @return {Array} List of color strings.
	 * ------------------------------------------------- */
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


	/* ------------------------------------------------- *
	 * Transition between multiple colors in the number
	 * of given steps.
	 *
	 * @param colors {Array} List of colors as string
	 *                       in format, rgb(xxx, xxx, xxx).
	 * @param steps {Integer} Number of transition steps.
	 *
	 * @return {Array} List of color strings.
	 * ------------------------------------------------- */
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


	/* ------------------------------------------------- *
	 * Create list of colors that transist from given
	 * first and second color. Where if looped will
	 * create a continuous transition from one color
	 * to the other, much like a pulse.
	 *
	 * @param first {String} Color, rgb(xxx, xxx, xxx).
	 * @param second {String} Color, rgb(xxx, xxx, xxx).
	 * @param steps {Integer} Number of transition steps.
	 *
	 * @return {Array} List of color strings.
	 * ------------------------------------------------- */
	self.rgb.loop = function(first, second, steps) {
		steps = (steps + 2) / 2;
		var transition = self.rgb.transition(first, second, steps);
		var complete = transition.slice(0, transition.length - 1);
		return complete.concat(transition.slice(1).reverse());
	};

	return self;
})();
