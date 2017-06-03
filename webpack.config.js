const path = require('path');

const entry_path=path.resolve(__dirname, 'src/js/index.js');
const output_path=path.resolve(__dirname, "dist");

module.exports = {
  entry: entry_path, // string | object | array
  output: {
    path: output_path, // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "bundle.js", // string
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    publicPath: "/assets/", // string
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
          presets: ["es2015","react"]
        },
      },
    ],
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  },
}
