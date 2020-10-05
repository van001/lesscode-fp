// Lesscode-fp
const {
    linebreak, utf8, newline, // Strings
    hash,                     // math
    l2String, s2List,         // List
    mget, mgettwo,            // Map
    $M, $E,                   // Composition
    Print,                    // Monad 
    FileRead, FileWrite,      // IO Monad
    HttpGET                   // IO Monad
} = require('lesscode-fp')

const LogData = name => async data => `${name} ${mgettwo('headers')('content-length')} ${hash('sha256')(mget('data'))}`
const LogErorr = name => async err => `${name} 0  ${escape(err)}`

// processURL :: String -> String
const ProcessURL = name => $M(LogData(name), HttpGET())(name).catch(LogErorr(name))

const In = process.argv[2]
const Out = process.argv[3]
// Main pipeline. Classic mix of sequence ($M - monad) & concurrency ( $E - applicative)
$M(FileWrite(utf8)(Out),l2String(newline), $E(ProcessURL), s2List(linebreak), FileRead(utf8))(In).catch(Print)

