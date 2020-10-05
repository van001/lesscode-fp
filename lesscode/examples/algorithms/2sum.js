const { min, max, Print} = require('lesscode-fp')
const { $, $M, Wait, lmap, sum, lfoldr, lappend, HttpGET} = require('../../src')


const $A = (...func) => lst => {
    const apply = lst => cat => f => $(lappend(cat))((lmap( val => f(val))(lst)))
    return $M(Wait, lfoldr([])(apply(lst)))(func) // applicative
}

$A(HttpGET)(['https://www.google.com','https://www.yahoo.com']).then(Print)
