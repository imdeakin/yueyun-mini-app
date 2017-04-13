var api = require('../../assets/js/api.js');
Page({
    data: {
        bannerSwiperConfig: getApp().globalData.bannerSwiperConfig,
        caseList: [
            // {
            //     img: "http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/case_cover_01.png",
            //     title: "格局"
            // },
            // {
            //     img: "http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/case_cover_02.png",
            //     title: "3M空气检测"
            // }
        ]
    },
    onLoad: function () {
        getApp().getBannerList(this);
        this.getCaseList();
    },
    getCaseList: function () {
        var $this = this;
        wx.showLoading({
            title: "加载中",
            mask: true,
            success: function () {
                wx.request({
                    url: api.apiPath.getCaseList,
                    data: {
                        page: 1,
                        size: 5
                    },
                    method: 'GET',
                    success: function (res) {
                        var success = res.data.success,
                            list = res.data.root;
                        if (success) {
                            var arr = [];
                            for (var i = 0, len = list.length; i < len; i++) {
                                var item = list[i];
                                arr.push({
                                    img: api.getImgFullPath(item['image']),
                                    title: item['innerTitle']
                                });
                            }
                            $this.setData({
                                "caseList": arr
                            });
                        }
                    },
                    fail: function (res) {
                        console.error("get case list error!");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
    }
});