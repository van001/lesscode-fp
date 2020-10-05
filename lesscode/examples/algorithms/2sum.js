const { min, max, Print} = require('lesscode-fp')
//const { $A, sum, HttpGET} = require('../../src')
//$A(sum(3), sum(2))([1,2,4]).then(Print)
//$A(HttpGET)(['https://www.google.com','https://www.yahoo.com']).then(Print)

const { $M, print, utf8, FileStreamIn, FileStreamOut} = require('lesscode-fp')

const Uppercase = async str => str.toUpperCase()
const SaveFile = name => FileStreamOut(utf8)(name)

// Process Stream
const ProcessStream = $M(SaveFile(process.argv[3]),Uppercase)
const $S = input => output => func => data => input(output(func))(data)

// Pipeline
$S(FileStreamIn(utf8))(FileStreamOut(utf8))(Uppercase)
//FileStreamIn(utf8)(ProcessStream)(process.argv[2]).catch(print)
