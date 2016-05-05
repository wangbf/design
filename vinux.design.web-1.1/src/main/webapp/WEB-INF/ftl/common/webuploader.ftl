<script src="${jsPath}/js/lib/webuploader/webuploader.js"></script>

<script type="text/javascript">
//简单封装图片上传初始功能
var VUpload = {};

VUpload.initAction = {funList: []};

VUpload.initAction.push = function(fun) {
	this.funList.push(fun);
};

VUpload.initAction.init = function() {
	for(var i = 0; i < this.funList.length; i++) {
		this.funList[i]();
	}	
};

VUpload.defaultSettings = {
    // swf文件路径
    swf: '/js/lib/webuploader/Uploader.swf',
    // 文件接收服务端。
    server: '${imageUploadServer}/image/upload.vhtml',
    formData: {systemType: "vinuxmedia"},
    auto: false,
	runtimeOrder: 'flash',
    resize: false,
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
}


VUpload.create = function(options) {
	if (options) {
		$.extend(this.defaultSettings, options);
	}
	return WebUploader.create(this.defaultSettings);
};

</script>