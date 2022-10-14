"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var toast_1 = __importDefault(require("../toast/toast"));
var utils_1 = require("./utils");
(0, component_1.VantComponent)({
    data: {
        phone: '',
        code: '',
        phoneMaxLength: 11,
        duration: 60,
        codeCountdownNum: 60,
        titleWidth: '6.2em',
        titleStyle: 'margin-right: 12px;',
    },
    props: {
        phoneCountyCode: {
            type: String,
            value: '86',
        },
        phonePlaceholder: {
            type: String,
            value: '请输入手机号码',
        },
        codeLabel: {
            type: String,
            value: '验证码',
        },
        codeLength: {
            type: Number,
            value: 4,
        },
        codePlaceholder: {
            type: String,
            value: '请输入验证码',
        },
        codeDisabled: {
            type: Boolean,
            value: false,
            observer: 'setCode',
        },
        codeButtonText: {
            type: String,
            value: '获取验证码',
        },
        codeCountdownText: {
            type: String,
            value: 's后重新发送',
        },
        codeButtonColor: {
            type: String,
            value: '#4CAF50',
        },
    },
    destroyed: function () {
        clearTimeout(this.timer);
    },
    methods: {
        onCountyCodeClick: function () {
            this.$emit('select-countycode');
        },
        onPhoneChange: function (event) {
            this.setData({
                phone: event.detail,
            });
        },
        onSendCode: function () {
            var _a = this.data, phone = _a.phone, phoneCountyCode = _a.phoneCountyCode;
            var phonePass = phoneCountyCode === '86' ? (0, utils_1.GLOBALPHONE)('zh-CN', phone) : phone !== '';
            if (!phonePass) {
                (0, toast_1.default)({
                    context: this,
                    message: '请填写正确的手机号',
                });
                return;
            }
            this.$emit('send-code', {
                phone: phone,
            });
        },
        setCode: function (value, old) {
            var _this = this;
            if (value === old) {
                return;
            }
            this.setData({
                codeDisabled: value,
                codeCountdownNum: this.data.duration,
            });
            this.endtime = new Date().getTime() + 61 * 1000;
            wx.nextTick(function () {
                _this.startCodeCountdown();
            });
        },
        // 发送验证码倒计时
        startCodeCountdown: function () {
            var _this = this;
            var nowtime = new Date();
            var lefttime = parseInt(((this.endtime - nowtime.getTime()) / 1000).toString(), 10);
            var s = lefttime % 60;
            if (lefttime <= 0) {
                this.setData({
                    codeDisabled: false,
                    codeCountdownNum: this.data.duration,
                });
            }
            else {
                this.setData({
                    codeCountdownNum: s === 0 ? this.data.duration : s,
                });
                this.timer = setTimeout(function () {
                    _this.startCodeCountdown();
                }, 100);
            }
        },
        onCodeChange: function (event) {
            var code = event.detail;
            var _a = this.data, codeLength = _a.codeLength, phone = _a.phone;
            this.$emit('input-code', {
                finish: code.length === codeLength && phone !== '',
                code: code,
                phone: phone,
            });
        },
    },
});
