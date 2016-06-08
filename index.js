'use strict';
var through2 = require('through2');
var File = require('vinyl');

var plugin = function(fileName, options){
	fileName = fileName || 'rev-manifest.json'
	var manifest = {};

	return through2.obj(function(file, enc, cb){
		manifest[file.relative] = file.relative;

		cb();
	}, function(cb){
		if(Object.keys(manifest).length == 0){
			cb();
			return;
		}

		var manifestFile = new File({
			base: process.cwd(),
			path: process.cwd()+'/'+fileName,
			contents: new Buffer(JSON.stringify(manifest))
		});
		this.push(manifestFile);

		cb();
	});
}

module.exports = plugin;