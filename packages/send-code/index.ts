import { VantComponent } from '../common/component';

VantComponent({
  data: {
    phone: '',
    code: '',
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
    phoneLength: {
      type: Number,
      value: 11,
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

  destroyed() {
    clearTimeout(this.timer);
  },

  methods: {
    onCountyCodeClick() {
      this.$emit('selectcode');
    },
    onPhoneChange(event) {
      this.setData({
        phone: event.detail,
      });
    },
    onSendCode() {
      this.$emit('sendcode', {
        phone: this.data.phone,
      });
    },
    setCode(value: boolean, old: boolean) {
      if (value === old) {
        return;
      }
      this.setData({
        codeDisabled: value,
        codeCountdownNum: this.data.duration,
      });
      this.endtime = new Date().getTime() + 61 * 1000;
      wx.nextTick(() => {
        this.startCodeCountdown();
      });
    },
    // 发送验证码倒计时
    startCodeCountdown() {
      const nowtime = new Date();
      const lefttime = parseInt(
        ((this.endtime - nowtime.getTime()) / 1000).toString(),
        10
      );
      const s = lefttime % 60;
      if (lefttime <= 0) {
        this.setData({
          codeDisabled: false,
          codeCountdownNum: this.data.duration,
        });
      } else {
        this.setData({
          codeCountdownNum: s === 0 ? this.data.duration : s,
        });
        this.timer = setTimeout(() => {
          this.startCodeCountdown();
        }, 100);
      }
    },
    onCodeChange(event: WechatMiniprogram.CustomEvent) {
      this.$emit('complete', {
        code: event.detail,
        phone: this.data.phone,
      });
    },
  },
});
