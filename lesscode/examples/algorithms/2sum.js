const {$M, Wait, sum, Print, lmap, HttpGET} = require('lesscode-fp')

const M = f => async a => f(a)
const M2 = f => a => async b =>  f(a)(b)
const M3 = f => a => b => async c => f(a)(b)(c)
const M4 = f => a => b => c => async d => f(a)(b)(c)(d)

const Apply = lst => async func => {const $apply = func => lst => count => (count == lst.length -1)? func(lst[count]) : $apply(func(lst[count]))(lst)(count+1); return $apply(func)(lst)(0)}

const $A = (...func) => lst => $M(Wait,lmap(Apply(lst)))(func) // applicative


$A(sum, M2(sum))([2,4]).then(Print)
