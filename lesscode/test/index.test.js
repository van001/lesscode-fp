const {
    max, min, sum, sub,
    space, blank, comma,  newline, utf8,sha256, md5, 
} = require('../src/index.js')

// Math
test('sum', () => { expect(sum(6)(2)).toBe(8) })
test('max', () => { expect(max(6)(2)).toBe(6) })
test('min', () => { expect(min(6)(2)).toBe(2) })
test('sub', () => { expect(sub(6)(2)).toBe(4) })
test('space', () => { expect(space).toBe(' ') })
test('blank', () => { expect(blank).toBe('') })
test('comma', () => { expect(comma).toBe(',') })
test('newline', () => { expect(newline).toBe('\n') })
test('utf8', () => { expect(utf8).toBe('utf8') })
test('sha256', () => { expect(sha256).toBe('sha256') })
test('md5', () => { expect(md5).toBe('md5') })




