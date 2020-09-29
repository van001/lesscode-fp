
// Lesscode-fp
const {
    $, hint, trace, print, hash, lmap, Wait, mget, exit, mgettwo, lfold, lprepend, eqType,
    linebreak, utf8, newline,
    l2String, s2List,
    FileRead, FileWrite,
    HttpGET } = require('lesscode-fp')

const M = f => async a => f(a)
const $M = (...ms) => (ms.reduce((f, g) => x => (eqType('AsyncFunction')(f)) ? g(x)['then'](f) : M(g)(x)['then'](f))) // monadic composition

const inputFile = process.argv[2]
const outputFile = process.argv[3]

// processFile :: String -> String
const processURL = name => {
    const computeHash = $(hash('sha256'), mget('data'))
    const contentLen = mgettwo('headers')('content-length')
    const LogData = name => async data => `${name} ${contentLen(data)} ${computeHash(data)}`
    const LogErorr = name => async err => `${name} 0  ${escape(err)}`
    return $M(
        trace(`Extracted metadata...............`), LogData(name),      // Success
        hint(`Downloaded ${name}................`), HttpGET)(name)
        .catch($(trace(`[Fail] : ${name}........`), LogErorr(name)))    // Failure
}

// Pipeline
$M(
    trace('Write to output file................'), FileWrite(utf8)(outputFile),
    trace('Convert List 2 String...............'), l2String(newline),
    trace('Wait................................'), Wait,
    trace('Processed URLs......................'), lmap(processURL),
    trace('Converted to List...................'), s2List(linebreak),
    trace('Read input file.....................'), FileRead(utf8))(inputFile)
.catch($(exit, print))


