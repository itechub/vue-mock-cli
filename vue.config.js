const CompressionPlugin = require('compression-webpack-plugin')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const env = require('./env.js')
const path = require('path')
const fs = require('fs')

const projectRoot = path.resolve(__dirname, './')

let proxy = {}
let urlLength = env.proxy_server_url.length
if (!env.is_server) {
  for (let i = 0; i < urlLength; i++) {
    proxy[env.proxy_server_url[i] + '$'] = {
      target: env.server_url,
      changeOrigin: true
    }
  }
}
proxy['/*'] = {
  target: env.is_server ? env.server_url : env.locale_url,
  changeOrigin: true
}
console.log(proxy)

const readDir = fs.readdirSync("./src/pages")
let pages = {}
for (let i = 0; i < readDir.length; i++) {
  let name = readDir[i]
  pages[name] = {
    // entry for the page
    entry: `src/pages/${name}/${name}.js`,
    // the source template
    template: `src/pages/${name}/${name}.html`,
    // output as dist/index.html
    filename: `${name}.html`,
    // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: name
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
  }
}

module.exports = {
  pages: pages,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 100,
            propList: ['*']
          })
        ]
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({algorithm: 'gzip',
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    resolve: {
      alias: {
        'projectRoot': projectRoot,
        'vue$': 'vue/dist/vue',
        '@node_modules': path.resolve(__dirname, './node_modules'),
        '@src': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@config': path.resolve(__dirname, './src/config'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@utils': path.resolve(__dirname, './src/utils')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
              publicPath: '../../'
            }
          }
        }))
  },
  devServer: {
    proxy: proxy
  }
}
