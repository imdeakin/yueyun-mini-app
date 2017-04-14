var wxValidate = require('../../assets/js/wxValidate.js').wxValidate;
var api = require('../../assets/js/api.js');

// debug_01: textarea 在首次加载时会自动触发blur事件的bug

Page({
    data: {
        bannerSwiperConfig: getApp().globalData.bannerSwiperConfig,
        phone: '020-37579981',
        formData: {
            name: {
                value: "",
                error: false,
                tips: "1341234",
                changed: false,
                focused: false
            },
            phone: {
                value: "",
                error: false,
                tips: "",
                changed: false
            },
            email: {
                value: "",
                error: false,
                tips: "",
                changed: false
            },
            word: {
                value: "",
                error: false,
                tips: "",
                changed: false
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
    onShareAppMessage: function () {
        return {
            title: '互联网开发定制平台',
            path: '/pages/dingzhi/dingzhi',
            success: function (res) {
                wx.showModal({
                    title: "提示",
                    content: "分享成功，感谢您的支持",
                    showCancel: false
                });
            },
            fail: function (res) {
                console.log(res.errMsg);
                if (res.errMsg.search('cancel')) return;

                wx.showModal({
                    title: "提示",
                    content: "分享失败，请检查网络或重试",
                    showCancel: false
                });
            }
        }
    },
    // 拨打热线电话
    makePhoneCall: function (e) {
        wx.makePhoneCall({
            phoneNumber: this.data.phone
        });
    },
    onFocus: function (e) {
        var name = e.target.dataset.name,
            value = e.detail.value,
            key = "formData." + name,
            opts = {};
        opts[key + ".focused"] = true;
        this.setData(opts);
    },
    // 表单数据绑定
    updateFormData: function (e) {
        var name = e.target.dataset.name,
            value = e.detail.value,
            key = "formData." + name,
            opts = {};
        opts[key + ".value"] = value;
        opts[key + ".changed"] = true;
        this.setData(opts);
    },
    // 更新表单验证结果
    updateErrorData: function (errorData) {
        var key = "formData." + errorData.name,
            opts = {};

        if (!this.data.formData[errorData.name]['focused']) return; // 未聚集的忽略验证结果 // debug_01

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

                        var delay = 1500;
                        wx.showToast({
                            title: "提交成功",
                            icon: "success",
                            duration: delay,
                            success: function () {
                                setTimeout(function () {
                                    $this.resetForm();
                                }, delay);
                            }
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

                // debug_01
                var fKey = 'formData.' + key + '.focused',
                    opt = {};
                opt[fKey] = true;
                this.setData(opt); // 设置成聚集状态  // debug_01

                this.updateErrorData(result.detail[key]); // 设置验证状态
            }

        }
    },
    // 重置表单
    resetForm: function () {
        var formData = this.data.formData;
        console.log(formData);
        for (var name in formData) {
            var item = formData[name];

            for (var key in item) {
                if (typeof item[key] === 'string') {
                    item[key] = '';
                } else if (typeof item[key] === 'boolean') {
                    item[key] = false;
                }
            }

            formData[name] = item;
        }
        console.log(formData);
        this.setData({
            'formData': formData
        });
    },
    wxValidate: null
});