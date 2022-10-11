
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const relation_1 = require("../common/relation");
const utils_1 = require("../common/utils");

let ARRAY = [];
(0, component_1.VantComponent)({
    field: true,
    relation: (0, relation_1.useChildren)('dropdown-item', function () {
        this.updateItemListData();
    }),
    props: {
        activeColor: {
            type: String,
            observer: 'updateChildrenData',
        },
        overlay: {
            type: Boolean,
            value: true,
            observer: 'updateChildrenData',
        },
        zIndex: {
            type: Number,
            value: 10,
        },
        duration: {
            type: Number,
            value: 200,
            observer: 'updateChildrenData',
        },
        direction: {
            type: String,
            value: 'down',
            observer: 'updateChildrenData',
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true,
            observer: 'updateChildrenData',
        },
        closeOnClickOutside: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        itemListData: [],
    },
    beforeCreate () {
        const {windowHeight} = (0, utils_1.getSystemInfoSync)();
        this.windowHeight = windowHeight;
        ARRAY.push(this);
    },
    destroyed () {
        const _this = this;
        ARRAY = ARRAY.filter((item) => item !== _this);
    },
    methods: {
        updateItemListData () {
            this.setData({
                itemListData: this.children.map((child) => child.data),
            });
        },
        updateChildrenData () {
            this.children.forEach((child) => {
                child.updateDataFromParent();
            });
        },
        toggleItem (active) {
            this.children.forEach((item, index) => {
                const {showPopup} = item.data;
                if (index === active) {
                    item.toggle();
                }
                else if (showPopup) {
                    item.toggle(false, { immediate: true });
                }
            });
        },
        close () {
            this.children.forEach((child) => {
                child.toggle(false, { immediate: true });
            });
        },
        getChildWrapperStyle () {
            const _this = this;
            const _a = this.data; const {zIndex} = _a; const {direction} = _a;
            return (0, utils_1.getRect)(this, '.fbm-dropdown-menu').then((rect) => {
                const _a = rect.top; const top = _a === void 0 ? 0 : _a; const _b = rect.bottom; const bottom = _b === void 0 ? 0 : _b;
                const offset = direction === 'down' ? bottom : _this.windowHeight - top;
                let wrapperStyle = "z-index: ".concat(zIndex, ";");
                if (direction === 'down') {
                    wrapperStyle += "top: ".concat((0, utils_1.addUnit)(offset), ";");
                }
                else {
                    wrapperStyle += "bottom: ".concat((0, utils_1.addUnit)(offset), ";");
                }
                return wrapperStyle;
            });
        },
        onTitleTap (event) {
            const _this = this;
            const {index} = event.currentTarget.dataset;
            const child = this.children[index];
            if (!child.data.disabled) {
                ARRAY.forEach((menuItem) => {
                    if (menuItem &&
                        menuItem.data.closeOnClickOutside &&
                        menuItem !== _this) {
                        menuItem.close();
                    }
                });
                this.toggleItem(index);
            }
        },
    },
});
