const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/ },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'index_bundle.js',
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/data.json', to: 'data.json' },
            // { from: 'src/img/', to: 'img/' },
        ]),
    ],
}
