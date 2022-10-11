
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageScrollMixin = void 0;
const utils_1 = require("../common/utils");

function onPageScroll(event) {
    const _a = (0, utils_1.getCurrentPage)().vanPageScroller; const vanPageScroller = _a === void 0 ? [] : _a;
    vanPageScroller.forEach((scroller) => {
        if (typeof scroller === 'function') {
            // @ts-ignore
            scroller(event);
        }
    });
}
const pageScrollMixin = function (scroller) {
    return Behavior({
        attached () {
            const page = (0, utils_1.getCurrentPage)();
            if (!(0, utils_1.isDef)(page)) {
                return;
            }
            if (Array.isArray(page.vanPageScroller)) {
                page.vanPageScroller.push(scroller.bind(this));
            }
            else {
                page.vanPageScroller =
                    typeof page.onPageScroll === 'function'
                        ? [page.onPageScroll.bind(page), scroller.bind(this)]
                        : [scroller.bind(this)];
            }
            page.onPageScroll = onPageScroll;
        },
        detached () {
            let _a;
            const page = (0, utils_1.getCurrentPage)();
            if ((0, utils_1.isDef)(page)) {
                page.vanPageScroller =
                    ((_a = page.vanPageScroller) === null || _a === void 0 ? void 0 : _a.filter((item) => item !== scroller)) || [];
            }
        },
    });
};
exports.pageScrollMixin = pageScrollMixin;
