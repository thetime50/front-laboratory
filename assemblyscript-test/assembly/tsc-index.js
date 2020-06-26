"use strict";
// The entry file of your WebAssembly module.
exports.__esModule = true;
exports.add = void 0;
function add(a, b) {
    console.log("WebAssembly add", a, b);
    return a + b;
}
exports.add = add;
console.log("*", add(1, 2));
