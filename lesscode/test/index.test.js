const {
    Print, Trace, Hint, $, $P, $A,
    space, blank, comma,
    s2List,
    l2String
} = require('../src/index.js')

// Generics
test('Print', () => { expect(Print('Neelesh Vaikhary')).toBe('Neelesh Vaikhary') })
test('Trace', () => { expect(Trace('Trace')(true)).toBe(true) })
test('Hint', () => { expect(Hint('Hint')(true)).toBe(true) })



