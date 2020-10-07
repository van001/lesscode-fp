
/**
 * Logic is very self explanatory :
 * 1. Transform List to index Map. 
 * 2. Transform the List again
 * 3. Discard self - [0,0]
 * 4. Remove dupes - [1,2] / [2,1]
**/

const {
    $, $M, $E, 
    eq, eqType, 
    sub, 
    comma, s2List, s2i,
    lapply, lmap, lfoldrA, l2indexMap, lappend, lsort, lflat, lfilter, ljoinindex,
    m2keyList, 
    Print,
} = require('lesscode-fp')

lift2 = func => lst => func(lst[0])(lst[1])
const target = process.argv[3]
const nums = s2List(comma)(process.argv[2].slice(1,-1))

// Remove dupes : [ [ 1, 2 ], [ 2, 1 ] ] => [ [1,2] ]
const removeDupes = $(lmap($(lmap(s2i), s2List(comma))), m2keyList, l2indexMap, lmap(lsort))

// Remove self : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ] => [ [ 1, 2 ], [ 2, 1 ] ]
const lunique = lfilter(lift2(eq))


const m2List = map => Object.keys(map).reduce( (cat, val ) => lappend(lapply(map[val])([val]))(cat),[])

const subList = Print(lmap(sub(target))(nums))
// nums = [3,2,4], target = 6 => [1,2]
//$M(Print, removeDupes, lfilter(unique) ,matchSum(target)(nums), l2indexMap)(nums)
$M(Print, lunique, ljoinindex(subList))(nums)
