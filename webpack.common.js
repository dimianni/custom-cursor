const path = require('path');

// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://webpack.js.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'js/[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // https://webpack.js.org/guides/asset-modules/
        // Doesn't put hashes and exports to images folder 
        assetModuleFilename: 'images/[name][ext]',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // Places js at the end of body tag
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            // changing output directory to 'css' folder
            filename: 'css/[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                // for performance 
                include: path.resolve(__dirname, 'src'),
                use: [
                    // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
                    MiniCssExtractPlugin.loader,
                    // Reads CSS imports in JS files. Interprets @import and url() like import/require() and resolves them.
                    'css-loader',
                    // Adds autoprefixes
                    'postcss-loader',
                    // Loads a Sass/SCSS file and compiles it to CSS.
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/i,
                type: 'asset/resource',
                // places fonts into corresponding folder
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
        ]
    },
}