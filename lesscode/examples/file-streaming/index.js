const { 
    utf8, 
    suppercase,
    $3, 
    FileStreamIn, FileStreamOut,
} = require('lesscode-fp')

const is = FileStreamIn(utf8)(process.argv[2])
const os = FileStreamOut(utf8)(process.argv[3])

/**
Streaming pipeline. 
Classic example of doing pure function composition inside 2 im-pure (Monads),
which also happens to be stream.
Stream, also allows monadic composition, since it converts pure to moand, internally.
**/
$3(os)(suppercase)(is)