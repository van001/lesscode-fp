# Overview
Based on my earlier work on [Functional Thinking](https://github.com/van001/lesscode), I propose the the following [functions](https://github.com/van001/lesscode-fp/blob/master/src/index.js). I will be using these functions and the FP principles to build other/ future projects. So stay tuned...

- In pure functional programming langiages, you are either writing functions with no side effects (pure functions) or functions with 
side effects (Monads). So anytime you are writing a function that is doing some IO, you are essentially writing a Monad.

- In pure FP you have fewer categories (data structures). e.g Primitives like numbers/ characters, list, tuple, map (non mutable). 

- The origin of functional programming (Lambda calculus) only allowed single input/ output. While it may not be practical always, try to adhere by it as much.
If there is more than one input then make sure you adhere to data last principal. Any function you write has to accept some input which it uses/manipulate to generate an output, make them last. 

- Use currying if your function takes more than one parameter. Currying allows you to partially apply data that you might need for multi paramter functions.

- Programming in general is about composibility (re-useability). In FP, you live and die by it. You should be able to compose functions to produce more specific functions.

- Functional programming is all about generalization and writing time indepndent code. Concepts of category theory like functors and mondas are handy.

# Features
- Fewer category/ data structures - string, list n map (read only).
- Built using point free style n currying.
- Provides composable function for both pure (no side effect) and monads (side effect).
- Functions to manipulate a given category.
- Functions to expand, collapse a given gategory. 
- Functions to transform one category to another.

# Examples
