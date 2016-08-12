'use strict';

var through = require('through2');
var extend = require('extend-shallow');
var isObject = require('isobject');
var File = require('vinyl');

module.exports = function(options) {
  var opts = extend({key: 'relative'}, options);

  var inquirer = require('inquirer');
  inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

  var message = opts.message || 'Which file do you want to write?';
  var paths = [];
  var files = {};

  return through.obj(function(file, enc, next) {
    if (typeof file.basename === 'undefined') {
      file = new File(file);
    }

    if (isSkipped(file, opts)) {
      next(null, file);
      return;
    }

    var key = fileKey(file, opts);
    paths.push(key);
    files[key] = file;
    next();
  }, function(next) {
    var stream = this;

    if (paths.length === 0) {
      next(new Error('expected an array of files'));
      return;
    }

    if (typeof opts.choice === 'string') {
      stream.push(files[opts.choice]);
      next();
      return;
    } else if (opts.choice) {
      next(new Error('expected options.choice to be a string'));
      return;
    }

    var questions = [{
      name: 'files',
      type: 'autocomplete',
      message: message,
      source: listFiles(paths, opts)
    }];

    inquirer.prompt(questions).then(function(answers) {
      if (!answers.files) return next();
      stream.push(rename(files[answers.files], opts));
      next();
    });
  });
};

function fileKey(file, opts) {
  if (typeof opts.key === 'string') {
    return file[opts.key];
  }
  if (typeof opts.key === 'function') {
    return opts.key(file);
  }
  return file.relative;
}

function listFiles(paths, options) {
  return function(answers, str) {
    return new Promise(function(resolve) {
      resolve(paths.filter(filter(str, options)));
    });
  };
}

function filter(str, options) {
  return function(name, names) {
    if (typeof options.filter === 'function') {
      return options.filter(str, name, names);
    }
    return new RegExp(str, 'i').test(name);
  };
}

function isSkipped(file, options) {
  if (options.skip === true || file.skip === true) {
    return true;
  }
  if (options.skip === file[options.key]) {
    return true;
  }
  return false;
}

function rename(file, options) {
  if (isObject(options.rename)) {
    for (var key in options.rename) {
      if (options.rename.hasOwnProperty(key)) {
        file[key] = options.rename[key];
      }
    }
  }
  if (options.basename) file.basename = options.basename;
  if (options.dirname) file.dirname = options.dirname;
  if (options.extname) file.extname = options.extname;
  if (options.stem) file.stem = options.stem;
  return file;
}

