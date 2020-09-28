// Generics
const print = val => { console.log(val); return val } //print
const Print = async val => print(val)
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const Trace = label => async val => { print(label); print(val); print(' '); return val } 
const hint = label => val => { print(label); return val }
const Hint = label => async val => hint(label)(val) // monadic
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const $M = (...ms) => (ms.reduce((f,g) => x => g(x)['then'](f))) // monadic composition
const $P = (...f) => (...args) => f.map(fn => fn(...args))// Executes the functions in parallel and return the result as List
const $A = func => lst => { const $$A = func => lst => count => (count == lst.length -1)? func(lst[count]) : $$A(func(lst[count]))(lst)(count+1); return $$A(func)(lst)(0)} // applicative
const assert = input => output => msg => console.assert((typeof output === 'object' && output != null) ? input.join('') === output.join('') : input === output, msg)
const memoize = f => { const cache = {}; return (...args) => { const argStr = args.join(''); return cache[argStr] = cache[argStr] || f(...args); } }
const exit = msg =>  process.exit(0)
const Wait = all => Promise.all(all)


// Equality functions
const eqNull = val => (val == null || val == undefined) ? true : false
const eqType = type => val => (typeof val == type) ? true : false
const eq = a => b => {
    if (eqType('array')(a) && eqType('array')(b)) return a.join('') === b.join('')
    if (eqType('object')(a)&& eqType('object')(b)) return a.toString() === b.toString()
    return (a === b)
}

// Mathematical functions
const max = a => b => Math.max(a,b)
const min = a => b => Math.min(a,b)
const sum = a => b => a + b

/** String **/
// Constants
const space = ' '
const blank = ''
const comma = ','
const linebreak = /\r?\n/
const utf8 = 'utf8'
const newline = '\n'
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

// Category Changers
const s2List = ptrn => str => str.split(ptrn)
const S2List = ptrn => async str => str.split(ptrn)

/** List **/
// Creator
const lcreate = start => end => lst => ( start === end ) ? lst : lcreate(start+1)(end)(lappend(lst)(start)) // Creates a List with specified range.
// Boolean
const leqEmpty = lst => lst.length == 0

// Positional
const lhead = lst => lst[0] // return the head element of the List
const ltail = lst => lst[lst.length-1]
const lat = index => lst[index]

// Mapper
const lmapA = func => lst => lst.map((val, index, lst ) => func(lst)(index)(val)) //with arity
const LmapA = func => async lst => lmapA(func)(lst)
const lmap = func => lst => lst.map(func)
const Lmap = func => async lst => lmap(func)(lst)

// Expander
const lprepend = lst1 => lst2 => lst2.concat(lst1) // prepend lst2 to lst1
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1

// Collapsers
const lremove = index => lst => lst.slice(0,index).concat(lst.slice(index+1,lst.length))
const lsliceHead = lst => (lst.length > 0) ? lst.slice(1, lst.length) : [] // slices head
const lsliceTail = lst => lst.slice(0, lst.length - 1) // slice tail
const lslice = start => end => lst = lst.slice(start, end) // slicer
const lzip = lst => lst[0].map((val, index) => [val, lst[1][index]]) // zip 2 column list 2 one column
const lflat = lst => lst.reduce((acc, val) => val.reduce( (acc2, val) => lappend(acc2)([val]) , acc),[]) // flats one level

// Category Changers - Generic
const lfold = cat => func => lst => lst.reduce((cat, val) => func(cat)(val), (cat)? cat : []) // left reducer
const lfoldr = cat => func => lst => lst.reduceRight((cat, val) => func(cat)(val), (cat)? cat : []) // right reducer 

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

// Category Changers
const l2String = sep => lst => lst.join(sep)
const L2String = sep => async lst => lst.join(sep)
const l2countMap = lst => lst.reduce((map, val) => mincr(val)(map) ,{}) //histogram
const l2indexMap = lst => lst.reduce ( (cat, val, index) => { (cat[val]) ? cat[val][index] = index : cat[val] = $(mset(index)(index))({}); return cat},{} ) // List to index Map - very helpful function to solve many problems

// Modifiers
const lsort = lst => lst.sort()
const lreverse = lfold([])(lprepend)
const lswap = pos1 => pos2 => lst => lst.slice(0, pos1). //slice to pos1
                                    concat(lst.slice(pos2, pos2 + 1)). // concat pos2
                                    concat(lst.slice(pos1 + 1, pos2)). // concat pos1+1 to pos2
                                    concat(lst.slice(pos1, pos1 + 1)). // concat pos2
                                    concat(lst.slice(pos2 + 1, lst.length)) // concat the remaining

// Map
// Positional
const mget = key => map => map[key] // retrieves the value for key
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

/** Utilities */
const crypto = require("crypto")
const hash = cipher => data => crypto.createHash(cipher).update(data).digest("hex")
const Hash = cipher => async data => hash(cipher)(data)

const fs = require('fs')
const FileStreamIn  = option => func => async file => fs.createReadStream(file, option).on('data', func); 
const FileStreamOut = option => file => async buffer => fs.createWriteStream(file,option).write(buffer)

const FileRead = option =>  name => fs.promises.readFile(name, option);
const FileWrite = option => name => data => fs.promises.writeFile(name, data, option)

const axios = require('axios')
const HttpGET = url => axios.get(url)

module.exports = {
    // Generic
    print, Print, hint, Hint, trace, Trace, 
    $, $M, $P, $A, assert, 
    memoize, Wait, exit, 
    eq, eqNull, eqType, 
    
    // Math
    max, min, sum, // Math : Calculations
    
    // String
    blank, space, comma, linebreak, utf8, newline, sha256,
    md5,                                                         // String : Constants
    shead, slen,                                                 // String : Positional 
    sappend, srepeat,                                            // String : Expanders
    sslice,                                                      // String : Collapsers                                     
    s2List, S2List,                                              // Srting : Category changers
    
    // List
    lcreate,                                                     // List : Creator
    leqEmpty,                                                    // List : Boolean
    lhead, ltail, lat,                                           // List : Positional
    lsort, lreverse, lswap ,                                     // List : Modifiers
    lmap, Lmap, lmapA,LmapA,                                     // List : Mapper & Presets
    lremove, lprepend, lappend,                                  // List : Expander
    lsliceHead, lsliceTail, lslice, lzip, lflat,                 // List : Collapsers                     
    lfold, lfoldr, lfoldZ,                                       // List : Folders & Presets
    l2String, L2String, l2countMap, l2indexMap,                  // List : Category Changers
    
    // Map
    mget, mgettwo, mlen, mheadKey, 
    mset, mincr,
    mdelete,
    m2valList, m2keyList,

    // Utilities
    hash, Hash, 
    FileStreamIn, FileStreamOut, FileRead, FileWrite,
    HttpGET,
    
}