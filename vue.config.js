module.exports = {
	devServer: {
		open: true,
		host: '127.0.0.1',
		port: 8080,
		https: false,
		proxy: {//配置跨域
			'/api': {
				target: 'http://159.75.15.177:6000/',
				ws: true,
				changOrigin: true,//允许跨域
				pathRewrite: {
					'^/api': '/api'//请求的时候使用这个api就可以
				}
			}
		}
	}
}
