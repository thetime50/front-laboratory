# laboratory

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/zh/config/).


## vuecli2 对比 vuecli4

vuecli2
```
package.json
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        const config = require('../config'); config.dev;

    "build": "node build/build.js"
        const webpackConfig = require('./webpack.prod.conf')
            new webpack.DefinePlugin({
                'process.env': require('../config/prod.env')
            }),
        const config = require('../config') ; config.build;

```

| vuecli2 | vuecli4 |
| :-- | :-- |
| static | public |
| /config/\[mode].env.js | /.env.[mode] /.env.[mode].local |
| /build/webpack.\[mode].conf.js | vue.config.js |


node 16.14.0
