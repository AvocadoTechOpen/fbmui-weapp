
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
const component_1 = require("../common/component");
const utils_1 = require("./utils");
const shared_1 = require("./shared");
const validator_1 = require("../common/validator");

(0, component_1.VantComponent)({
    props: {disabled: Boolean, multiple: Boolean, uploadText: String, useBeforeRead: Boolean, afterRead: null, beforeRead: null, previewSize: {
            type: null,
            value: 80,
        }, name: {
            type: null,
            value: '',
        }, accept: {
            type: String,
            value: 'image',
        }, fileList: {
            type: Array,
            value: [],
            observer: 'formatFileList',
        }, maxSize: {
            type: Number,
            value: Number.MAX_VALUE,
        }, maxCount: {
            type: Number,
            value: 100,
        }, deletable: {
            type: Boolean,
            value: true,
        }, showUpload: {
            type: Boolean,
            value: true,
        }, previewImage: {
            type: Boolean,
            value: true,
        }, previewFullImage: {
            type: Boolean,
            value: true,
        }, imageFit: {
            type: String,
            value: 'scaleToFill',
        }, uploadIcon: {
            type: String,
            value: 'photograph',
        }, ...shared_1.chooseImageProps, ...shared_1.chooseVideoProps},
    data: {
        lists: [],
        isInCount: true,
    },
    methods: {
        formatFileList () {
            const _a = this.data; const _b = _a.fileList; const fileList = _b === void 0 ? [] : _b; const {maxCount} = _a;
            const lists = fileList.map((item) => ({...item, isImage: (0, utils_1.isImageFile)(item), isVideo: (0, utils_1.isVideoFile)(item), deletable: (0, validator_1.isBoolean)(item.deletable) ? item.deletable : true}));
            this.setData({ lists, isInCount: lists.length < maxCount });
        },
        getDetail (index) {
            return {
                name: this.data.name,
                index: index == null ? this.data.fileList.length : index,
            };
        },
        startUpload () {
            const _this = this;
            const _a = this.data; const {maxCount} = _a; const {multiple} = _a; const {lists} = _a; const {disabled} = _a;
            if (disabled)
                return;
            (0, utils_1.chooseFile)({...this.data, maxCount: maxCount - lists.length})
                .then((res) => {
                _this.onBeforeRead(multiple ? res : res[0]);
            })
                .catch((error) => {
                _this.$emit('error', error);
            });
        },
        onBeforeRead (file) {
            const _this = this;
            const _a = this.data; const {beforeRead} = _a; const {useBeforeRead} = _a;
            let res = true;
            if (typeof beforeRead === 'function') {
                res = beforeRead(file, this.getDetail());
            }
            if (useBeforeRead) {
                res = new Promise((resolve, reject) => {
                    _this.$emit('before-read', {file, ..._this.getDetail(), callback (ok) {
                            ok ? resolve() : reject();
                        }});
                });
            }
            if (!res) {
                return;
            }
            if ((0, validator_1.isPromise)(res)) {
                res.then((data) => _this.onAfterRead(data || file));
            }
            else {
                this.onAfterRead(file);
            }
        },
        onAfterRead (file) {
            const _a = this.data; const {maxSize} = _a; const {afterRead} = _a;
            const oversize = Array.isArray(file)
                ? file.some((item) => item.size > maxSize)
                : file.size > maxSize;
            if (oversize) {
                this.$emit('oversize', {file, ...this.getDetail()});
                return;
            }
            if (typeof afterRead === 'function') {
                afterRead(file, this.getDetail());
            }
            this.$emit('after-read', {file, ...this.getDetail()});
        },
        deleteItem (event) {
            const {index} = event.currentTarget.dataset;
            this.$emit('delete', {...this.getDetail(index), file: this.data.fileList[index]});
        },
        onPreviewImage (event) {
            if (!this.data.previewFullImage)
                return;
            const {index} = event.currentTarget.dataset;
            const {lists} = this.data;
            const item = lists[index];
            wx.previewImage({
                urls: lists.filter((item) => (0, utils_1.isImageFile)(item)).map((item) => item.url),
                current: item.url,
                fail () {
                    wx.showToast({ title: '预览图片失败', icon: 'none' });
                },
            });
        },
        onPreviewVideo (event) {
            if (!this.data.previewFullImage)
                return;
            const {index} = event.currentTarget.dataset;
            const {lists} = this.data;
            wx.previewMedia({
                sources: lists
                    .filter((item) => (0, utils_1.isVideoFile)(item))
                    .map((item) => ({...item, type: 'video'})),
                current: index,
                fail () {
                    wx.showToast({ title: '预览视频失败', icon: 'none' });
                },
            });
        },
        onPreviewFile (event) {
            const {index} = event.currentTarget.dataset;
            wx.openDocument({
                filePath: this.data.lists[index].url,
                showMenu: true,
            });
        },
        onClickPreview (event) {
            const {index} = event.currentTarget.dataset;
            const item = this.data.lists[index];
            this.$emit('click-preview', {...item, ...this.getDetail(index)});
        },
    },
});
