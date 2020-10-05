const { $M, Print, utf8, FileStreamOut} = require('lesscode-fp')

const Uppercase = async str => str.toUpperCase()
const is = FileStreamIn(utf8)(process.argv[2])
const os = FileStreamOut(utf8)(process.argv[3])

// Pipeline
$S(is)(os)(Uppercase)