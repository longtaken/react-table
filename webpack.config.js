const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entry_path=path.resolve(__dirname, 'src/js/index.js');
const output_path=path.resolve(__dirname, "dist");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: entry_path, // string | object | array
  output: {
    path: output_path, // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "bundle.js", // string
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    //publicPath: "/assets/", // string
    // 输出解析文件的目录，url 相对于 HTML 页面
  },
  module: {
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include
        loader: "babel-loader",
        options: {
          presets: ["env","react"],
          plugins: ['transform-runtime']
        },
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
          }
        ]
      },
    ],
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  plugins: [
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.html',
      title: 'table',
      favicon:'./src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true,
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！
      inject: 'body'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ],
  devtool: "eval-source-map",
}
