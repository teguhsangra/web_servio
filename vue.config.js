const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // devServer: {
  //   headers: { "Access-Control-Allow-Origin": "*" },
  //   proxy: 'https://servio.rakomsis.com',
  // },
  transpileDependencies: true,
  lintOnSave: false
})
