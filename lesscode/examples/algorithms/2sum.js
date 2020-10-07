
/**
 * Logic is very self explanatory :
 * 1. Transform List to another List by subratcting it from target
 * 2. Zip the 2 List to obtain matching indices.
 * 3. Discard self - [0,0]
 * 4. Remove dupes - [1,2] = [2,1]
**/

const {
    $, $M, $E, 
    eq, eqType, 
    sub, 
    comma, s2List, s2i,
    lapply, lmap, lfoldrA, l2indexMap, lappend, lsort, lflat, lfilter, lzipMatchingIndex,
    Print,
} = require('lesscode-fp')

const llift2 = func => lst => func(lst[0])(lst[1])
const llift3 = func => lst => func(lst[0])(lst[1])(lst[2])
const llift4 = func => lst => func(lst[0])(lst[1])(lst[2])(lst[3])

const target = process.argv[3]
const nums = s2List(comma)(process.argv[2].slice(1,-1))

const m2List = map => Object.keys(map).reduce( (cat, key ) => lappend(lapply(map[key])([ (isFinite(key) ? Number.isInteger(key) ? parseInt(key) : parseFloat(key) : key) ]))(cat),[])
const m2keyList = map => lmap( key => (isFinite(key) ? Number.isInteger(key) ? parseInt(key) : parseFloat(key) : key) )(Object.keys(map)) // Map to List (values)

// Remove dupes : [ [ 1, 2 ], [ 2, 1 ] ] => [ [1,2] ]
const removeDupes = $(m2keyList, l2indexMap, lmap(lsort))

// Remove self : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ] => [ [ 1, 2 ], [ 2, 1 ] ]
const lunique = lfilter(llift2(eq))



const subList = Print(lmap(sub(target))(nums))
// nums = [3,2,4], target = 6 => [1,2]
//$M(Print, removeDupes, lfilter(unique) ,matchSum(target)(nums), l2indexMap)(nums)
$M(Print, lunique, lzipMatchingIndex(subList))(nums)
//$M(Print, m2List, l2indexMap)(nums)
//console.log(Number(3.0))