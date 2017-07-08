

//var Et = require('easytemplatejs');

// local test
var Et = require('../dist/easy.templatejs.min');

console.info('Hello');

var compiled=Et.template("Hello {=name}");
console.info(compiled({
    name:'MoMo'
}));

var compiled2=Et.template("%{ out(1+5*3); }%");
console.info(compiled2())