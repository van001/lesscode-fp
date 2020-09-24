
// Lesscode-fp
const { 
    $, $M, hint, Hint, print, hash, Lmap, Wait, mget, exit, mgettwo, 
    linebreak, utf8, newline,  
    L2String, S2List, 
    FileRead, FileWrite,
    HttpGET } = require('lesscode-fp')

//TO DO : 
// 1. DO inititial sanitaztion
const inputFile = process.argv[2]
const outputFile = process.argv[3]
const Trace = label => async val => { print(label); print(val); print(' '); return val } 

// processFile :: String -> String
const processURL = name => {
    const computeHash = $(hash('sha256'), mget('data'))
    const contentLen = mgettwo('headers')('content-length')
    const LogData = name => async data => `${name} ${contentLen(data)} ${computeHash(data)}`
    const LogErorr = name =>  async err => `${name} 0  ${escape(err)}`
    return $M(
        Trace(`[Pass] : ${name}................`), LogData(name), HttpGET)(name)
        .catch($(Trace(`[Fail] : ${name}.......`), LogErorr(name)))
}

// Pipeline
$M(
    Trace('Write to output file................'), FileWrite(utf8)(outputFile), 
    Trace('Convert List 2 String...............'), L2String(newline), 
    Trace('Wait................................'), Wait, 
    Trace('Processed URLs......................'), Lmap(processURL), 
    Trace('Converted to List...................'), S2List(linebreak), 
    Trace('Read input file.....................'), FileRead(utf8))(inputFile)
.catch($(exit, print))

//HttpGETs = async urls => lmap(HttpGET)(urls)
//$M(Wait,HttpGETs)(['http://i.imgur.com/KxyEGOn.jpg','http://i.imgur.com/vPae8qL.jpg']).then(print)