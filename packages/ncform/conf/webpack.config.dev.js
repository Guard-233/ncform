const path = require("path");
const config = require("./config");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

  mode: 'development',

  entry: {
    vueNcform: path.join(config.src, "components", "vue-ncform", "index.js")
  },

  output: {
    path: config.dist,
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    library: "[name]",
    libraryTarget: "umd",
    umdNamedDefine: true
  },

  externals: {
    vue: {
      root: "Vue",
      commonjs2: "vue",
      commonjs: "vue",
      amd: "vue"
    },
    axios: {
      root: "axios",
      commonjs2: "axios",
      commonjs: "axios",
      amd: "axios"
    },
    "@f-loat/ncform-common": {
      root: "ncformCommon",
      commonjs2: "@f-loat/ncform-common",
      commonjs: "@f-loat/ncform-common",
      amd: "ncformCommon"
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        include: [config.src]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [config.src].concat(config.babelModules)
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "img/[name].[ext]"
        },
        include: [config.src]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
};
