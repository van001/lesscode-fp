
// Lesscode-fp
const {
    $M, $, hint, trace, print, hash, lmap, Wait, mget, exit, mgettwo,
    linebreak, utf8, newline,
    l2String, s2List,
    FileRead, FileWrite,
    HttpGET } = require('lesscode-fp')

const inputFile = process.argv[2]
const outputFile = process.argv[3]

const computeHash = $(hash('sha256'), mget('data'))
const contentLen = mgettwo('headers')('content-length')
const LogData = name => async data => `${name} ${contentLen(data)} ${computeHash(data)}`
const LogErorr = name => async err => `${name} 0  ${escape(err)}`

// processFile :: String -> String
const ProcessURL = name => $M(LogData(name), HttpGET)(name).catch(LogErorr(name))

// ProcessContent :: String -> String
const ProcessContent = $M(l2String(newline), Wait, lmap(ProcessURL), s2List(linebreak))

// Main pipeline.
$M(FileWrite(utf8)(outputFile), ProcessContent, FileRead(utf8))(inputFile).catch(print)
