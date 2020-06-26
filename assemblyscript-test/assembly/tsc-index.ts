// The entry file of your WebAssembly module.

export function add(a: number, b: number): number {
  console.log("WebAssembly add",a,b)
  return a + b;
}

console.log("*",add(1,2))