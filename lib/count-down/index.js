
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const utils_1 = require("./utils");

function simpleTick(fn) {
    return setTimeout(fn, 30);
}
(0, component_1.VantComponent)({
    props: {
        useSlot: Boolean,
        millisecond: Boolean,
        time: {
            type: Number,
            observer: 'reset',
        },
        format: {
            type: String,
            value: 'HH:mm:ss',
        },
        autoStart: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        timeData: (0, utils_1.parseTimeData)(0),
        formattedTime: '0',
    },
    destroyed () {
        clearTimeout(this.tid);
        this.tid = null;
    },
    methods: {
        // 开始
        start () {
            if (this.counting) {
                return;
            }
            this.counting = true;
            this.endTime = Date.now() + this.remain;
            this.tick();
        },
        // 暂停
        pause () {
            this.counting = false;
            clearTimeout(this.tid);
        },
        // 重置
        reset () {
            this.pause();
            this.remain = this.data.time;
            this.setRemain(this.remain);
            if (this.data.autoStart) {
                this.start();
            }
        },
        tick () {
            if (this.data.millisecond) {
                this.microTick();
            }
            else {
                this.macroTick();
            }
        },
        microTick () {
            const _this = this;
            this.tid = simpleTick(() => {
                _this.setRemain(_this.getRemain());
                if (_this.remain !== 0) {
                    _this.microTick();
                }
            });
        },
        macroTick () {
            const _this = this;
            this.tid = simpleTick(() => {
                const remain = _this.getRemain();
                if (!(0, utils_1.isSameSecond)(remain, _this.remain) || remain === 0) {
                    _this.setRemain(remain);
                }
                if (_this.remain !== 0) {
                    _this.macroTick();
                }
            });
        },
        getRemain () {
            return Math.max(this.endTime - Date.now(), 0);
        },
        setRemain (remain) {
            this.remain = remain;
            const timeData = (0, utils_1.parseTimeData)(remain);
            if (this.data.useSlot) {
                this.$emit('change', timeData);
            }
            this.setData({
                formattedTime: (0, utils_1.parseFormat)(this.data.format, timeData),
            });
            if (remain === 0) {
                this.pause();
                this.$emit('finish');
            }
        },
    },
});