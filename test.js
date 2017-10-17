import test from 'ava'
import fs from 'fs'
import { isBuffer } from 'lodash'
import { v4 } from 'uuid'

import m from './'

const content = `<h1>hello {{user}}</h1>`
const data = { user: 'Ruan' }

test('should return a buffer', async t => {
  const buff = await m(content, data)

  t.is(isBuffer(buff), true)
})

test('fail if bad arguments', async t => {
  const promise = m(null, data) // Bad template string
  const error = await t.throws(promise)

  t.is(error instanceof TypeError, true)
})

test('fail if missing attr on data object', async t => {
  // no "user" attribute on data object
  const promise = m(content, {})

  const error = await t.throws(promise)
  t.is(error instanceof ReferenceError, true)
})

test('create file if path option is present', async t => {
  const testPath = `${v4()}.pdf`

  await m(content, data, { path: testPath })

  t.is(fs.existsSync(testPath), true)

  fs.unlinkSync(testPath)
})
