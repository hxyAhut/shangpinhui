module.exports = {
    // configureWebpack: {
        // 关闭eslint
        // lintOnSave: false,
        // 打包时去掉map文件
        productionSourceMap: false,
        // 代理跨域
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://39.98.123.211',
                    // pathRewrite: {'^/api': ''}
                }
            }
        }
    // }
}