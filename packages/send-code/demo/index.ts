import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    codeDisabled1: false,
    btnDisabled1: true,
    codeDisabled: false,
    btnDisabled: true,
  },
  methods: {
    onSelectCode(event) {
      console.log(event);
      Toast({
        context: this,
        message: '选择区号',
      });
    },
    onSendCode(event) {
      console.log(event);
      Toast({
        context: this,
        message: '发送验证码',
      });
      this.setData({
        codeDisabled: true,
      });
    },
    onComplete(event) {
      console.log(event);
      const { finish } = event.detail;
      if (finish) {
        Toast({
          context: this,
          message: '输入完成',
        });
      }
      this.setData({
        btnDisabled: !finish,
      });
    },
  },
});
