
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
let queue = [];
const defaultOptions = {
    show: false,
    title: '',
    width: null,
    theme: 'default',
    message: '',
    zIndex: 100,
    overlay: true,
    selector: '#fbm-dialog',
    className: '',
    asyncClose: false,
    beforeClose: null,
    transition: 'scale',
    customStyle: '',
    messageAlign: '',
    overlayStyle: '',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickOverlay: false,
    confirmButtonOpenType: '',
};
let currentOptions = { ...defaultOptions};
function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
const Dialog = function (options) {
    options = {...currentOptions, ...options};
    return new Promise((resolve, reject) => {
        const context = options.context || getContext();
        const dialog = context.selectComponent(options.selector);
        delete options.context;
        delete options.selector;
        if (dialog) {
            dialog.setData({callback (action, instance) {
                    action === 'confirm' ? resolve(instance) : reject(instance);
                }, ...options});
            wx.nextTick(() => {
                dialog.setData({ show: true });
            });
            queue.push(dialog);
        }
        else {
            console.warn('未找到 fbm-dialog 节点，请确认 selector 及 context 是否正确');
        }
    });
};
Dialog.alert = function (options) { return Dialog(options); };
Dialog.confirm = function (options) {
    return Dialog({showCancelButton: true, ...options});
};
Dialog.close = function () {
    queue.forEach((dialog) => {
        dialog.close();
    });
    queue = [];
};
Dialog.stopLoading = function () {
    queue.forEach((dialog) => {
        dialog.stopLoading();
    });
};
Dialog.currentOptions = currentOptions;
Dialog.defaultOptions = defaultOptions;
Dialog.setDefaultOptions = function (options) {
    currentOptions = {...currentOptions, ...options};
    Dialog.currentOptions = currentOptions;
};
Dialog.resetDefaultOptions = function () {
    currentOptions = { ...defaultOptions};
    Dialog.currentOptions = currentOptions;
};
Dialog.resetDefaultOptions();
exports.default = Dialog;
