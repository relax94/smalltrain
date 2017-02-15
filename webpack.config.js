/**
 * Created by Dmytro.Pavlenko on 15.02.2017.
 */

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss']
    },
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
              test: /\.scss$/,
                use: ['style-loader', 'css-loader?localIdentName[path][name]--[local]', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                use: ['imports-loader?jQuery=jquery'],
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/font-woff'],
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/font-woff2'],
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/octet-stream'],
            }, {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/font-otf'],
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader'],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=image/svg+xml'],
            }
            ,
            {
                test: /\.png$/,
                use: ['file-loader?name=[name].[ext]'],
            }
            ,
            {
                test: /\.jpg$/,
                use: ['file-loader?name=[name].[ext]'],
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    }
    ,
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        })
    ]
}
