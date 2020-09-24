# Overview
![Lego Kids](lego-kid.jpeg) Based on my earlier work on [Functional Thinking](https://github.com/van001/lesscode), I propose the following [functions](https://github.com/van001/lesscode-fp/blob/master/src/index.js) (subject to change). I will be using these functions and the FP principles to build other/ future projects. So stay tuned...

- In pure functional programming languages, you are either writing functions with no side effects (pure functions) or functions with 
side effects (Monads). 

- **Pure functions** (no side-effect) are time independent & have referential integrity, which means you can replace the function with the value it will produce, anytime.

- **Monads** (functions with side-effects) lets you write functions that can separate concerns (decorator pattern), allow side effect (IO), introduce sequence (one after another).

- In pure FP you have **fewer categories** (data structures). e.g list, tuple, map (non mutable). 

- In pure FP your data is **immutable** and there is technically no assignment. You are either naming your
data and functions or composing them.

- The origin of functional programming, Lambda calculus, only allowed **single input/ output**. While it may not be always practical, try to adhere by it as much.
If there is more than one input then make sure you adhere to **data last** principle. Any function you write has to accept some input which it uses/manipulate to generate an output, make them last. 

- Use **currying** if your function takes more than one parameter. Currying allows you to partially apply data that you might need for multi parameter functions. Currying allows you to create your own DSL (domain specifi language) by partially applying many generic functions.

- Programming in general is about **composibility** (re-useability). In FP, you live and die by it. You should be able to compose functions to produce more specific functions.

# Features
- Fewer category/ data structures - string, list n map (read only).
- Built using point free style n currying.
- Composable function ($(...)/SM(...)) for both pure (no side effect) and monads (side effect).
- Functions to manipulate a given category.
- Functions to expand, collapse a given category. 
- Functions to transform one category to another.
- Built-in Monads to handle side-effects (http, file etc)

# Examples

## Algorithms

## Complex ##
**[Image Download](https://github.com/van001/lesscode-fp/tree/master/examples/image-download)**

Download list of images specified in a file and write metadata to the specified output file.

**Parallel**, here you are doing bunch things parallely, waiting for the result and then doing something else. 

Read bottom to top, right to left
```
output.txt 
<<= File Write <<= List 2 String  // Convert the list to String and write to file
<<= Wait                          // Wait till every thing is done.
<<= Map ()                        // Transform the List to List containing result
<<= String 2 List <<= File Read   // Read and convert to List
<<= input.txt                     // input file
```
**'<<='**  indicate bind / join (feed output of one monad to another)

**[File Streaming](https://github.com/van001/lesscode-fp/tree/master/examples/file-streaming)**

Streams content of a text file, converts to uppercase then write back to another stream (output file).
```
 File Stream In ( File Stream Out <<= 2 UpperCase )
```



