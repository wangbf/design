var Backbone = require('backbone');
Backbone.$ = require('jquery');
var MainStore = require('../../store/MainStore'),
	MainConstants = require('../../constants/MainConstants');

/**
 * 上传文件的弹出框，现有所有的图片上传都会打开这个弹出框，在这里处理上传
 * 在调用show方法时，可以传入一些参数：
 * width：建议上传的图片的宽度
 * height： 建议上传的图片的高度
 */
var UploadModal = Backbone.View.extend({
	el: $('#modal-upload-image'),
	initialize: function() {
		var me = this;
		MainStore.addUploadImageCmdHandler(function(vm) {
			me._show(vm);
		});
		var ratio = window.devicePixelRatio || 1,
		// 缩略图大小
        	thumbnailWidth = 100 * ratio,
        	thumbnailHeight = 100 * ratio;
		
		this.$el.on('hidden.bs.modal', function() {
			me.$('.file-item').remove();
			me.$('.tip').html('').parent().removeClass('has-error');
			me.uploader.destroy();
		});
		
		this.$el.on('show.bs.modal', function() {
			if (me.targetModule.height && me.targetModule.width)
				me.$('.tip').text('建议尺寸：'+ me.targetModule.width + '*' + me.targetModule.height);
			
			me.uploader = VUpload.create({
				pick: me.$('.filePicker'),
				auto: false
			});
			
			me.uploader.on('uploadSuccess', function(file, response) {
				if (200 != response.status) {
					toastr.error(response.message);
					$('#'+ file.id).remove();
					return;
				}
				toastr.success('上传成功');
				$('#'+ file.id).remove();
				var imageUrl = MainConstants.IMAGE_ACCESS_SERVER + '/vinuxmedia/' + response.result.fileName;
				MainStore.emitImageUploadSuccess({imageUrl: imageUrl, fileName: response.result.fileName, width: file._info.width, height: file._info.height, targetModule: me.targetModule});
				me.close();
			});
			
			//后面新加入的文件要替换掉原来的，始终保存只有一个文件
			me.uploader.on('beforeFileQueued', function(file) {
				var files = me.uploader.getFiles();
				if (files.length > 0) {
					for (var i = 0; i < files.length; i++) {
						me.uploader.removeFile(files[i].id)
					}
				}
			});
			
			me.uploader.on('fileQueued', function(file) {
				me.$('.tip').html('');
				var $li = me.$('.filePicker').next('.file-item'),
					$img = $li.find('img');
				if (!$img.length) {
					$li = $(
							'<div id="' + file.id + '" class="file-item thumbnail">' +
							'<img>' +
							'<div class="info"></div>' +
							'</div>'
					),
					$img = $li.find('img'),
					$fileName = $li.find('.info');
					me.$('.filePicker').after( $li );
				}

				me.uploader.makeThumb(file, function(error, src) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }

			        $img.attr( 'src', src );
			        $fileName.text(file.name)
			    }, thumbnailWidth, thumbnailHeight);
			});
			
			me.uploader.on('uploadStart', function(file) {
				var $msg = $('<div class="msg"></div').text('上传中。。。');
				$( '#'+file.id ).append($msg);
			});
			
			me.uploader.on('uploadError', function(file) {
				$('#'+ file.id).remove();
				toastr.error('上传失败');
			});
			
//			me.uploader.on('uploadProgress', function(file, percentage) {
//				  var $li =  $(window.CURRENT_EDIT).find('.progress');
//				  if (!$li.length) {
//					  $li = $('<div class="progress progress-striped active"></div>').appendTo($(window.CURRENT_EDIT));
//				  }
//				  var $percent = $li.find('.progress-bar');
//				  if ( !$percent.length ) {
//					  $percent = $('<div class="progress-bar" role="progressbar" style="width: 0%">' +
//					          '</div><div class="progress-upload">加载中请稍候...</div>').appendTo($li);
//				  }
//				  $percent.css( 'width', percentage * 100 + '%' );
//			  });
		});
	},
	events: {
		'click .btn-ok': 'handleOk'
	},
	/**
	 * 打开弹出框
	 * data：{
	 * 	modelId: 
	 *  xxxx： 
	 * }
	 */
	_show: function(data) {
		this.targetModule = data;
		this.$el.modal('show');
	},
	close: function() {
		this.$el.modal('hide');
	},
	handleOk: function() {
		if (!this.uploader.getFiles().length > 0) {
			this.$('.tip').html('请选择一张图片').parent().addClass('has-error');
			return;
		}
		this.uploader.upload();
	}
});

module.exports = UploadModal;