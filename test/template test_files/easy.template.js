/**
 * EasyTemplate
 * 
 * Version 1.2.0
 * 
 * http://easyproject.cn 
 * https://github.com/ushelp
 * 
 * Copyright 2013 Ray [ inthinkcolor@gmail.com ]
 * 
 * Dependencies: jQuery EasyUI
 * 
 */
(function() {
	var _Et = window.Et, 
	noMatch = /(.)^/, 
	escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g, 
	escapes = {
		"'" : "'",
		'\\' : '\\',
		'\r' : 'r',
		'\n' : 'n',
		'\t' : 't',
		'\u2028' : 'u2028',
		'\u2029' : 'u2029'
	}, 
	entityMap = {
		escape : {
			'&' : '&amp;',
			'<' : '&lt;',
			'>' : '&gt;',
			'"' : '&quot;',
			"'" : '&#x27;'
		},
		unescape : {
			'&amp;' : '&',
			'&lt;' : '<',
			'&gt;' : '>',
			'&quot;' : '"',
			'&#x27;' : "'"
		}
	},
	has = function(obj, key) {
		return hasOwnProperty.call(obj, key);
	},
	keys = Object.keys || function(obj) {
		if (obj !== Object(obj))
			throw new TypeError('Invalid object');
		var keys = [];
		for ( var key in obj)
			if (has(obj, key))
				keys.push(key);
		return keys;
	},
	// Regexes containing the keys and values listed immediately above.
	entityRegexes = {
		escape : new RegExp('[' + keys(entityMap.escape).join('') + ']', 'g'),
		unescape : new RegExp('(' + keys(entityMap.unescape).join('|') + ')',
				'g')
	}, 
	slice = Array.prototype.slice, defaults = function(obj) {
		Et.each(slice.call(arguments, 1), function(source) {
			if (source) {
				for ( var prop in source) {
					if (obj[prop] === void 0)
						obj[prop] = source[prop];
				}
			}
		});
		return obj;
	}
	;
	var Et = {
			// 语句表达式
		tmplSettings : {
			out : /\{([\s\S]+?)\}/g,  //输出表达式{name}
			script : /%\{([\s\S]+?)\}%/g, //脚本表达式%{JS script }%
			escapeOut : /\{-([\s\S]+?)\}/g //转义输出表达式{-name}
		},
		// Functions for escaping and unescaping strings to/from HTML
		// interpolation.
		escape : function(string) {
			if (string == null)
				return '';
			return ('' + string).replace(entityRegexes['escape'], function(
					match) {
				return entityMap['escape'][match];
			});
		},
		unescape : function(string) {
			if (string == null)
				return '';
			return ('' + string).replace(entityRegexes['unescape'], function(
					match) {
				return entityMap['unescape'][match];
			});
		},
		each : function(obj, iterator, context) {
			if (obj == null)
				return;
			if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
				obj.forEach(iterator, context);
			} else if (obj.length === +obj.length) {
				for ( var i = 0, length = obj.length; i < length; i++) {
					if (iterator.call(context, obj[i], i, obj) === breaker)
						return;
				}
			} else {
				var keys = keys(obj);
				for ( var i = 0, length = keys.length; i < length; i++) {
					if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker)
						return;
				}
			}
		},
		dataToVars:function(data) {
				var varArr = Object.keys(data || {}).sort();
				var vars = ''; 
				while (varArr.length) {
					var v = varArr.shift();
					vars += 'var ' + v + '= obj["' + v + '"];';
				}
				return vars;
		},
		template : function(text, data, settings) {
			text=Et.unescape(text);
			var render;
			settings = defaults({}, settings, Et.tmplSettings);
			var matcher = new RegExp([ (settings.escapeOut || noMatch).source,
					(settings.out || noMatch).source,
					(settings.script || noMatch).source ].join('|')
					+ '|$', 'g');

			var index = 0;
			var source = "_p+='";
			text.replace(matcher, function(match, escapeOut, out,
					script, offset) {
				source += text.slice(index, offset).replace(escaper,
						function(match) {
							return '\\' + escapes[match];
						});
				if (escapeOut) {
					source += "'+((_t=(" + escapeOut+ "))==null?'':Et.escape(_t))+'";
				}
				if (out) {
					//source += "'+((_t=(" + out+ "))==null?'':_t)+'";
					source += "'+"+out+"+'";
				}
				if (script) {
					source += "';" + script + "_p+='";
				}
				index = offset + match.length;
				return match;
			});
			source += "';";
			source = "var _p='',out=function(){_p+=Array.prototype.join.call(arguments, '')};"
					+ source + "return _p";
			
			cache={};

			if (data){
				var vars=Et.dataToVars(data);
				var render;
				cache[text] = cache[text] || {};
				if(cache[text].v===vars){
					render=cache[text].f;
				}else{
					render = new Function('obj', 'Et', vars+source);	
					cache[text].v=vars;
					cache[text].f=render;		
				}
				return render(data, Et);	
			}
				
			var template = function(data) {
				var vars=Et.dataToVars(data);
				var render;
				cache[text] = cache[text] || {};
				if(cache[text].v===vars){
					render=cache[text].f;
				}else{
					render = new Function('obj', 'Et', vars+source);	
					cache[text].v=vars;
					cache[text].f=render;		
				}
				return render(data, Et);	
				//return render.call(this, data, Et);
			};

			//template.source = 'function(obj){' + source + '}';
			return template;
		},
		noConflict : function() {
			if (window.Et === Et) {
				window.Et = _Et;
			}

			return Et;
		}
	};
	// 注册对外的命名空间
	window.Et = Et;

	return Et;
})();


