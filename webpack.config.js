const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, './src', 'index.tsx')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'YaroshUlad',
            filename: "index.html",
            template: "./public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({React: 'react'})
    ],
    devtool: 'eval-cheap-source-map',
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        static :"./",
        hot: true,
        port: 3001,
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
                type: 'asset/resource',
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    }
}