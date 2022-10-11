
Object.defineProperty(exports, "__esModule", { value: true });
exports.basic = void 0;
exports.basic = Behavior({
    methods: {
        $emit (name, detail, options) {
            this.triggerEvent(name, detail, options);
        },
        set (data) {
            this.setData(data);
            return new Promise((resolve) => wx.nextTick(resolve));
        },
    },
});
