const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

// https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#minify
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
        // Creates a vendors file (code is not duplicated)
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    name: 'vendors'
                }
            }
        },
    }
})