
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const touch_1 = require("../mixins/touch");
const version_1 = require("../common/version");
const utils_1 = require("../common/utils");

(0, component_1.VantComponent)({
    mixins: [touch_1.touch],
    props: {
        range: Boolean,
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100,
        },
        min: {
            type: Number,
            value: 0,
        },
        step: {
            type: Number,
            value: 1,
        },
        value: {
            type: null,
            value: 0,
            observer (val) {
                if (val !== this.value) {
                    this.updateValue(val);
                }
            },
        },
        vertical: Boolean,
        barHeight: null,
    },
    created () {
        this.updateValue(this.data.value);
    },
    methods: {
        onTouchStart (event) {
            const _this = this;
            if (this.data.disabled)
                return;
            const {index} = event.currentTarget.dataset;
            if (typeof index === 'number') {
                this.buttonIndex = index;
            }
            this.touchStart(event);
            this.startValue = this.format(this.value);
            this.newValue = this.value;
            if (this.isRange(this.newValue)) {
                this.startValue = this.newValue.map((val) => _this.format(val));
            }
            else {
                this.startValue = this.format(this.newValue);
            }
            this.dragStatus = 'start';
        },
        onTouchMove (event) {
            const _this = this;
            if (this.data.disabled)
                return;
            if (this.dragStatus === 'start') {
                this.$emit('drag-start');
            }
            this.touchMove(event);
            this.dragStatus = 'draging';
            (0, utils_1.getRect)(this, '.fbm-slider').then((rect) => {
                const {vertical} = _this.data;
                const delta = vertical ? _this.deltaY : _this.deltaX;
                const total = vertical ? rect.height : rect.width;
                const diff = (delta / total) * _this.getRange();
                if (_this.isRange(_this.startValue)) {
                    _this.newValue[_this.buttonIndex] =
                        _this.startValue[_this.buttonIndex] + diff;
                }
                else {
                    _this.newValue = _this.startValue + diff;
                }
                _this.updateValue(_this.newValue, false, true);
            });
        },
        onTouchEnd () {
            if (this.data.disabled)
                return;
            if (this.dragStatus === 'draging') {
                this.updateValue(this.newValue, true);
                this.$emit('drag-end');
            }
        },
        onClick (event) {
            const _this = this;
            if (this.data.disabled)
                return;
            const {min} = this.data;
            (0, utils_1.getRect)(this, '.fbm-slider').then((rect) => {
                const {vertical} = _this.data;
                const touch = event.touches[0];
                const delta = vertical
                    ? touch.clientY - rect.top
                    : touch.clientX - rect.left;
                const total = vertical ? rect.height : rect.width;
                const value = Number(min) + (delta / total) * _this.getRange();
                if (_this.isRange(_this.value)) {
                    const _a = _this.value; const left = _a[0]; const right = _a[1];
                    const middle = (left + right) / 2;
                    if (value <= middle) {
                        _this.updateValue([value, right], true);
                    }
                    else {
                        _this.updateValue([left, value], true);
                    }
                }
                else {
                    _this.updateValue(value, true);
                }
            });
        },
        isRange (val) {
            const {range} = this.data;
            return range && Array.isArray(val);
        },
        handleOverlap (value) {
            if (value[0] > value[1]) {
                return value.slice(0).reverse();
            }
            return value;
        },
        updateValue (value, end, drag) {
            const _this = this;
            if (this.isRange(value)) {
                value = this.handleOverlap(value).map((val) => _this.format(val));
            }
            else {
                value = this.format(value);
            }
            this.value = value;
            const {vertical} = this.data;
            const mainAxis = vertical ? 'height' : 'width';
            this.setData({
                wrapperStyle: "\n          background: ".concat(this.data.inactiveColor || '', ";\n          ").concat(vertical ? 'width' : 'height', ": ").concat((0, utils_1.addUnit)(this.data.barHeight) || '', ";\n        "),
                barStyle: "\n          ".concat(mainAxis, ": ").concat(this.calcMainAxis(), ";\n          left: ").concat(vertical ? 0 : this.calcOffset(), ";\n          top: ").concat(vertical ? this.calcOffset() : 0, ";\n          ").concat(drag ? 'transition: none;' : '', "\n        "),
            });
            if (drag) {
                this.$emit('drag', { value });
            }
            if (end) {
                this.$emit('change', value);
            }
            if ((drag || end) && (0, version_1.canIUseModel)()) {
                this.setData({ value });
            }
        },
        getScope () {
            return Number(this.data.max) - Number(this.data.min);
        },
        getRange () {
            const _a = this.data; const {max} = _a; const {min} = _a;
            return max - min;
        },
        // 计算选中条的长度百分比
        calcMainAxis () {
            const {value} = this;
            const {min} = this.data;
            const scope = this.getScope();
            if (this.isRange(value)) {
                return "".concat(((value[1] - value[0]) * 100) / scope, "%");
            }
            return "".concat(((value - Number(min)) * 100) / scope, "%");
        },
        // 计算选中条的开始位置的偏移量
        calcOffset () {
            const {value} = this;
            const {min} = this.data;
            const scope = this.getScope();
            if (this.isRange(value)) {
                return "".concat(((value[0] - Number(min)) * 100) / scope, "%");
            }
            return '0%';
        },
        format (value) {
            const _a = this.data; const {max} = _a; const {min} = _a; const {step} = _a;
            return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
        },
    },
});
