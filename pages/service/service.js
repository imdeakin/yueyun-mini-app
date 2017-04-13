Page({
    data: {
        bannerSwiperConfig: getApp().globalData.bannerSwiperConfig,
        serviceList: [
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/service_icon_01.png",
                title:"移动APP定制开发"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/service_icon_02.png",
                title:"网站定制开发"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/service_icon_03.png",
                title:"微信定制开发"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/service_icon_04.png",
                title:"O2O定制开发"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/service_icon_05.png",
                title:"物联网软件开发"
            },
            {
                icon:"http://www.gzyueyun.com/m/yueyun-mini-app/assets/img/service_icon_06.png",
                title:"云服务"
            }
        ],
        flowProcessList: ["需求评估","视觉设计","程序开发","测试上线"]
    },
    onLoad: function () {
        getApp().getBannerList(this);
    }
});