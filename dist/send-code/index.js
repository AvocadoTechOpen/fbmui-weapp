import { VantComponent } from '../common/component';
VantComponent({
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
        onPhoneChange(event) {
            console.log(event.detail);
        },
        onSendCode(event) {
            this.$emit('sendcode', event.detail);
        },
    },
});
