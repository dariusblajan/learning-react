const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PROD = process.env.NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
    filename: 'style.css',
    disable: PROD // enable only in prod
});

module.exports = {
    entry:  {
        main: [
            'react-hot-loader/patch',
            `${__dirname}/src/index.js`
        ]
    },

    devServer: {
        hot: !PROD,
        historyApiFallback: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        extractSass
    ],

    module: {
        rules: [
            { 
                test: /\.jsx?$/, 
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }]
                }),
            }, {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                }),
            }
        ]
    },

    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js',
        publicPath: '/'
    },
};
