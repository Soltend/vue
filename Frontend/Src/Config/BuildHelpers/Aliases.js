const { resolve } = require('path');

module.exports = {
    resolve: {
        alias: {
            'Config': resolve(__dirname, '../../Config'),
            'Utils': resolve(__dirname, '../../Utils'),
            'Pages': resolve(__dirname, '../../Pages'),
            'Assets': resolve(__dirname, '../../BaseAssets'),
            'Api': resolve(__dirname, '../../Api'),
        },
        extensions: ['.js', '.ts', '.tsx', '.json', '.vue', '.scss', '.css'],
    },
};