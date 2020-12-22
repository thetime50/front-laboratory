
module.exports = {
    // css: {
    //   loaderOptions: {
    //     // 给 sass-loader 传递选项
    //     sass: {
    //       // @/ 是 src/ 的别名
    //       // 所以这里假设你有 `src/variables.scss` 这个文件
    //       data: `
    //                 @import "@/style/theme.scss";
    //       `
    //     }
    //   }
    // }

    //https://blog.csdn.net/zxb89757/article/details/103256614
    //cnpm install --save sass-resources-loader
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    // 要公用的scss的路径
                    resources: './src/style/theme.scss'
                })
                .end()
        })
    },

    publicPath: "./",//vue-cli 4.x //不知道el icon会不会正常
}