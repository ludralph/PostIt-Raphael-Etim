const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    
    //devtool: debug ? "inline-sourcemap" : false,
    entry: "./src/main.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"

                })
            }
        
        ]
    },
    output: {
        path: __dirname + "dist",
        filename: "bundle.min.js"
    },
    plugins: [
        extractSass
    ]
    // plugins: debug ? [] : [
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.OccurrenceOrderPlugin(),
    //     new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    // ],
};
