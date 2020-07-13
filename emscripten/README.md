# emscripten
2020-07-12

使用了conda环境 不知道有没效果

download https://emscripten.org/docs/getting_started/downloads.html

https://www.cnblogs.com/tonghaolang/p/9253719.html

```shell
# 1.克隆emsdk
git clone https://github.com/juj/emsdk.git

# 2.进入emsdk文件夹
cd emsdk

# 3.更新emsdk 这里使用是git所以运行时会提示使用"git pull"
emsdk update #./emsdk update
git pull

# 4.安装最新的emsdk 并配置全局的环境变量
emsdk install --global latest

# 5.激活
emsdk activate latest

# 6.应用环境变量
emsdk_env.bat
```

验证是否安装成功
- [官方描述](https://emscripten.org/docs/building_from_source/verify_emscripten_environment.html#verifying-the-emscripten-environment)
- emcc -v 不会报错
- emcc --clear-cache 不会报错
- emcc hello_world.c 会生成三个文件

http://www.ruanyifeng.com/blog/2017/09/asmjs_emscripten.html