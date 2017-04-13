function wxValidate(options) {
    var defaults = {
            // rules: {
            //     name: {
            //         required: true,
            //         minlength: 2,
            //         maxlength: 10
            //     }
            // },
            // tips: {
            //     name: {
            //         required: "必填",
            //         minlength: "输入2~10个字符",
            //         maxlength: "输入2~10个字符"
            //     }
            // }
        }, setting = extend(defaults,options);

    var defReg = {
            // 用户名\手机\邮箱
            account: /(^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5]{2,15}$)|(^1(3|4|5|7|8)\d{9}$)|(^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$)/,
            // 用户名为3-16位非数字开头的字母、数字、中文的组合
            username: /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5]{2,15}$/,
            // 手机号
            mobile: /^1(3|4|5|7|8)\d{9}$/,
            // 邮箱
            email: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
    }

   function extend() {
        var obj = {},
            obj1 = {};
        for(var i = 0, len = arguments.length; i < len; i++) {
            obj1 = arguments[i];
            
            for(var key in obj1) {
                if(obj1[key] !== undefined) obj[key] = obj1[key];
            }
        }

        return obj;
    }

    /**
     * 验证表单
     * @param formData {name:"",value:""} 表单数据
     * @returns {
     *     name: name, // 表单name
     *     value: value, // 表单值(去掉前后空格的)
     *     valid: result, // 是否验证通过
     *     tips: errorTips // 验证失败时的提示信息
     * }
     */
    function formCheck(formData) {
        var name = formData.name,
        value = $this.trim(formData.value), // 去掉前后空格
        rules = setting.rules[name],
        tips = setting.tips[name];

        var checkAllRule = false, // 是否验证所有条件
            result = true, // 验证结果
            errorTips = ''; // 首次验证到错误的提示信息

        // 遍历条件验证
        for(var key in rules) {
            if(!checkAllRule && !result) break; // 如果验证到错误，直接返回错误，不再继续验证
            var uKey = key.charAt(0).toUpperCase() + key.slice(1);
            var formCheckFunc = $this["formCheck" + uKey];
            if(result) result = formCheckFunc ? formCheckFunc(rules[key], value) : true;
            if(!result && !errorTips) errorTips = tips[key];
        }

        return {
            name: name,
            value: value,
            valid: result,
            tips: errorTips
        };
    }

    var $this = {};

    /**
     * 验证单个表单
     * @params e {eventObject} 事件对象
     * @returns {
     *     name: name, // 表单name
     *     value: value, // 表单值(去掉前后空格的)
     *     valid: result, // 是否验证通过
     *     tips: errorTips // 验证失败时的提示信息
     * }
     */
    $this.formCheck = function(e) {
        var name = e.target.dataset.name,
        value = e.detail.value;
        return formCheck({
            name: name,
            value: value
        });
    };

    /**
     * 验证全部表单
     * @params formData {name:value,name1:value1...} 表单数据
     * @return {
     *     valid: false, // 是否全部验证通过
     *     detail: { // 验证的具体信息
     *        name: {
     *           valid: false, // 是否验证通过
     *           tips: "" // 验证失败时的提示信息
     *        },
     *        ...
     *     }
     * }
     */
    $this.formCheckAll = function(formData) {
        var valid = true;
        var detail = {};

        for(var key in formData) {
            var result = formCheck({
                name: key,
                value: formData[key]
            });

            detail[key] = result;          

            if(valid) valid = result.valid;
        }

        return {
            valid: valid,
            detail: detail
        };
    };

    /**
     * 是否为空
     * @param ruleVal {boolean} 验证规则的值
     * @param val {string} 待验证的值
     * @return {boolean} 验证是否通过
     */
    $this.formCheckRequired = function(ruleVal, val) {
        if(!ruleVal) return true; // ruleVal = false 时，无须验证
        return val.length > 0;
    };

    /**
     * 最小长度
     * @param ruleVal {number} 验证规则的值
     * @param val {string} 待验证的值
     * @return {boolean} 验证是否通过
     */
    $this.formCheckMinlength = function(ruleVal, val) {
        if(typeof ruleVal !== "number") return true; // ruleVal非数字时，无须验证
        return val.length >= ruleVal;
    };

    /**
     * 最大长度
     * @param ruleVal {number} 验证规则的值
     * @param val {string} 待验证的值
     * @return {boolean} 验证是否通过
     */
    $this.formCheckMaxlength = function(ruleVal, val) {
        if(typeof ruleVal !== "number") return true; // ruleVal非数字时，无须验证
        return val.length <= ruleVal;
    };

    /**
     * 用户名
     * @param ruleVal {boolean} 验证规则的值
     * @param val {string} 待验证的值
     * @return {boolean} 验证是否通过
     */
    $this.formCheckMobile = function(ruleVal, val) {
        if(!ruleVal) return true; // ruleVal = false 时，无须验证
        return defReg.username.test(val);
    };

    /**
     * 手机号
     * @param ruleVal {boolean} 验证规则的值
     * @param val {string} 待验证的值
     * @return {boolean} 验证是否通过
     */
    $this.formCheckMobile = function(ruleVal, val) {
        if(!ruleVal) return true; // ruleVal = false 时，无须验证
        return defReg.mobile.test(val);
    };

    /**
     * 邮箱
     * @param ruleVal {boolean} 验证规则的值
     * @param val {string} 待验证的值
     * @return {boolean} 验证是否通过
     */
    $this.formCheckEmail = function(ruleVal, val) {
        if(!ruleVal) return true; // ruleVal = false 时，无须验证
        return defReg.email.test(val);
    };

    /**
     * 去掉前后空格
     */
    $this.trim = function(str) {
        return str.replace(/^\s*|\s*$/g, '');
    };

    $this.extend = extend;

    return $this;
}

module.exports.wxValidate = wxValidate;