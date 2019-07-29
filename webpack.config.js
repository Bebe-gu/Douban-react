const path = require('path')
//导入内存生成index页面
const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件目录
    filename: 'index.html' //根据源文件目录生成内存中的index.html
})

module.exports = {
    mode: 'development', // development 和 production
    plugins: [
        htmlPlugin
    ],
    module: { //第三方模块配置
        rules: [{
            test: /\.js|jsx$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss$/,
            // npm style-loader sass-loader node-sass
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    //modules开启模块化限制样式权限，localIdentName自定义类名
                    modules: {
                        localIdentName: '[path][name]-[local]-[hash:base64:5]'
                    }
                }
            }, 'sass-loader']
        },
        {
            //npm url-loader file-loader
            test: /\.ttf|woff|woff2|eot|svg$/,
            use: 'url-loader'
        },
        {
            //npm url-loader file-loader
            test: /\.jpg|png|bmp|gif|jpeg$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'images/[hash:8]-[name].[ext]',
                    limit: 50000
                    // outputPath: './dist/images'
                }
            }]
        }
        ]
    },
    //省略扩展名
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        //配置总体引用路径
        alias: {
            '@': path.join(__dirname, './src')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, './src')

    }
}