
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
const component_1 = require("../common/component");
const props_1 = require("./props");

(0, component_1.VantComponent)({
    field: true,
    classes: ['input-class', 'right-icon-class', 'label-class'],
    props: {...props_1.commonProps, ...props_1.inputProps, ...props_1.textareaProps, size: String, icon: String, label: String, error: Boolean, center: Boolean, isLink: Boolean, leftIcon: String, rightIcon: String, autosize: null, required: Boolean, iconClass: String, clickable: Boolean, inputAlign: String, customStyle: String, errorMessage: String, arrowDirection: String, showWordLimit: Boolean, errorMessageAlign: String, readonly: {
            type: Boolean,
            observer: 'setShowClear',
        }, clearable: {
            type: Boolean,
            observer: 'setShowClear',
        }, clearTrigger: {
            type: String,
            value: 'focus',
        }, border: {
            type: Boolean,
            value: true,
        }, titleWidth: {
            type: String,
            value: '6.2em',
        }, clearIcon: {
            type: String,
            value: 'clear',
        }},
    data: {
        focused: false,
        innerValue: '',
        showClear: false,
    },
    created () {
        this.value = this.data.value;
        this.setData({ innerValue: this.value });
    },
    methods: {
        onInput (event) {
            const _a = (event.detail || {}).value; const value = _a === void 0 ? '' : _a;
            this.value = value;
            this.setShowClear();
            this.emitChange();
        },
        onFocus (event) {
            this.focused = true;
            this.setShowClear();
            this.$emit('focus', event.detail);
        },
        onBlur (event) {
            this.focused = false;
            this.setShowClear();
            this.$emit('blur', event.detail);
        },
        onClickIcon () {
            this.$emit('click-icon');
        },
        onClickInput (event) {
            this.$emit('click-input', event.detail);
        },
        onClear () {
            const _this = this;
            this.setData({ innerValue: '' });
            this.value = '';
            this.setShowClear();
            (0, utils_1.nextTick)(() => {
                _this.emitChange();
                _this.$emit('clear', '');
            });
        },
        onConfirm (event) {
            const _a = (event.detail || {}).value; const value = _a === void 0 ? '' : _a;
            this.value = value;
            this.setShowClear();
            this.$emit('confirm', value);
        },
        setValue (value) {
            this.value = value;
            this.setShowClear();
            if (value === '') {
                this.setData({ innerValue: '' });
            }
            this.emitChange();
        },
        onLineChange (event) {
            this.$emit('linechange', event.detail);
        },
        onKeyboardHeightChange (event) {
            this.$emit('keyboardheightchange', event.detail);
        },
        emitChange () {
            const _this = this;
            this.setData({ value: this.value });
            (0, utils_1.nextTick)(() => {
                _this.$emit('input', _this.value);
                _this.$emit('change', _this.value);
            });
        },
        setShowClear () {
            const _a = this.data; const {clearable} = _a; const {readonly} = _a; const {clearTrigger} = _a;
            const _b = this; const {focused} = _b; const {value} = _b;
            let showClear = false;
            if (clearable && !readonly) {
                const hasValue = !!value;
                const trigger = clearTrigger === 'always' || (clearTrigger === 'focus' && focused);
                showClear = hasValue && trigger;
            }
            this.setData({ showClear });
        },
        noop () { },
    },
});
