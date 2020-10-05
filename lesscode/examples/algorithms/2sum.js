const { min, max, Print} = require('lesscode-fp')
const { $A, sum, HttpGET} = require('../../src')


$A(sum(3), sum(2))([1,2,4]).then(Print)
//$A(HttpGET)(['https://www.google.com','https://www.yahoo.com']).then(Print)
