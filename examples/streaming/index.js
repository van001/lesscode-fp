const { 
    $, $M, Hint, Trace, print, hash, Lmap, Wait, mget, exit, mgettwo, 
    linebreak, utf8, newline,  
    L2String, S2List, 
    FileRead, FileWrite,
    HttpGET } = require('lesscode-fp')

const fs = require('fs')
//const FileStreamIn = option => async name => fs.(name, option);
//const FileStreamOut = option => name => async data => fs.writeFile(name, data, option)


const option = { 
    flag: 'a+', 
    encoding: 'UTF-8', 
    highWaterMark: 16 
}
  
// Use fs.createReadStream() method 
// to read the file 
const FileStreamIn  = pipe => async file => fs.createReadStream(file, option).on('data', pipe); 

const Read = async data => print(data)

FileStreamIn(Read)('input.txt')
  
// Read and disply the file data on console 
//reader.on('data', function (chunk) { 
  //  console.log(`chunk : ${chunk.length}`); 
//}); 