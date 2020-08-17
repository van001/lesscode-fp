const {print, trace} = require('./index.js')
test('print', () => {expect(print('Neelesh Vaikhary')).toBe('Neelesh Vaikhary')})
test('trace', () => {expect(trace('Trace')(true)).toBe(true)})
