
/**
 * Logic is very self explanatory :
 * 1. Making every item in the List as target find 2sum that satify the criteria for 3sum
**/

const {
    $, 
    sub, 
    eqNot,
    comma, s2List, 
    lcollapse, llift2, llift3, lmap, lfilter, ljoinIndex, lfoldA, lappend,
    Print,
} = require('lesscode-fp')

const target = process.argv[3]
const nums = s2List(comma)(process.argv[2].slice(1,-1))

// [3,3] / 6 =>  [1,1]
const twoSum = nums => target => {

    // Remove self : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ] => [ [ 1, 2 ], [ 2, 1 ] ]
    const ldropSelf = lfilter(llift2(eqNot))

    // Transform List to sublist with subtraction
    const subList = lmap(sub(target))(nums)

    return $(ldropSelf, lcollapse, ljoinIndex(subList))(nums) 
}

const threeSum = nums => target =>{
    const subList = Print(lmap(sub(target))(nums))
    //  [[ 3, 3, 5 ]] => []
    const ldropSelf = lfilter(llift3( a => b => c => a != b  && a != c && b != c))
    const all2Sum = lfoldA([])(cat => index => val => $(lappend(cat),lmap(lappend([index])),twoSum(nums))(val))
    return $(Print, ldropSelf, lcollapse, all2Sum)(subList)
} 

threeSum( [-1,0,1,2,-1,-4])(0)
