
/**
 * Logic is very self explanatory :
 * 1. Transform List to another List by subracting it from the target : lmap(sub)
 * 2. Join the 2 List to obtain matching indices : ljoinIndex
 * 3. Remove dupes - [[1,2], [2,1]] => [[1,2]] : lcollapse
 * 4. Discard self - [[0,0]] => []

**/

const {
    $M, 
    sub, 
    eqNot,
    comma, s2List, 
    lcollapse, llift2, lmap, lflat, lfilter, ljoinIndex, 
    Print,
} = require('lesscode-fp')

const target = process.argv[3]
const nums = s2List(comma)(process.argv[2].slice(1,-1))

// Remove self : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ] => [ [ 1, 2 ], [ 2, 1 ] ]
const ldropSelf = lfilter(llift2(eqNot))

// Transform List to sublist with subtraction
const subList = lmap(sub(target))(nums)

// [3,3] / 6 =>  [1,1]
$M(Print, lflat, ldropSelf, lcollapse, ljoinIndex(subList))(nums) 
