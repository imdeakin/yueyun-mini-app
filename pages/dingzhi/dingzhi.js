var wxValidate = require('../../assets/js/wxValidate.js').wxValidate;
var api = require('../../assets/js/api.js');

Page({
    data: {
        bannerSwiperConfig: getApp().globalData.bannerSwiperConfig,
        phone: '020-37579981',
        formData: {
            name: {
                value: "",
                error: false,
                tips: ""
            },
            phone: {
                value: "",
                error: false,
                tips: ""
            },
            email: {
                value: "",
                error: false,
                tips: ""
            },
            word: {
                value: "",
                error: false,
                tips: ""
            }
        },
        formStatus: {
            submitting: false
        }
    },
    onLoad: function () {
        getApp().getBannerList(this);

        this.wxValidate = new wxValidate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 10
                },
                phone: {
                    required: true,
                    mobile: true
                },
                email: {
                    required: true,
                    email: true
                },
                word: {
                    required: true,
                    minlength: 1,
                    maxlength: 120
                }
            },
            tips: {
                name: {
                    required: "必填",
                    minlength: "输入2~10个字符",
                    maxlength: "输入2~10个字符"
                },
                phone: {
                    required: "必填",
                    mobile: "无效的手机号"
                },
                email: {
                    required: "必填",
                    email: "无效的邮箱"
                },
                word: {
                    required: "必填",
                    minlength: "输入1~120个字符",
                    maxlength: "输入1~120个字符"
                }
            }
        });
    },
    // 拨打热线电话
    makePhoneCall: function () {
        wx.makePhoneCall({
            phoneNumber: this.data.phone
        });
    },
    // 表单数据绑定
    updateFormData: function (e) {
        var name = e.target.dataset.name,
            value = e.detail.value,
            key = "formData." + name + ".value",
            opts = {};
        opts[key] = value;
        this.setData(opts);
    },
    // 更新表单验证结果
    updateErrorData: function (errorData) {
        var key = "formData." + errorData.name,
            opts = {};

        opts[key + '.value'] = errorData.value;
        opts[key + '.error'] = !errorData.valid; // error === !valid
        opts[key + '.tips'] = errorData.tips;

        this.setData(opts);
    },
    // 表单验证
    formCheck: function (e) {
        var result = this.wxValidate.formCheck(e);
        this.updateErrorData(result);
    },
    // 表单提交
    formSubmit: function (e) {
        var $this = this;
        var formData = e.detail.value;
        var result = this.wxValidate.formCheckAll(formData);

        if (result.valid) { // 验证通过
            this.setData({
                "formStatus.submitting": true
            });

            wx.request({
                url: api.apiPath.contact,
                data: formData,
                success: function (res) {

                    if (res.data.success) {

                        wx.switchTab({
                            url: '/page/service/service'
                        });

                    } else {

                        wx.showModal({
                            title: "抱歉，出错了T_T",
                            content: "提交失败，请检查数据或网络",
                            showCancel: false
                        });

                    }

                },
                complete: function () {

                    $this.setData({
                        "formStatus.submitting": false
                    });

                }
            });

        } else { // 验证不通过

            for (var key in result.detail) {
                this.updateErrorData(result.detail[key]);
            }

        }
    },

    wxValidate: null
});