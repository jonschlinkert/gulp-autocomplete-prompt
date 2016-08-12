# gulp-autocomplete-prompt [![NPM version](https://img.shields.io/npm/v/gulp-autocomplete-prompt.svg?style=flat)](https://www.npmjs.com/package/gulp-autocomplete-prompt) [![NPM downloads](https://img.shields.io/npm/dm/gulp-autocomplete-prompt.svg?style=flat)](https://npmjs.org/package/gulp-autocomplete-prompt)

Autocomplete prompt for choosing a file to write.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save gulp-autocomplete-prompt
```

## Usage

```js
var autocomplete = require('gulp-autocomplete-prompt');

gulp.src('*.js')
  .pipe(autocomplete())
  .pipe(dest('dist/'));
```

## Example

This is used in [generate-gitignore](https://github.com/generate/generate-gitignore) if you want to see a live example.

```js
app.task('gitignore-global', function() {
  return app.src('templates/*.gitignore', { cwd: __dirname })
    .pipe(autocomplete({key: 'stem', basename: '.gitignore'}))
    .pipe(app.dest(app.cwd));
});
```

## Options

### key

**Type**: `String`

**Default**: `relative`

The [vinyl](http://github.com/gulpjs/vinyl) `file` path property to use when displaying the list of files in the terminal.

**Example**

```js
autocomplete({key: 'stem'})
```

### choice

**Type**: `String`

**Default**: `undefined`

Programmatically choose the file to render to avoid prompts. The provide name should match the file property based on the specified [key](#key).

**Example**

```js
autocomplete({choice: 'foo'})
```

### skip

**Type**: `Boolean`

**Default**: `undefined`

Skip a file from being displayed in the list of choices.

**Example**

```js
autocomplete({skip: 'foo'})

// or in another plugin
through.obj(function(file, enc, next) {
  if (file.stem === 'foo') file.skip = true;
  next(null, file);
});
```

### rename

**Type**: `Object`

**Default**: `undefined`

Rename the destination file using the string values on `options.rename`. If you need something more sophisticated there are other gulp plugins dedicated to this.

**Example**

```js
autocomplete({skip: 'foo', rename: '.gitignore'})
```

### Filter

**Type**: `Function`

**Default**:

```js
function filter(str, name) {
  return new RegExp(str, 'i').test(name);
}
```

**Description**

Filter function that takes the current search string, top search result, and array of file names as arguments.

**Example**

```js
autocomplete({
  filter: function(str, name) {
    return new RegExp(str, 'i').test(name);
  }
});
```

## About

### Related projects

* [gulp-choose-file](https://www.npmjs.com/package/gulp-choose-file): Gulp plugin that prompts you to choose a file to pass through the stream. | [homepage](https://github.com/pointnet/gulp-choose-file "Gulp plugin that prompts you to choose a file to pass through the stream.")
* [gulp-choose-files](https://www.npmjs.com/package/gulp-choose-files): Gulp plugin that prompts you to choose the files to pass through the stream. | [homepage](https://github.com/generate/gulp-choose-files "Gulp plugin that prompts you to choose the files to pass through the stream.")
* [gulp-dry](https://www.npmjs.com/package/gulp-dry): Gulp plugin for Dry, a new template engine with advanced inheritance features. | [homepage](https://github.com/jonschlinkert/gulp-dry "Gulp plugin for Dry, a new template engine with advanced inheritance features.")
* [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin): gulp plugin to minify HTML. | [homepage](https://github.com/jonschlinkert/gulp-htmlmin#readme "gulp plugin to minify HTML.")
* [gulp-is-binary](https://www.npmjs.com/package/gulp-is-binary): Adds an `.isBinary()` function to the `file` object, similar to `file.isNull()` and `file.isStream()`. | [homepage](https://github.com/jonschlinkert/gulp-is-binary "Adds an `.isBinary()` function to the `file` object, similar to `file.isNull()` and `file.isStream()`.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/gulp-autocomplete-prompt/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on August 11, 2016._