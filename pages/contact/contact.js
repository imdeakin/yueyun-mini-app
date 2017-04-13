Page({
    data: {
        bannerSwiperConfig: getApp().globalData.bannerSwiperConfig,
        contactInfo: [
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/contact_icon_1.png",
                title:"地址",
                content:"广州市越秀区先烈中路穗丰大厦B座202"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/contact_icon_2.png",
                title:"免费咨询电话",
                content:"020-37579981"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/contact_icon_3.png",
                title:"商务合作",
                content:"dengyunjia@gzyueyun.com"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/contact_icon_4.png",
                title:"工作时间",
                content:"周一~~周五 早上9:00~~下午18:00"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/contact_icon_5.png",
                title:"地铁",
                content:"地铁5号线区庄站E出口东山广场方向"
            }
        ]
    },
    onLoad: function () {
        getApp().getBannerList(this);
    }
});