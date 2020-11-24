module.exports = {
  configureWebpack :{
    resolve: {
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        // 'router':'@/router', 因为this.$router就可以获得router对象了
        'views':'@/views'
      }
    }
  }
}