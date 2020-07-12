
https://www.assemblyscript.org/  
https://www.assemblyscript.org/introduction.html

```cmd
npm init

npm install --save @assemblyscript/loader
npm install --save-dev assemblyscript

npx asinit .

:: 编译
npm run asbuild
```


```
Version: 0.12.4

This command will make sure that the following files exist in the project
directory 'D:\self\html\front-laboratory\assemblyscript-test':

  ./assembly
  Directory holding the AssemblyScript sources being compiled to WebAssembly.

  ./assembly/tsconfig.json
  TypeScript configuration inheriting recommended AssemblyScript settings.

  ./assembly/index.ts
  Example entry file being compiled to WebAssembly to get you started.

  ./build
  Build artifact directory where compiled WebAssembly files are stored.

  ./build/.gitignore
  Git configuration that excludes compiled binaries from source control.

  ./index.js
  Main file loading the WebAssembly module and exporting its exports.

  ./tests/index.js
  Example test to check that your module is indeed working.

  ./package.json
  Package info containing the necessary commands to compile to WebAssembly.

The command will try to update existing files to match the correct settings
for this instance of the compiler in 'D:\self\html\front-laboratory\assemblyscript-test\node_modules\assemblyscript'.
```