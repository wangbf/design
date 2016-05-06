var webpack = require('webpack');

module.exports = {
    entry: {
    	index: './js/main.js',
    	widget: './js/widget/widget.all.js',
    	mix: [
//    	      './js/lib/bootstrap/3.3.5/js/bootstrap.js',
//    	      './js/lib/jquery-ui/1.11.4/jquery-ui.min.js',
//    	      './js/lib/metisMenu/jquery.metisMenu.js',
//    	      './js/lib/slimscroll/jquery.slimscroll.min.js',
//    	      './js/lib/colorpicker/bootstrap-colorpicker.min.js',
//    	      './js/lib/zTree_v3/js/jquery.ztree.core-3.5.min.js',
//    	      './js/lib/validation/jquery.validationEngine-zh_CN.js',
//    	      './js/lib/validation/jquery.validationEngine.js',
//    	      './js/lib/jquery-slider/jquery.touchSlider.js',
//    	      './js/lib/htmlClean/jquery.htmlClean.js'
    	]
    },
    output: {
        path: './assets',
        filename: "[name].bundle.js"
    },
    resolve: {
    	//定义好别名后，在模块里不用写前面的文件路径
   	 	alias: {
   	 		modal: __dirname + '/js/modules/modal',
   	 		actions: __dirname + '/js/actions',
   	 		constants: __dirname + '/js/constants',
   	 		store: __dirname + '/js/store',
   	 		model: __dirname + '/js/model',
   	 		templates: __dirname + '/templates'
		}
   },
    //表示这个依赖项是外部lib，遇到require它不需要编译，不会被打包
    externals: {
      'backbone': 'Backbone',
      'jquery': 'jQuery'
    },
    plugins: [
      //压缩打包的文件
      /*
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      */
      //允许错误不打断程序
      new webpack.NoErrorsPlugin()
    ],
    module: {
    	loaders: [
          {test: /\.(jpg|png)$/, loader: "url-loader?limit=40960"},
          {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    }
};
