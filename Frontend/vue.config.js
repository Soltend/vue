const aliases = require('./Src/Config/BuildHelpers/Aliases');

module.exports = {
    pages: {
        index: {
            entry: 'Src/Config/BuildHelpers/Main.js',
            template: 'Public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: {
        ...aliases,
    },
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "./Src/BaseStyles/index.scss";`
            }
        }
    },
}