const { $M, print, utf8, FileStreamIn, FileStreamOut} = require('lesscode-fp')

const Uppercase = async str => str.toUpperCase()
const SaveFile = name => FileStreamOut(utf8)(name)

// Pipeline
FileStreamIn(utf8)($M(SaveFile(process.argv[3]),Uppercase))(process.argv[2]).catch(print)
  
