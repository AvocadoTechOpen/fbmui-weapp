
Object.defineProperty(exports, "__esModule", { value: true });
exports.transition = void 0;
// @ts-nocheck
const utils_1 = require("../common/utils");
const validator_1 = require("../common/validator");

const getClassNames = function (name) { return ({
    enter: "fbm-".concat(name, "-enter fbm-").concat(name, "-enter-active enter-class enter-active-class"),
    'enter-to': "fbm-".concat(name, "-enter-to fbm-").concat(name, "-enter-active enter-to-class enter-active-class"),
    leave: "fbm-".concat(name, "-leave fbm-").concat(name, "-leave-active leave-class leave-active-class"),
    'leave-to': "fbm-".concat(name, "-leave-to fbm-").concat(name, "-leave-active leave-to-class leave-active-class"),
}); };
function transition(showDefaultValue) {
    return Behavior({
        properties: {
            customStyle: String,
            // @ts-ignore
            show: {
                type: Boolean,
                value: showDefaultValue,
                observer: 'observeShow',
            },
            // @ts-ignore
            duration: {
                type: null,
                value: 300,
                observer: 'observeDuration',
            },
            name: {
                type: String,
                value: 'fade',
            },
        },
        data: {
            type: '',
            inited: false,
            display: false,
        },
        ready () {
            if (this.data.show === true) {
                this.observeShow(true, false);
            }
        },
        methods: {
            observeShow (value, old) {
                if (value === old) {
                    return;
                }
                value ? this.enter() : this.leave();
            },
            enter () {
                const _this = this;
                const _a = this.data; const {duration} = _a; const {name} = _a;
                const classNames = getClassNames(name);
                const currentDuration = (0, validator_1.isObj)(duration) ? duration.enter : duration;
                this.status = 'enter';
                this.$emit('before-enter');
                (0, utils_1.requestAnimationFrame)(() => {
                    if (_this.status !== 'enter') {
                        return;
                    }
                    _this.$emit('enter');
                    _this.setData({
                        inited: true,
                        display: true,
                        classes: classNames.enter,
                        currentDuration,
                    });
                    (0, utils_1.requestAnimationFrame)(() => {
                        if (_this.status !== 'enter') {
                            return;
                        }
                        _this.transitionEnded = false;
                        _this.setData({ classes: classNames['enter-to'] });
                    });
                });
            },
            leave () {
                const _this = this;
                if (!this.data.display) {
                    return;
                }
                const _a = this.data; const {duration} = _a; const {name} = _a;
                const classNames = getClassNames(name);
                const currentDuration = (0, validator_1.isObj)(duration) ? duration.leave : duration;
                this.status = 'leave';
                this.$emit('before-leave');
                (0, utils_1.requestAnimationFrame)(() => {
                    if (_this.status !== 'leave') {
                        return;
                    }
                    _this.$emit('leave');
                    _this.setData({
                        classes: classNames.leave,
                        currentDuration,
                    });
                    (0, utils_1.requestAnimationFrame)(() => {
                        if (_this.status !== 'leave') {
                            return;
                        }
                        _this.transitionEnded = false;
                        setTimeout(() => _this.onTransitionEnd(), currentDuration);
                        _this.setData({ classes: classNames['leave-to'] });
                    });
                });
            },
            onTransitionEnd () {
                if (this.transitionEnded) {
                    return;
                }
                this.transitionEnded = true;
                this.$emit("after-".concat(this.status));
                const _a = this.data; const {show} = _a; const {display} = _a;
                if (!show && display) {
                    this.setData({ display: false });
                }
            },
        },
    });
}
exports.transition = transition;
