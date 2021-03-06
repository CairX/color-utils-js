/* exported ColorUtils */

"use strict";

var ColorUtils = (function() {
	var self = {};
	var raw = {};

	var splitInterval = function(string, interval) {
		return string.toString().match(new RegExp(".{1," + interval + "}", "g"));
	};

	var padding = function(number) {
		if (number.toString().length === 1) {
			return "0" + number.toString();
		}
		return number;
	};

	var formats = [
		{
			id: "rgb",
			pattern: /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/i,
			weight: 0,
			extract: function(string) {
				var values = this.pattern.exec(string).map(Number);
				return { red: values[1], green: values[2], blue: values[3], alpha: 255 };
			},
			string: function(raw) {
				return "rgb(" + raw.red + ", " + raw.green + ", " + raw.blue + ")";
			}
		}, {
			id: "rgba",
			pattern: /rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?([+-]?(\d*[.])?\d+)\)/i,
			weight: 1,
			extract: function(string) {
				var values = this.pattern.exec(string).map(Number);
				return { red: values[1], green: values[2], blue: values[3], alpha: values[4] * 255 };
			},
			string: function(raw) {
				return "rgba(" + raw.red + ", " + raw.green + ", " + raw.blue + ", " + (raw.alpha / 255).toFixed(3) + ")";
			}
		}, {
			id: "hex-36",
			pattern: /^#([0-9a-f]{3}|[0-9a-f]{6})$/im,
			weight: 0,
			extract: function(string) {
				var values = this.pattern.exec(string)[1];
				if (values.length === 3) {
					values = splitInterval(values, 1).map(function(value) {
						return value + value;
					});
				} else if (values.length === 6) {
					values = splitInterval(values, 2);
				}
				values = values.map(function(value) {
					return parseInt(value, 16);
				});
				return { red: values[0], green: values[1], blue: values[2], alpha: 255 };
			},
			string: function(raw) {
				Object.keys(raw).forEach(function(key) {
					raw[key] = padding(raw[key].toString(16));
				});
				var value = "#" + raw.red + "" + raw.green + "" + raw.blue;
				if (raw.alpha !== "ff") {
					value += raw.alpha;
				}
				return value;
			}
		}, {
			id: "hex-48",
			pattern: /^#([0-9a-f]{4}|[0-9a-f]{8})$/im,
			weight: 1,
			extract: function(string) {
				var values = this.pattern.exec(string)[1];
				if (values.length === 4) {
					values = splitInterval(values, 1).map(function(value) {
						return value + value;
					});
				} else if (values.length === 8) {
					values = splitInterval(values, 2);
				}
				values = values.map(function(value) {
					return parseInt(value, 16);
				});
				return { red: values[0], green: values[1], blue: values[2], alpha: values[3] };
			},
			string: function(raw) {
				Object.keys(raw).forEach(function(key) {
					raw[key] = padding(raw[key].toString(16));
				});
				var value = "#" + raw.red + "" + raw.green + "" + raw.blue;
				if (raw.alpha !== "ff") {
					value += raw.alpha;
				}
				return value;
			}
		}
	];

	raw.rangeEveryOther = function(length) {
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

	raw.lerpValue = function(start, end, blend) {
		return Math.round((1 - blend) * start + blend * end);
	};

	raw.lerp = function(start, end, blend) {
		return {
			red: raw.lerpValue(start.red, end.red, blend),
			green: raw.lerpValue(start.green, end.green, blend),
			blue: raw.lerpValue(start.blue, end.blue, blend),
			alpha: raw.lerpValue(start.alpha, end.alpha, blend)
		};
	};

	raw.transition = function(start, end, steps) {
		var colors = [];
		var blend = 1 / (steps - 1);
		for (var i = 0; i < steps; i++) {
			colors.push(raw.lerp(start, end, blend * i));
		}
		return colors;
	};

	self.format = function(string) {
		for (var i = 0; i < formats.length; i++) {
			var format = formats[i];
			if (format.pattern.test(string)) {
				return { raw: format.extract(string), format: format };
			}
		}
		return null;
	};

	self.lerp = function(start, end, blend) {
		start = self.format(start);
		end = self.format(end);
		var format = start.format.weight >= end.format.weight ? start.format : end.format;
		return format.string(raw.lerp(start.raw, end.raw, blend));
	};

	self.transitions = function(colors, steps) {
		if (steps < colors.length) {
			return colors;
		}

		var result = [];
		var pairs = [];

		colors = colors.map(function(color) {
			return self.format(color);
		});

		for (var i = 0; i < colors.length - 1; i++) {
			pairs.push({ begin: colors[i].raw, end: colors[i + 1].raw, steps: 0 });
		}

		var everyOther = raw.rangeEveryOther(pairs.length);
		for (var j = 0, len = steps + (colors.length - 2); j < len; j++) {
			pairs[everyOther[j % pairs.length]].steps++;
		}

		pairs.forEach(function(pair, index) {
			var transition = raw.transition(pair.begin, pair.end, pair.steps);
			if (index > 0) {
				transition = transition.slice(1);
			}
			Array.prototype.push.apply(result, transition);
		});

		var format = colors[0].format;
		for (var k = 1; k < colors.length; k++) {
			format = format.weight >= colors[k].format.weight ? format : colors[k].format;
		}

		return result.map(function(color) {
			return format.string(color);
		});
	};

	self.transition = function(start, end, steps) {
		return self.transitions([start, end], steps);
	};

	self.loop = function(first, second, steps) {
		return self.transitions([first, second, first], steps);
	};

	return self;
})();
