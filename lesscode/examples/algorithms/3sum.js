
/**
 * Logic is very self explanatory :
 * 1. Making every item in the List as target find 2sum that satify the criteria for 3sum
**/

const {
    $,$M,
    sub,
    eqNot,
    comma, s2List, 
    lcollapse, llift2, llift3, lmap, lfilter, ljoinIndex, lfoldA, lappend,
    Print,
    $E,
} = require('lesscode-fp')

const Argv =  index =>  async process => { if(process.argv[index])  return eval(process.argv[index]); else  throw `400 : missing parameter ${index-1}` }


// [3,3] / 6 =>  [1,1]
const twoSum = nums => target => {

    // Remove self : [ [ 0, 0 ], [ 1, 2 ], [ 2, 1 ] ] => [ [ 1, 2 ], [ 2, 1 ] ]
    const ldropSelf = lfilter(llift2(eqNot))

    // Transform List to sublist with subtraction
    const subList = lmap(sub(target))(nums)

    return $(ldropSelf, lcollapse, ljoinIndex(subList))(nums) 
}

const threeSum = nums => target =>{

    //  [[ 3, 3, 5 ]] => []
    const ldropSelf = lfilter(llift3( a => b => c => a != b  && a != c && b != c))
    const all2Sum = lfoldA()(cat => index => val => $(lappend(cat),lmap(lappend([index])),twoSum(nums))(val))
    return $(ldropSelf, lcollapse, all2Sum,lmap(sub(target)))(nums)
} 

// Use applicatve to read arguments form command-line and pass it to
// threeSum by lifting the parameters form List
$M(Print,llift2(threeSum),$E(Argv(3),Argv(2)))(process).catch(Print)

