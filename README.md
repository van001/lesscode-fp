# Overview
![Lego Kids](lego-kid.jpeg) Based on my earlier work on [Functional Thinking](https://github.com/van001/lesscode), I propose the the following [functions](https://github.com/van001/lesscode-fp/blob/master/src/index.js). I will be using these functions and the FP principles to build other/ future projects. So stay tuned...

- In pure functional programming languages, you are either writing functions with no side effects (pure functions) or functions with 
side effects (Monads). 

- Pure functions have refrential integrity, , means you should be able to repalce with execution of a function with the value it will produce, anytime.

- Monads lets you write functions that can separate concerns (decorator pattern), allow side effect (IO), introduce sequence (one after another).

- In pure FP you have fewer categories (data structures). e.g Primitives like numbers/ characters, list, tuple, map (non mutable). In a nutshell your data is immutable.

- The origin of functional programming, Lambda calculus, only allowed single input/ output. While it may not be practical always, try to adhere by it as much.
If there is more than one input then make sure you adhere to data last principle. Any function you write has to accept some input which it uses/manipulate to generate an output, make them last. 

- Use currying if your function takes more than one parameter. Currying allows you to partially apply data that you might need for multi parameter functions. Currying allows you to create your own DSL (domain specifi language) by partially applying many generic functions.

- Programming in general is about composibility (re-useability). In FP, you live and die by it. You should be able to compose functions to produce more specific functions.

# Features
- Fewer category/ data structures - string, list n map (read only).
- Built using point free style n currying.
- Provides composable function ($(...)/SM(...)) for both pure (no side effect) and monads (side effect).
- Functions to manipulate a given category.
- Functions to expand, collapse a given category. 
- Functions to transform one category to another.
- Built-in Monads to handle side-effects (http, file etc)

# Examples

- [Image Download](https://github.com/van001/lesscode-fp/tree/master/examples/image-download) : Download list of images specified in a file and write metadata to the specified output file.
