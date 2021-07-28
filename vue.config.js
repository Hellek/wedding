const KitVueConfigs = require('./node_modules/element-ui-kit/vue.configs')

module.exports = {
	transpileDependencies: [
		'element-ui-kit',
	],
	configureWebpack: {
		resolve: {
			alias: {
				ScssVariables: '@/assets/styles/variables.scss',
				...KitVueConfigs.getAliases({
					dirname: __dirname,
					// useLocalKit: true,
					// localKitPath: 'D:/coding-cats/repos/element-ui-kit',
				}),
			},
		},
		devServer: KitVueConfigs.configureWebpack.devServer,
	},
	pluginOptions: KitVueConfigs.pluginOptions,
	/* chainWebpack: config => {
		KitVueConfigs.rawLoader(config)
	}, */
}