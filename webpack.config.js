/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['react-hot-loader', 'babel-loader', 'eslint-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader', 'postcss-loader']
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
}
