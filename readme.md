# pdfy 

[![Build Status](https://travis-ci.org/ruanmartinelli/pdfy.svg?branch=master)](https://travis-ci.org/ruanmartinelli/pdfy)
[![NPM downloads](https://img.shields.io/npm/dm/pdfy.svg?style=flat)](https://npmjs.com/package/pdfy)
[![Dependencies](https://david-dm.org/ruanmartinelli/pdfy.svg)](https://david-dm.org/ruanmartinelli/pdfy)

> Creates PDF documents from HTML templates using Headless Chrome.

## Install

#### yarn
```
$ yarn add pdfy
```

#### npm
```
$ npm install --save pdfy
```

## Usage

### Basic

```js
const pdfy = require('pdfy');

pdfy(`<h1> Hello {{user}} </h1>`, { user: 'James' })
  .then(buff => {
     //=> <Buffer 32 40 2a ... >
  })
```

### Saving files

```js
const pdfy = require('pdfy');
const options = { path: 'example.pdf' } // Just add the path in options

pdfy(`<h1> Hello {{user}} </h1>`, { user: 'James' }, options)
//=> <Promise<Buffer>>
```

### Bootstrap styles

See [example](https://github.com/ruanmartinelli/pdfy/blob/master/examples/bootstrap.pdf)

```js
const pdfy = require('pdfy');
const axios = require('axios');

const bootstrapUrl = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap.min.css';
const { data : bootstrap } = await axios.get(bootstrapUrl);

const template = `
   <html>
      <head>
        <style>{{ bootstrap }}</style>
      </head>
      <body>
        <div class="container">
          <h1>Hello {{ user }}</h1>

          <button type="button" class="btn btn-primary">Primary</button>
          <button type="button" class="btn btn-secondary">Secondary</button>
          <button type="button" class="btn btn-success">Success</button>

        </div>
      </body>
    </html>`;

pdfy(template, { user: 'James', bootstrap });
//=> <Promise<Buffer>>
```

## API

### pdfy(template, data, [options])

Returns a `<Promise<Buffer>>` with the generated PDF.

#### template

Type: `string`

HTML template string.

#### data

Type: `object`

Data that will be injected on the template.

#### options

Type: `object`

See [puppeteer options](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions)

```js
// Default options
{
  format: "A4",
  path: "",
  margin: { top: '50px', bottom: '50px' }
}
```

## Related

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [lodash.template](https://lodash.com/docs/4.17.4#template)

## License

MIT © [Ruan Martinelli](https://github.com/ruanmartinelli)
