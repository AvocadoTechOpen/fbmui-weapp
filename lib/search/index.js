
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const version_1 = require("../common/version");

(0, component_1.VantComponent)({
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        label: String,
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        useLeftIconSlot: Boolean,
        useRightIconSlot: Boolean,
        leftIcon: {
            type: String,
            value: 'search',
        },
        rightIcon: String,
        placeholder: String,
        placeholderStyle: String,
        actionText: {
            type: String,
            value: '取消',
        },
        background: {
            type: String,
            value: '#ffffff',
        },
        maxlength: {
            type: Number,
            value: -1,
        },
        shape: {
            type: String,
            value: 'square',
        },
        clearable: {
            type: Boolean,
            value: true,
        },
        clearTrigger: {
            type: String,
            value: 'focus',
        },
        clearIcon: {
            type: String,
            value: 'clear',
        },
    },
    methods: {
        onChange (event) {
            if ((0, version_1.canIUseModel)()) {
                this.setData({ value: event.detail });
            }
            this.$emit('change', event.detail);
        },
        onCancel () {
            const _this = this;
            /**
             * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
             * https://github.com/AvocadoTechOpen/fbmui-weapp/issues/1768
             */
            setTimeout(() => {
                if ((0, version_1.canIUseModel)()) {
                    _this.setData({ value: '' });
                }
                _this.$emit('cancel');
                _this.$emit('change', '');
            }, 200);
        },
        onSearch (event) {
            this.$emit('search', event.detail);
        },
        onFocus (event) {
            this.$emit('focus', event.detail);
        },
        onBlur (event) {
            this.$emit('blur', event.detail);
        },
        onClear (event) {
            this.$emit('clear', event.detail);
        },
        onClickInput (event) {
            this.$emit('click-input', event.detail);
        },
    },
});
