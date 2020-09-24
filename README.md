# Overview
![Lego Kids](lego-kid.jpeg) Based on my earlier work on [Functional Thinking](https://github.com/van001/lesscode), I propose the following [functions](https://github.com/van001/lesscode-fp/blob/master/lesscode/src/index.js) (subject to change). I will be using these functions and the FP principles to build other/ future projects. So stay tuned...

In pure functional programming languages, you are either writing functions with no side effects (pure functions) or functions with 
side effects (Monads). 

- **Pure functions** : have no side-effects, are time independent & have referential integrity, which means you can replace the function with the value it produces, anytime.

- **Monads** : functions with side-effects, let you write functions that can separate concerns (decorator pattern), allow side effect (IO), introduce sequence (one after another).

- **Fewer categories** :  e.g list, tuple, map (non mutable). 

- **Immutable** : data is immutable. 

- **Single input/ output** : the origin of functional programming, ***lambda calculus***, only allowed single input/ ouput. While it may not be always practical, try to adhere by it as much.

- **Data Last** : functions that take more than one parameter,  should accept data as the last parameter.

- **Currying** : function that takes more than one parameter, curry  them (f(a, b) => f(a) -> f(b)). 
Currying allows you to partially apply other options (initialize) and dependencies (injection) that you might need for multi parameter functions.
Currying also allows you to create your own DSL (domain specifi language) by partially applying many generic functions and creating a new domain specfic one.

- **Composition** : in FP, since there is no assignment you just compose functions to produce more specific functions/ solutions.
We will be using $ / $M for pure functions / monadic composition (see examples below)

# Features
- Fewer category / data structures - string, list/tuple n map (read only).
- Built using point free style n currying.
- Composable function ($(...)/SM(...)) for both pure (no side effect) and monads (side effect).
- Functions to manipulate a given category.
- Functions to expand, collapse a given category. 
- Functions to transform one category to another.
- Built-in Monads to handle side-effects (http, file etc)

# Examples

## Algorithms

## Real-world 
**[Image Download](https://github.com/van001/lesscode-fp/tree/master/lesscode/examples/image-download)**

Download list of images specified in a file and write metadata(url, size, hash) to the specified output file.

Doing bunch of things in **Parallel**, waiting for the result and then doing something else. 
Also tolerating the failures instead of aborting on any error (if a file download fails it is ok, just write the error).

Read bottom to top, right to left
```
                    
File Write <output>  <<=    // Write to file
List 2 String        <<=     // Convert List to String
Wait                 <<=     // Wait till everything is done.
Map ()               <<=     // Parallelly, transform to List containing results.
String 2 List        <<=     // Convert to List.
File Read <input>           // Read the file

```
**'<<='**  indicate bind / join (feed output of one monad to another)

**[File Streaming](https://github.com/van001/lesscode-fp/tree/master/lesscode/examples/file-streaming)**

Streams content of a text file, converts to uppercase then write back to another stream (output file).

Sometimes input is a **streams** or too large handle in parallel.
```
 File Stream In ( File Stream Out <<= 2 UpperCase ) <input>
```



