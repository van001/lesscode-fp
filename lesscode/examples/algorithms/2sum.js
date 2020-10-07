
/**
 * Logic is very self explanatory :
 * 1. Transform List to another List by subrtcting it from target
 * 2. Join the 2 List to obtain matching indices.
 * 3. Discard self - [0,0]
 * 4. Remove dupes - [1,2] = [2,1]
**/

const {
    $, $M, 
    sub, 
    eqNot,
    comma, s2List, 
    llift2, lmap, l2indexMap, lsort, lflat, lfilter, ljoinIndex, 
    m2keyList, 
    Print,
} = require('lesscode-fp')

const target = process.argv[3]
const nums = s2List(comma)(process.argv[2].slice(1,-1))

// Remove dupes : [ [ 1, 2 ], [ 2, 1 ] ] => [ [1,2] ]
const ldropDupes = $( lmap(lsort))

// Remove self : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ] => [ [ 1, 2 ], [ 2, 1 ] ]
const ldropSelf = lfilter(llift2(eqNot))

const subList = Print(lmap(sub(target))(nums))
$M(Print,  ldropDupes, ldropSelf, ljoinIndex(subList))(nums)
