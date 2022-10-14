import { VantComponent } from '../common/component';
import Toast from '../toast/toast';
import { GLOBALPHONE } from './utils';

VantComponent({
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

  destroyed() {
    clearTimeout(this.timer);
  },

  methods: {
    onCountyCodeClick() {
      this.$emit('select-countycode');
    },
    onPhoneChange(event) {
      this.setData({
        phone: event.detail,
      });
    },
    onSendCode() {
      const { phone, phoneCountyCode } = this.data;
      const phonePass =
        phoneCountyCode === '86' ? GLOBALPHONE('zh-CN', phone) : phone !== '';

      if (!phonePass) {
        Toast({
          context: this,
          message: '请填写正确的手机号',
        });
        return;
      }
      this.$emit('send-code', {
        phone,
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
      const code = event.detail;
      const { codeLength, phone } = this.data;
      this.$emit('input-code', {
        finish: code.length === codeLength && phone !== '',
        code,
        phone,
      });
    },
  },
});
