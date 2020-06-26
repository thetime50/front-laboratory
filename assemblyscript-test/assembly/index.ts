// The entry file of your WebAssembly module.

function add(a: i32, b: i32): i32 {
  // console.log("WebAssembly add",a,b)
  return a + b;
}

export {
  add,
}
