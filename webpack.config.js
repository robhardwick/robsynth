const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'index.min.js'
    },
    module: {
        rules: [{
            test: /\.svg$/,
            use: {
                loader: 'react-svg-loader',
                options: {
                },
            },
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            [
                                '@babel/plugin-proposal-decorators',
                                {legacy: true},
                            ]
                        ],
                    },
                },
                {
                    loader: 'eslint-loader',
                },
            ],
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    performance: {
        hints: false
    },
    mode: 'production'
}