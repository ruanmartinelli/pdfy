const templateSettings = require('lodash/templateSettings')
const template = require('lodash/template')
const puppeteer = require('puppeteer')

const defaultOpts = {
  format: 'A4',
  path: '',
  margin: { top: '50px', bottom: '50px' },
  printBackground: true
}

// Looks for the mustache syntax on templates - {{ }}
templateSettings.interpolate = /{{([\s\S]+?)}}/g

module.exports = async (htmlTemplate, data = {}, opts) => {
  if (typeof htmlTemplate !== 'string') {
    throw new TypeError(`First argument must be a string, got ${typeof htmlTemplate}`)
  }

  opts = Object.assign(defaultOpts, opts)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const compiled = template(htmlTemplate)(data)
  await page.emulateMedia('screen')
  await page.setContent(compiled)

  const buff = await page.pdf(opts)

  await browser.close()

  return buff
}
