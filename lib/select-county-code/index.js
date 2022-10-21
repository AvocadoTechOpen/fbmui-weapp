"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var mobile_code_1 = __importDefault(require("./mobile_code"));
var areaMap = {};
for (var i = 0; i < mobile_code_1.default.mobile_code.length; i++) {
    var area = mobile_code_1.default.mobile_code[i];
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
var areaMapIndexList = Object.keys(areaMap);
var areaList = mobile_code_1.default.mobile_code.filter(function (ele) { return ele.group !== '热门'; });
(0, component_1.VantComponent)({
    data: {
        value: '',
        areaMap: areaMap,
        areaMapIndexList: areaMapIndexList,
        areaList: areaList,
        scrollTop: 0,
        showResult: false,
    },
    methods: {
        onChange: function (e) {
            console.log(e.detail);
            this.setFilterList(e.detail);
        },
        setFilterList: function (val) {
            var filterAreaList = areaList.filter(function (ele) { return ele.area.indexOf(val) > -1; });
            this.setData({
                areaList: val ? filterAreaList : areaList,
                showResult: val !== '',
            });
        },
        onSearch: function () {
            if (this.data.value) {
                console.log(this.data.value);
                this.setFilterList(this.data.value);
            }
        },
        countySelect: function (e) {
            var _a = e.target.dataset.value, area = _a.area, key = _a.key, val = _a.val;
            wx.showToast({
                title: val,
                icon: 'none',
            });
            this.$emit('select', {
                area: area,
                key: key,
                val: val,
            });
        },
    },
});
