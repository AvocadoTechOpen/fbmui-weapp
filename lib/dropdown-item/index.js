
Object.defineProperty(exports, "__esModule", { value: true });
const relation_1 = require("../common/relation");
const component_1 = require("../common/component");

(0, component_1.VantComponent)({
    field: true,
    relation: (0, relation_1.useParent)('dropdown-menu', function () {
        this.updateDataFromParent();
    }),
    props: {
        value: {
            type: null,
            observer: 'rerender',
        },
        title: {
            type: String,
            observer: 'rerender',
        },
        disabled: Boolean,
        titleClass: {
            type: String,
            observer: 'rerender',
        },
        options: {
            type: Array,
            value: [],
            observer: 'rerender',
        },
        popupStyle: String,
    },
    data: {
        transition: true,
        showPopup: false,
        showWrapper: false,
        displayTitle: '',
    },
    methods: {
        rerender () {
            const _this = this;
            wx.nextTick(() => {
                let _a;
                (_a = _this.parent) === null || _a === void 0 ? void 0 : _a.updateItemListData();
            });
        },
        updateDataFromParent () {
            if (this.parent) {
                const _a = this.parent.data; const {overlay} = _a; const {duration} = _a; const {activeColor} = _a; const {closeOnClickOverlay} = _a; const {direction} = _a;
                this.setData({
                    overlay,
                    duration,
                    activeColor,
                    closeOnClickOverlay,
                    direction,
                });
            }
        },
        onOpen () {
            this.$emit('open');
        },
        onOpened () {
            this.$emit('opened');
        },
        onClose () {
            this.$emit('close');
        },
        onClosed () {
            this.$emit('closed');
            this.setData({ showWrapper: false });
        },
        onOptionTap (event) {
            const {option} = event.currentTarget.dataset;
            const {value} = option;
            const shouldEmitChange = this.data.value !== value;
            this.setData({ showPopup: false, value });
            this.$emit('close');
            this.rerender();
            if (shouldEmitChange) {
                this.$emit('change', value);
            }
        },
        toggle (show, options) {
            const _this = this;
            let _a;
            if (options === void 0) { options = {}; }
            const {showPopup} = this.data;
            if (typeof show !== 'boolean') {
                show = !showPopup;
            }
            if (show === showPopup) {
                return;
            }
            this.setData({
                transition: !options.immediate,
                showPopup: show,
            });
            if (show) {
                (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getChildWrapperStyle().then((wrapperStyle) => {
                    _this.setData({ wrapperStyle, showWrapper: true });
                    _this.rerender();
                });
            }
            else {
                this.rerender();
            }
        },
    },
});
