const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.argv.indexOf('-p') !== -1;

const plugins = [
    // remove Typescript's remporary JS and MAP files
    new CleanWebpackPlugin(['Scripts/**/*.js', 'Scripts/**/*.js.map'], {
        root: path.resolve('.'),
        verbose: false,
        dry: false
    })
];

if (isProduction) {
    // propagate production setting to the plugins
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
}

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    entry: path.resolve('./Scripts/main.tsx'),
    output: {
        filename: path.resolve('./wwwroot/scripts/app.js')
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts'
            }
        ]
    },
    plugins
};