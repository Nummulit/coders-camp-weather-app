const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',  // Creates `style` nodes from JS strings
                'css-loader',  // Translates CSS into CommonJS
                'sass-loader',  // Compiles Sass to CSS
            ],
        },
        {
            test: /\.css$/,
            use: [
                "style-loader",  // Creates `style` nodes from JS strings
                "css-loader",  // Translates CSS into CommonJS
            ],
        },
        {
            test: /\.html$/,
            use: ["html-loader"]
        },
        {
            test: /\.(svg|png|jpe?g|gif)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]",
                    outputPath: "imgs"
                }
            },
        }
    ]},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}