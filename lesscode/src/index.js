// Composition
// pure
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0]

// monad ; letter M for monad, also M denotes sequence. Monadinc comosition, automatically converts pure to monad.
const $M = (...ms) => (ms.reduce((f, g) => x => (eqType('AsyncFunction')(f)) ? g(x)['then'](f) : M(g)(x)['then'](f))) 

// applicative; E for concurrency. 
const $E = (...func) => val => { 
    const apply = val => cat => f => $(lappend(cat))(Array.isArray(val) ? lmap( val => f(val))(val) : f(val))
    return $M(Wait, lfoldr([])(apply(val)))(func) // applicative
}

// stream; letter S denotes stream, also 3 indicates 3 parameters.
const $3 =  output => func => input => input($M(output,func)) 

// Equality functions
const eqNull = val => (val == null || val == undefined) ? true : false
const eqType = type => val => (typeof val == type) ? true : false
const eq = a => b => {
    if (eqType('array')(a) && eqType('array')(b)) return a.join('') === b.join('')
    if (eqType('object')(a)&& eqType('object')(b)) return a.toString() === b.toString()
    return (a === b)
}
const eqNot = a => b => !eq(a)(b)

// Mathematical functions
const max = a => b => Math.max(a,b) // max of 2 numbers
const min = a => b => Math.min(a,b) // min of 2 numbers
const sum = a => b => a + b // sum of 2 numbers
const sub = a => b => a - b // subtract one from another
const crypto = require("crypto")
const hash = cipher => data => crypto.createHash(cipher).update(data).digest("hex") // compute hash

/** String **/
// Constants
const space = ' '
const blank = ''
const comma = ','
const linebreak = /\r?\n/
const newline = '\n'
const utf8 = 'utf8'
const sha256 = 'sha256'
const md5 = 'md5'

// Positional
const shead = str => str.charAt(0)
const slen = str => str.length

// Expanders
const sappend = str1 => str2 => str1 + str2
const srepeat = count => str => { const $srepeat = acc => count => str => (count == 0) ? acc : $srepeat(sappend(str)(str))(count-1)(str) ; return $srepeat([])(count)(str)}

// Collapsers
const sslice  = start => end => str => str.slice(start,end)

// Category Changers : structure preserving
const suppercase = str => str.toUpperCase()
const slowercase = str => str.toLowerCase()

// Category Changers : non structure preserving
const s2List = ptrn => str => str.split(ptrn)
const s2i = str => parseInt(str, 0)

/** List **/
// Creator
const lcreate = start => end => lst => ( start === end ) ? lst : lcreate(start+1)(end)(lappend(lst)(start)) // Creates a List with specified range.
// Boolean
const leqEmpty = lst => lst.length == 0

// Positional
const lhead = lst => lst[0] // return the head element of the List
const ltail = lst => lst[lst.length-1]
const lat = index => lst => lst[index]
const llen = lst => lst.length
const llift = func => lst => eqType('object')(func)? [lst[0]] : func(lst[0])
const llift2 = func => lst => eqType('object')(func)? [lst[0], lst[1]] : func(lst[0])(lst[1])
const llift3 = func => lst => eqType('object')(func)? [lst[0], lst[1], lst[2]] : func(lst[0])(lst[1])(lst[2])
const llift4 = func => lst => eqType('object')(func)? [lst[0], lst[1], lst[2], lst[3]] : func(lst[0])(lst[1])(lst[2])(lst[3])

// Expander
const lprepend = lst1 => lst2 => lst2.concat(lst1) // prepend lst2 to lst1
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
const lapply = lst =>  $(lflat, lmap(val => lst.map( val2 => [val2, val]))) // apply [a,b] one lst to another list

// Collapsers
const lremove = index => lst => lst.slice(0,index).concat(lst.slice(index+1,lst.length))
const lsliceHead = lst => (lst.length > 0) ? lst.slice(1, lst.length) : [] // slices head
const lsliceTail = lst => lst.slice(0, lst.length - 1) // slice tail
const lslice = start => end => lst = lst.slice(start, end) // slicer
const lfilter = func => lst => lst.reduce( (cat, val ) => func(val) ? lappend([val])(cat) : cat , [])
const lzip = lst => lst[0].map((val, index) => [val, lst[1][index]]) // zip 2 column list 2 one column
const ljoinIndex = lst2 => lst => { // returns the matched indices [1,3] [2,3] => [1,1]
    const $join = map => lfoldrA([])(cat => index => val =>  map[val] ? lappend(lapply([index])(map[val]))(cat) : cat )
    return $($join(l2indexMap(lst2)))(lst)
}
const lflat = lst => lst.reduce((acc, val) => val.reduce( (acc2, val) => lappend(acc2)([val]) , acc),[]) // flats one level
const lsublist = indexLst => lst =>  lmap(index => lst[index])(indexLst) // given a sublist index, returns th sublist
const lcollapse = lst => lsublist($(lflat, lmap(llift([])), m2valList, l2indexMap, lmap(lsort))(lst))(lst) // removes the duplicates


// Category Changers - Generic
const lfold = cat => func => lst => lst.reduce((cat, val) => func(cat)(val), (cat)? cat : []) // left reducer
const lfoldA = cat => func => lst => lst.reduce((cat, val, index) => func(cat)(index)(val), (cat)? cat : []) // full airity
const lfoldr = cat => func => lst => lst.reduceRight((cat, val) => func(cat)(val), (cat)? cat : []) // right reducer 
const lfoldrA = cat => func => lst => lst.reduceRight((cat, val, index) => func(cat)(index)(val), (cat)? cat : []) // full airity

// folds the List based on move function which dictate the folding direction - zigzag
// move :: cat => lst => j => i -> bool ; true move left pointer, false right
const lfoldZ = cat => move => func => lst => {
    const $lfoldZ = cat => func => lst => j => i =>{
        if( i > j) return cat
        const res = func(cat)(lst)(j)(i)
        
        if(move(cat)(lst)(j)(i)) return $lfoldZ(res)(func)(lst)(j)(i+1)
        else return $lfoldZ(res)(func)(lst)(j-1)(i)
    }  
    return $lfoldZ(cat)(func)(lst)(lst.length-1)(0)
}

// Category Changers - structure preserving
const lmapA = func => lst => lst.map((val, index, lst ) => func(lst)(index)(val)) //with arity
const lmap = func => lst => lst.map(func)
const lsort = lst => lst.sort()
const lreverse = lst => lfoldr([])(lappend)(lst)
const lswap = pos1 => pos2 => lst => lst.slice(0, pos1). //slice to pos1
                                    concat(lst.slice(pos2, pos2 + 1)). // concat pos2
                                    concat(lst.slice(pos1 + 1, pos2)). // concat pos1+1 to pos2
                                    concat(lst.slice(pos1, pos1 + 1)). // concat pos2
                                    concat(lst.slice(pos2 + 1, lst.length)) // concat the remaining

// Category Changers - structure non-preserving
const l2String = sep => lst => lst.join(sep)
const l2countMap = lst => lst.reduce((map, val) => mincr(val)(map) ,{}) //histogram
const l2indexMap = lst => lst.reduce ( (cat, val, index) => { (cat[val]) ? cat[val].push(index) : cat[val] = [index]; return cat},{} ) // List to index Map - very helpful function to solve many problems

// Map
// Positional
const mget = key => map => Array.isArray(key) ? key.reduce((cat, val, index) => (map[val]) ? lappend([lappend([index])(map[val])])(cat) : cat, []) : map[key]
const mgettwo = key1 => key2 => map => map[key1][key2]
const mlen = map => map.size
const mheadKey = map => (map.size > 0) ? map.keys().next()['value'] : undefined

// Modifiers
const mset = key => val => map => { map[key] = val; return map } // set the specified key / value
const mincr = key => map => (map[key] == null)? mset(key)(1)(map) : mset(key)(mval(key)(map) +1 )(map) // incr the key value

// Compacters
const mdelete = key => map => { map.delete(key); return map}

// Category Changers
const m2valList = map => { const lst = [];  Object.keys(map).forEach( key => lst.push(map[key]));  return lst} // Map to List (values)
const m2keyList = map => Object.keys(map) // Map to List (values)
const m2List = map => Object.keys(map).reduce( (cat, key ) => lappend(lapply(map[key])([ (isFinite(key) ? Number.isInteger(key) ? parseInt(key) : parseFloat(key) : key) ]))(cat),[])

/** Monads */

// Generics
const Print =  async val => { console.log(val); return val } //print
const Trace = abel =>  async val => { Print(label); Print(val); Print(' '); return val } // trace with label
const Hint = label =>  async val => { Print(label); return val }
const Assert = input => output => async msg => console.assert((typeof output === 'object' && output != null) ? input.join('') === output.join('') : input === output, msg)
const Memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }
const M = f => async a => f(a) // convert single parameter pure function into monad
const M2 = f => a => async b =>  f(a)(b) // convert 2 parameter pure function into monad
const M3 = f => a => b => async c => f(a)(b)(c) // convert 3 parameter pure function into monad
const M4 = f => a => b => c => async d => f(a)(b)(c)(d) // convert 4 parameter pure function into monad
const Wait = all => Promise.all(all) // wait for all mondas to complete
const Lift = lst => async func => {const $lift = func => lst => count => (count == lst.length -1)? func(lst[count]) : $lift(func(lst[count]))(lst)(count+1); return $lift(func)(lst)(0)}

/** 
 All IO Mondas follow a simple rule : 
 - 1st parameter is option (if any). Option let's you configure the monad.
 - 2nd parameter is name. (if any). 
 - 3rd paramter is function, if any.
**/

// Arg - command line argument monad
const Argv =  name =>  async process => { if(process.argv[name])  return eval(process.argv[name]); else  throw `400 : missing parameter ${name-1}` }

// File
const fs = require('fs')
const FileRead = option =>  name => fs.promises.readFile(name, option);
const FileWrite = option => name => data => fs.promises.writeFile(name, data, option)
const FileStreamIn  = option => name => async func => fs.createReadStream(name, option).on('data', func)
const FileStreamOut = option => name => async buffer => fs.createWriteStream(name, option).write(buffer)

// Dir
const DirStream = option =>  name  => async func => {
    for await (const file of  await fs.promises.opendir(`${name}`)) {
        $M(func)(`${name}/${file.name}`)
    }
}

// Http
const axios = require('axios')
const HttpGET = option => url => axios((option) ? {...option, method : 'get', url} : {method : 'get', url})
const HttpPOST = option => url => axios((option) ? {...option, method : 'post', url} : {method : 'post', url})
const ExtractData = async data => data.data

module.exports = { 
    // Composition
    $, $M, $E, $3, 
    
    // Equality
    eq, eqNull, eqType, eqNot, 
    
    // Math
    max, min, sum, sub, hash,                                    // Math : Calculations
    
    // String
    blank, space, comma, linebreak, utf8, newline, sha256,
    md5,                                                         // String : Constants
    shead, slen,                                                 // String : Positional 
    sappend, srepeat,                                            // String : Expanders
    sslice,                                                      // String : Collapsers   
    suppercase, slowercase,                                      // String " Structure preserving                                                                     
    s2List, s2i,                                                 // Srting : Category changers                                                       
    
    // List
    lcreate,                                                     // List : Creator
    leqEmpty,                                                    // List : Boolean
    lhead, ltail, lat, llen,                                     // List : Positional
    llift, llift2, llift3, llift4,
    lsort, lreverse, lswap ,                                     // List : Modifiers
    lmap, lmapA,                                                 // List : Mapper & Presets
    lremove, lprepend, lappend, lapply,                          // List : Expander
    lsliceHead, lsliceTail, lslice, lfilter, lzip,               // List : Collapsers    
    ljoinIndex, lflat, lsublist, lcollapse,                
    lfold, lfoldA, lfoldr, lfoldrA, lfoldZ,                      // List : Folders & Presets
    l2String, l2countMap, l2indexMap,                            // List : Category Changers
    
    // Map
    mget, mgettwo, mlen, mheadKey, 
    mset, mincr,
    mdelete,
    m2valList, m2keyList, m2List,

    //************* Monads *******************
    // Generic
    Print, Hint, Trace, Assert, Memoize, M, M2,
    M3, M4, Wait, Lift,

    // Argv
    Argv, 
    
    //File
    FileStreamIn, FileStreamOut, FileRead, FileWrite,
    
    // Dir
    DirStream,
    
    // Http
    HttpGET, HttpPOST, ExtractData
    
}