
/**
 * Solution includes FP approach/ styling - composition, data last, pure functions (as much), point free, currying.
 * 
 * Logic is very self explanatory :
 * 1. Convert List to index Map. 
 * 2. Find the 1st matching key (value) form the map, whose sum matches the item + key.
 * 3. Discard self - [0,0]
 * 4. Remove dupes - [1,2] / [2,1]
**/

const {
    $, 
    eq,
    sub, 
    comma, blank, s2List, s2i,
    lapply, lmap, lfoldrA, l2indexMap, lappend, lsort, lflat, lfilter,
    m2keyList, 
    Print,
    lfold
} = require('lesscode-fp')

const target = process.argv[3]
const nums = s2List(comma)(process.argv[2].slice(1,-1))

// convert List 2 Map :  { '2' : [1], '3' :[0], '4' : [2]}
const map = l2indexMap(nums) 

// Remove dupes : [ [ 1, 2 ], [ 2, 1 ] ] => [ [1,2] ]
const removeDupes = $(lmap($(lmap(s2i), s2List(comma))), m2keyList, l2indexMap, lmap(lsort))

// Remove self : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ] => [ [ 1, 2 ], [ 2, 1 ] ]
const unique = lst => !eq(lst[0])(lst[1])

// Return the maching list of indexes : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ]
const matchSum = sum => map => lfoldrA([])(cat => index => val =>  map[sub(sum)(val)] ? lappend(lapply([index])(map[sub(sum)(val)]))(cat) : cat )

// nums = [3,2,4], target = 6 => [1,2]
$(Print, lflat, removeDupes, lfilter(unique) ,matchSum(target)(map))(nums)
