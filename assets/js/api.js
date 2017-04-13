var server  = 'https://www.gzyueyun.com',
    root = server + '/yueyunapi',
    imgRoot = server + '/yueyun';

var apiPath = {
    getBannerList: root + '/wapController/getBannerList', // 获取Banner轮播图
    getCaseList: root + '/wapController/getCaseWapList', // 获取成功案例列表
    contact: root + '/mainController/note' // 提交联系信息
};

var getImgFullPath = function(imgPath){
    return imgRoot + '/' + imgPath.replace(/^\//, '');
}

module.exports.apiPath = apiPath;
module.exports.getImgFullPath = getImgFullPath;

