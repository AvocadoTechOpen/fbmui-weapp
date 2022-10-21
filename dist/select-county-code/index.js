import { VantComponent } from '../common/component';
import MOBILE_CODE from './mobile_code';
const areaMap = {};
for (let i = 0; i < MOBILE_CODE.mobile_code.length; i++) {
    const area = MOBILE_CODE.mobile_code[i];
    if (areaMap[area.group]) {
        areaMap[area.group].children.push(area);
    }
    else {
        areaMap[area.group] = {
            group: area.group,
            children: [area],
        };
    }
}
const areaMapIndexList = Object.keys(areaMap);
const areaList = MOBILE_CODE.mobile_code.filter((ele) => ele.group !== '热门');
VantComponent({
    data: {
        value: '',
        areaMap,
        areaMapIndexList,
        areaList,
        scrollTop: 0,
        showResult: false,
    },
    methods: {
        countySelect(e) {
            const { area, key, val } = e.target.dataset.value;
            wx.showToast({
                title: val,
                icon: 'none',
            });
            this.$emit('select', {
                area,
                key,
                val,
            });
        },
    },
});
