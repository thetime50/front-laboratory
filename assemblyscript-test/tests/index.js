const assert = require("assert");
const myModule = require("..");
assert.equal(myModule.add(1, 2), 3);
console.log(myModule.add(1, 2))
console.log("ok");
