
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../common/color");
const component_1 = require("../common/component");
const relation_1 = require("../common/relation");
const utils_1 = require("../common/utils");
const page_scroll_1 = require("../mixins/page-scroll");

const indexList = function () {
    const indexList = [];
    const charCodeOfA = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
        indexList.push(String.fromCharCode(charCodeOfA + i));
    }
    return indexList;
};
(0, component_1.VantComponent)({
    relation: (0, relation_1.useChildren)('index-anchor', function () {
        this.updateData();
    }),
    props: {
        sticky: {
            type: Boolean,
            value: true,
        },
        zIndex: {
            type: Number,
            value: 1,
        },
        highlightColor: {
            type: String,
            value: color_1.GREEN,
        },
        stickyOffsetTop: {
            type: Number,
            value: 0,
        },
        indexList: {
            type: Array,
            value: indexList(),
        },
    },
    mixins: [
        (0, page_scroll_1.pageScrollMixin)(function (event) {
            this.scrollTop = (event === null || event === void 0 ? void 0 : event.scrollTop) || 0;
            this.onScroll();
        }),
    ],
    data: {
        activeAnchorIndex: null,
        showSidebar: false,
    },
    created () {
        this.scrollTop = 0;
    },
    methods: {
        updateData () {
            const _this = this;
            wx.nextTick(() => {
                if (_this.timer != null) {
                    clearTimeout(_this.timer);
                }
                _this.timer = setTimeout(() => {
                    _this.setData({
                        showSidebar: !!_this.children.length,
                    });
                    _this.setRect().then(() => {
                        _this.onScroll();
                    });
                }, 0);
            });
        },
        setRect () {
            return Promise.all([
                this.setAnchorsRect(),
                this.setListRect(),
                this.setSiderbarRect(),
            ]);
        },
        setAnchorsRect () {
            const _this = this;
            return Promise.all(this.children.map((anchor) => (0, utils_1.getRect)(anchor, '.fbm-index-anchor-wrapper').then((rect) => {
                    Object.assign(anchor, {
                        height: rect.height,
                        top: rect.top + _this.scrollTop,
                    });
                })));
        },
        setListRect () {
            const _this = this;
            return (0, utils_1.getRect)(this, '.fbm-index-bar').then((rect) => {
                if (!(0, utils_1.isDef)(rect)) {
                    return;
                }
                Object.assign(_this, {
                    height: rect.height,
                    top: rect.top + _this.scrollTop,
                });
            });
        },
        setSiderbarRect () {
            const _this = this;
            return (0, utils_1.getRect)(this, '.fbm-index-bar__sidebar').then((res) => {
                if (!(0, utils_1.isDef)(res)) {
                    return;
                }
                _this.sidebar = {
                    height: res.height,
                    top: res.top,
                };
            });
        },
        setDiffData (_a) {
            const {target} = _a; const {data} = _a;
            const diffData = {};
            Object.keys(data).forEach((key) => {
                if (target.data[key] !== data[key]) {
                    diffData[key] = data[key];
                }
            });
            if (Object.keys(diffData).length) {
                target.setData(diffData);
            }
        },
        getAnchorRect (anchor) {
            return (0, utils_1.getRect)(anchor, '.fbm-index-anchor-wrapper').then((rect) => ({
                height: rect.height,
                top: rect.top,
            }));
        },
        getActiveAnchorIndex () {
            const _a = this; const {children} = _a; const {scrollTop} = _a;
            const _b = this.data; const {sticky} = _b; const {stickyOffsetTop} = _b;
            for (let i = this.children.length - 1; i >= 0; i--) {
                const preAnchorHeight = i > 0 ? children[i - 1].height : 0;
                const reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;
                if (reachTop + scrollTop >= children[i].top) {
                    return i;
                }
            }
            return -1;
        },
        onScroll () {
            const _this = this;
            const _a = this; const _b = _a.children; const children = _b === void 0 ? [] : _b; const {scrollTop} = _a;
            if (!children.length) {
                return;
            }
            const _c = this.data; const {sticky} = _c; const {stickyOffsetTop} = _c; const {zIndex} = _c; const {highlightColor} = _c;
            const active = this.getActiveAnchorIndex();
            this.setDiffData({
                target: this,
                data: {
                    activeAnchorIndex: active,
                },
            });
            if (sticky) {
                let isActiveAnchorSticky_1 = false;
                if (active !== -1) {
                    isActiveAnchorSticky_1 =
                        children[active].top <= stickyOffsetTop + scrollTop;
                }
                children.forEach((item, index) => {
                    if (index === active) {
                        let wrapperStyle = '';
                        var anchorStyle = "\n              color: ".concat(highlightColor, ";\n            ");
                        if (isActiveAnchorSticky_1) {
                            wrapperStyle = "\n                height: ".concat(children[index].height, "px;\n              ");
                            anchorStyle = "\n                position: fixed;\n                top: ".concat(stickyOffsetTop, "px;\n                z-index: ").concat(zIndex, ";\n                color: ").concat(highlightColor, ";\n              ");
                        }
                        _this.setDiffData({
                            target: item,
                            data: {
                                active: true,
                                anchorStyle,
                                wrapperStyle,
                            },
                        });
                    }
                    else if (index === active - 1) {
                        const currentAnchor = children[index];
                        const currentOffsetTop = currentAnchor.top;
                        const targetOffsetTop = index === children.length - 1
                            ? _this.top
                            : children[index + 1].top;
                        const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
                        const translateY = parentOffsetHeight - currentAnchor.height;
                        var anchorStyle = "\n              position: relative;\n              transform: translate3d(0, ".concat(translateY, "px, 0);\n              z-index: ").concat(zIndex, ";\n              color: ").concat(highlightColor, ";\n            ");
                        _this.setDiffData({
                            target: item,
                            data: {
                                active: true,
                                anchorStyle,
                            },
                        });
                    }
                    else {
                        _this.setDiffData({
                            target: item,
                            data: {
                                active: false,
                                anchorStyle: '',
                                wrapperStyle: '',
                            },
                        });
                    }
                });
            }
        },
        onClick (event) {
            this.scrollToAnchor(event.target.dataset.index);
        },
        onTouchMove (event) {
            const sidebarLength = this.children.length;
            const touch = event.touches[0];
            const itemHeight = this.sidebar.height / sidebarLength;
            let index = Math.floor((touch.clientY - this.sidebar.top) / itemHeight);
            if (index < 0) {
                index = 0;
            }
            else if (index > sidebarLength - 1) {
                index = sidebarLength - 1;
            }
            this.scrollToAnchor(index);
        },
        onTouchStop () {
            this.scrollToAnchorIndex = null;
        },
        scrollToAnchor (index) {
            const _this = this;
            if (typeof index !== 'number' || this.scrollToAnchorIndex === index) {
                return;
            }
            this.scrollToAnchorIndex = index;
            const anchor = this.children.find((item) => item.data.index === _this.data.indexList[index]);
            if (anchor) {
                anchor.scrollIntoView(this.scrollTop);
                this.$emit('select', anchor.data.index);
            }
        },
    },
});
