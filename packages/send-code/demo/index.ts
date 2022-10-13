import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    codeDisabled: false,
    btnDisabled: true,
  },
  methods: {
    onSelectCode(event: WechatMiniprogram.CustomEvent) {
      console.log(event);
      Toast({
        context: this,
        message: '选择区号',
      });
    },
    onSendCode(event: WechatMiniprogram.CustomEvent) {
      console.log(event);
      Toast({
        context: this,
        message: '发送验证码',
      });
      this.setData({
        codeDisabled: true,
      });
    },
    onComplete(event: WechatMiniprogram.CustomEvent) {
      console.log(event);
      const { value } = event.detail;
      if (value) {
        Toast({
          context: this,
          message: '输入完成',
        });
        this.setData({
          btnDisabled: false,
        });
      }
    },
  },
});
