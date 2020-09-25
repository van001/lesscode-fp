# Overview
![Lego Kids](lego-kid.jpeg) Based on my earlier work on [Functional Thinking](https://github.com/van001/lesscode), I propose the following [functions](https://github.com/van001/lesscode-fp/blob/master/lesscode/src/index.js) (subject to change). I will be using these functions and the FP principles to build other/ future projects. So stay tuned...

In pure functional programming languages, you are either writing functions with no side effects (pure functions) or functions with 
side effects (Monads). 

# Features

### Pure functions ### 
Have no side-effects, are time independent & have referential integrity, which means you can replace the function with the value it produces, anytime. Think them
as a mathematical function, which for a given input will awlays produce the same output.
```
// appends string to another string and returns a new string
const sappend = str1 => str2 => str1 + str2 

// checks if a value is null or not?
const eqNull = val => (val == null || undefined) ? true : false 

// Find the max of 2 munmers
const max = a => b => Math.max(a,b)
```

### Immutable ###
In functional programming you do not mutate data, instead you compute a new

```
// appends string to another string and returns a new string
const sappend = str1 => str2 => str1 + str2 

```

### Single input/ output ### 
The origin of functional programming, ***lambda calculus***, only allowed single input/ ouput. While it may not be always practical, try to adhere by it as much.

### Data Last ###
Functions that take more than one parameter,  should accept data as the last parameter.

### Currying ### 
Function that takes more than one parameter, curry  them (f(a, b) => f(a) -> f(b)). 
Currying allows you to partially apply other options (initialize) and dependencies (injection) that you might need for multi parameter functions.
Currying also allows you to create your own DSL (domain specifi language) by partially applying many generic functions and creating a new domain specfic one.

### Fewer categories ### 
string list, tuple, map (non mutable). Functions to manipulate those categories. Also functions to change from one category to another.

```
```

### Monads ### 
Functions with side-effects. Let you write functions that can separate concerns (decorator pattern), allow side effect (IO), introduce sequence. Lesscode implement monads using promise/ async. It also provides a monadic version of all the pure fucntion, so that you can seamlessly use it with [monadic composition]((https://github.com/van001/lesscode-fp#Composition)). 

```
// Read content of a file. 
const FileRead = option => async name => fsp.readFile(name, option);
```

### Composition ### 
In functional programming there is no assignment you just compose functions to produce more specific functions/ solutions.
We will be using $ / $M for pure functions / monadic composition (see [examples](https://github.com/van001/lesscode-fp#examples) below)

# Examples

## Algorithms
Coming soon...

## Real-world 

### Parallel ###

![Parallel](parallel.png) Doing bunch of things in parallel, waiting for the result and then doing something else. 
Also tolerating the failures instead of aborting on any error (if a file download fails it is ok, just write the error).

**[Image Download](https://github.com/van001/lesscode-fp/tree/master/lesscode/examples/image-download)**

Download list of images specified in a file and write metadata(url, size, hash) to the specified output file.



input.txt
```
http://i.imgur.com/c2z0yhtx.jpg
http://i.imgur.com/KxyEGOn.jpg
http://i.imgur.com/vPae8qL.jpg
http://i.imgur.com/cz0yhtx.jpg
```

output.txt
```
http://i.imgur.com/c2z0yhtx.jpg 0  Error%3A%20Request%20failed%20with%20status%20code%20404
http://i.imgur.com/KxyEGOn.jpg 470489 cc042826ed386d4247aca63cb7aff54b37acb1f89ce8f4549ac96a9e8683360c
http://i.imgur.com/vPae8qL.jpg 69085 bde0a62bb35dffe66cebf6cfd9ca3841ca1419fb323281bd67c86145f2173207
http://i.imgur.com/cz0yhtx.jpg 2464218 ed9f8c1e95d58e02fcf576f64ec064a64bc628852bc3b298cda15f3e47dfe251
```

```
// Lesscode-fp
const { 
    $, $M, Hint, Trace, print, hash, Lmap, Wait, mget, exit, mgettwo, 
    linebreak, utf8, newline,  
    L2String, S2List, 
    FileRead, FileWrite,
    HttpGET } = require('lesscode-fp')


const inputFile = process.argv[2]
const outputFile = process.argv[3]

// processFile :: String -> String
const processURL = name => {
    const computeHash = $(hash('sha256'), mget('data'))
    const contentLen = mgettwo('headers')('content-length')
    const LogData = name => async data => `${name} ${contentLen(data)} ${computeHash(data)}`
    const LogErorr = name =>  async err => `${name} 0  ${escape(err)}`
    return $M(
        Trace(`Extracted metadata...............`), LogData(name),      // Success
        Hint(`Downloaded ${name}................`), HttpGET)(name)
        .catch($(Trace(`[Fail] : ${name}........`), LogErorr(name)))    // Failure
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

```
### Streaming ###

Sometimes, input is a **stream** or needs to be handled in chunk.

**[File Streaming](https://github.com/van001/lesscode-fp/tree/master/lesscode/examples/file-streaming)**

Streams content of a text file, converts to uppercase then write back to another stream (output file).



input.txt (the real file may be huge...)
```
this text is all lowercase. please turn it into to uppercase.
```

output.txt
```
THIS TEXT IS ALL LOWERCASE. PLEASE TURN IT INTO TO UPPERCASE.
```

```
const { $M, print, utf8, FileStreamIn, FileStreamOut} = require('lesscode-fp')

const Uppercase = async str => str.toUpperCase()
const SaveFile = name => FileStreamOut(utf8)(name)

// Process Stream
const ProcessStream = $M(SaveFile(process.argv[3]),Uppercase)

// Pipeline
FileStreamIn(utf8)( ProcessStream )(process.argv[2]).catch(print)
```



