// Lesscode-fp
const {
    $M, Print, hash, lmap, Wait, mget, mgettwo, linebreak, utf8, newline,
    l2String, s2List,
    FileRead, FileWrite,
    HttpGET } = require('lesscode-fp')

const inputFile = process.argv[2]
const outputFile = process.argv[3]

const LogData = name => async data => `${name} ${mgettwo('headers')('content-length')} ${hash('sha256')(mget('data'))}`
const LogErorr = name => async err => `${name} 0  ${escape(err)}`

// processURL :: String -> String
const ProcessURL = name => $M(LogData(name), HttpGET)(name).catch(LogErorr(name))

// ProcessContent :: String -> String
const ProcessContent = $M(l2String(newline), Wait, lmap(ProcessURL), s2List(linebreak))

// Main pipeline.
$M(FileWrite(utf8)(outputFile), ProcessContent, FileRead(utf8))(inputFile).catch(Print)
