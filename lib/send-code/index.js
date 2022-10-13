"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    data: {
        phoneCountyCode: '',
        phone: '',
        code: ''
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
        codePlaceholder: {
            type: String,
            value: '请输入验证码',
        },
        codeButtonText: {
            type: String,
            value: '获取验证码',
        },
        codeButtonColor: {
            type: String,
            value: '#4CAF50',
        },
    },
    methods: {
        onPhoneChange: function (event) {
            console.log(event.detail);
        },
        onSendCode: function (event) {
            this.$emit('sendcode', event.detail);
        },
    },
});
