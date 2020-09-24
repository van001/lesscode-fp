const { print, utf8, FileStreamIn, FileStreamOut} = require('lesscode-fp')

FileStreamIn(utf8)(FileStreamOut(utf8)('output.txt'))('input.txt').catch(print)
  
