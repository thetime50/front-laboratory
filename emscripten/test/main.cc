#include <iostream>
#include <emscripten.h>

int main() {
  EM_ASM(alert("hello wasm"));
  std::cout << "Hello World!" << std::endl;
}