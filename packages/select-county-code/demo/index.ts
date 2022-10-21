import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  methods: {
    onSelect(e) {
      console.log(e.detail);
      Toast({
        context: this,
        message: `${JSON.stringify(e.detail)}`,
      });
    },
  },
});
