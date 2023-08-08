const { defineConfig } = require('@vue/cli-service');
const DotenvWebpack = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
        new DotenvWebpack(),
    ]
  }
})
