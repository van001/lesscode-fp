const {print} = require('lesscode-fp')

const fs = require('fs')

// Use fs.createReadStream() method 
// to read the file 
const FileStreamIn  = option => func => async file => fs.createReadStream(file, option).on('data', func); 
const FileStreamOut = option => file => async buffer => fs.createWriteStream(file,option).write(print(buffer))

const Read = async data => print(data)

FileStreamIn(utf8)(FileStreamOut(utf8)('output.txt'))('input.txt')
  
// Read and disply the file data on console 
//reader.on('data', function (chunk) { 
  //  console.log(`chunk : ${chunk.length}`); 
//}); 