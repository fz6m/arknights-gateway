const {
  override,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra')

// const fs = require('fs')

const path = require('path')

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const title = 'Arknights-gateway'


/**
 * @param target: 要遍历的对象
 * @param name: 插件名
 * @param callback: 回调函数，第一个参数为该插件对象
 * @return null
 */
function invade(target, name, callback) {
  target.forEach(
    item => {
      // console.log(item)
      if (item.constructor.name === name) {
        callback(item)
      }
    }
  )
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  paths: function (paths) {
    paths.appBuild = resolve('./dist')
    return paths
  },
  webpack: override(
    addWebpackAlias({
      '@': resolve('src'),
    }),
    addLessLoader({
      additionalData: `@import "${ resolve('./src/assets/css/variable.less') }";`
    }),

    (config) => {
      if (process.env.NODE_ENV === "production") {

        config.devtool = false;

        config.output.chunkFilename = config.output.chunkFilename.replace('.chunk', '')

        invade(config.optimization.minimizer, 'TerserPlugin', (e) => {
          e.options.extractComments = false
          e.options.terserOptions.compress.drop_console = true
        })
        invade(config.plugins, 'MiniCssExtractPlugin', (e) => {
          e.options.chunkFilename = e.options.chunkFilename.replace('.chunk', '')
        })
        invade(config.plugins, 'HtmlWebpackPlugin', (e) => {
          e.options.title = title
        })

        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        }

        config.plugins.push(
          new ScriptExtHtmlWebpackPlugin(
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          })
        )

        config.optimization.runtimeChunk = 'single'

      }

      // fs.writeFileSync(`./config-${process.env.NODE_ENV}.json`, JSON.stringify(config))

      return config
    }
  )
}