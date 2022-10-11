
const __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const utils_1 = require("./utils");
const toast_1 = __importDefault(require("../toast/toast"));
const utils_2 = require("../common/utils");

const initialMinDate = (0, utils_1.getToday)().getTime();
const initialMaxDate = (function () {
    const now = (0, utils_1.getToday)();
    return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()).getTime();
})();
const getTime = function (date) {
    return date instanceof Date ? date.getTime() : date;
};
(0, component_1.VantComponent)({
    props: {
        title: {
            type: String,
            value: '日期选择',
        },
        color: String,
        show: {
            type: Boolean,
            observer (val) {
                if (val) {
                    this.initRect();
                    this.scrollIntoView();
                }
            },
        },
        formatter: null,
        confirmText: {
            type: String,
            value: '确定',
        },
        confirmDisabledText: {
            type: String,
            value: '确定',
        },
        rangePrompt: String,
        showRangePrompt: {
            type: Boolean,
            value: true,
        },
        defaultDate: {
            type: null,
            observer (val) {
                this.setData({ currentDate: val });
                this.scrollIntoView();
            },
        },
        allowSameDay: Boolean,
        type: {
            type: String,
            value: 'single',
            observer: 'reset',
        },
        minDate: {
            type: Number,
            value: initialMinDate,
        },
        maxDate: {
            type: Number,
            value: initialMaxDate,
        },
        position: {
            type: String,
            value: 'bottom',
        },
        rowHeight: {
            type: null,
            value: utils_1.ROW_HEIGHT,
        },
        round: {
            type: Boolean,
            value: true,
        },
        poppable: {
            type: Boolean,
            value: true,
        },
        showMark: {
            type: Boolean,
            value: true,
        },
        showTitle: {
            type: Boolean,
            value: true,
        },
        showConfirm: {
            type: Boolean,
            value: true,
        },
        showSubtitle: {
            type: Boolean,
            value: true,
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true,
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true,
        },
        maxRange: {
            type: null,
            value: null,
        },
        firstDayOfWeek: {
            type: Number,
            value: 0,
        },
        readonly: Boolean,
    },
    data: {
        subtitle: '',
        currentDate: null,
        scrollIntoView: '',
    },
    created () {
        this.setData({
            currentDate: this.getInitialDate(this.data.defaultDate),
        });
    },
    mounted () {
        if (this.data.show || !this.data.poppable) {
            this.initRect();
            this.scrollIntoView();
        }
    },
    methods: {
        reset () {
            this.setData({ currentDate: this.getInitialDate() });
            this.scrollIntoView();
        },
        initRect () {
            const _this = this;
            if (this.contentObserver != null) {
                this.contentObserver.disconnect();
            }
            const contentObserver = this.createIntersectionObserver({
                thresholds: [0, 0.1, 0.9, 1],
                observeAll: true,
            });
            this.contentObserver = contentObserver;
            contentObserver.relativeTo('.fbm-calendar__body');
            contentObserver.observe('.month', (res) => {
                if (res.boundingClientRect.top <= res.relativeRect.top) {
                    // @ts-ignore
                    _this.setData({ subtitle: (0, utils_1.formatMonthTitle)(res.dataset.date) });
                }
            });
        },
        limitDateRange (date, minDate, maxDate) {
            if (minDate === void 0) { minDate = null; }
            if (maxDate === void 0) { maxDate = null; }
            minDate = minDate || this.data.minDate;
            maxDate = maxDate || this.data.maxDate;
            if ((0, utils_1.compareDay)(date, minDate) === -1) {
                return minDate;
            }
            if ((0, utils_1.compareDay)(date, maxDate) === 1) {
                return maxDate;
            }
            return date;
        },
        getInitialDate (defaultDate) {
            const _this = this;
            if (defaultDate === void 0) { defaultDate = null; }
            const _a = this.data; const {type} = _a; const {minDate} = _a; const {maxDate} = _a;
            const now = (0, utils_1.getToday)().getTime();
            if (type === 'range') {
                if (!Array.isArray(defaultDate)) {
                    defaultDate = [];
                }
                const _b = defaultDate || []; const startDay = _b[0]; const endDay = _b[1];
                const start = this.limitDateRange(startDay || now, minDate, (0, utils_1.getPrevDay)(new Date(maxDate)).getTime());
                const end = this.limitDateRange(endDay || now, (0, utils_1.getNextDay)(new Date(minDate)).getTime());
                return [start, end];
            }
            if (type === 'multiple') {
                if (Array.isArray(defaultDate)) {
                    return defaultDate.map((date) => _this.limitDateRange(date));
                }
                return [this.limitDateRange(now)];
            }
            if (!defaultDate || Array.isArray(defaultDate)) {
                defaultDate = now;
            }
            return this.limitDateRange(defaultDate);
        },
        scrollIntoView () {
            const _this = this;
            (0, utils_2.requestAnimationFrame)(() => {
                const _a = _this.data; const {currentDate} = _a; const {type} = _a; const {show} = _a; const {poppable} = _a; const {minDate} = _a; const {maxDate} = _a;
                // @ts-ignore
                const targetDate = type === 'single' ? currentDate : currentDate[0];
                const displayed = show || !poppable;
                if (!targetDate || !displayed) {
                    return;
                }
                const months = (0, utils_1.getMonths)(minDate, maxDate);
                months.some((month, index) => {
                    if ((0, utils_1.compareMonth)(month, targetDate) === 0) {
                        _this.setData({ scrollIntoView: "month".concat(index) });
                        return true;
                    }
                    return false;
                });
            });
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
        },
        onClickDay (event) {
            if (this.data.readonly) {
                return;
            }
            let {date} = event.detail;
            const _a = this.data; const {type} = _a; const {currentDate} = _a; const {allowSameDay} = _a;
            if (type === 'range') {
                // @ts-ignore
                const startDay_1 = currentDate[0]; const endDay = currentDate[1];
                if (startDay_1 && !endDay) {
                    const compareToStart = (0, utils_1.compareDay)(date, startDay_1);
                    if (compareToStart === 1) {
                        const days_1 = this.selectComponent('.month').data.days;
                        days_1.some((day, index) => {
                            const isDisabled = day.type === 'disabled' &&
                                getTime(startDay_1) < getTime(day.date) &&
                                getTime(day.date) < getTime(date);
                            if (isDisabled) {
                                (date = days_1[index - 1].date);
                            }
                            return isDisabled;
                        });
                        this.select([startDay_1, date], true);
                    }
                    else if (compareToStart === -1) {
                        this.select([date, null]);
                    }
                    else if (allowSameDay) {
                        this.select([date, date]);
                    }
                }
                else {
                    this.select([date, null]);
                }
            }
            else if (type === 'multiple') {
                let selectedIndex_1;
                // @ts-ignore
                const selected = currentDate.some((dateItem, index) => {
                    const equal = (0, utils_1.compareDay)(dateItem, date) === 0;
                    if (equal) {
                        selectedIndex_1 = index;
                    }
                    return equal;
                });
                if (selected) {
                    // @ts-ignore
                    const cancelDate = currentDate.splice(selectedIndex_1, 1);
                    this.setData({ currentDate });
                    this.unselect(cancelDate);
                }
                else {
                    // @ts-ignore
                    this.select(__spreadArray(__spreadArray([], currentDate, true), [date], false));
                }
            }
            else {
                this.select(date, true);
            }
        },
        unselect (dateArray) {
            const date = dateArray[0];
            if (date) {
                this.$emit('unselect', (0, utils_1.copyDates)(date));
            }
        },
        select (date, complete) {
            if (complete && this.data.type === 'range') {
                const valid = this.checkRange(date);
                if (!valid) {
                    // auto selected to max range if showConfirm
                    if (this.data.showConfirm) {
                        this.emit([
                            date[0],
                            (0, utils_1.getDayByOffset)(date[0], this.data.maxRange - 1),
                        ]);
                    }
                    else {
                        this.emit(date);
                    }
                    return;
                }
            }
            this.emit(date);
            if (complete && !this.data.showConfirm) {
                this.onConfirm();
            }
        },
        emit (date) {
            this.setData({
                currentDate: Array.isArray(date) ? date.map(getTime) : getTime(date),
            });
            this.$emit('select', (0, utils_1.copyDates)(date));
        },
        checkRange (date) {
            const _a = this.data; const {maxRange} = _a; const {rangePrompt} = _a; const {showRangePrompt} = _a;
            if (maxRange && (0, utils_1.calcDateNum)(date) > maxRange) {
                if (showRangePrompt) {
                    (0, toast_1.default)({
                        context: this,
                        message: rangePrompt || "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 ".concat(maxRange, " \u5929"),
                    });
                }
                this.$emit('over-range');
                return false;
            }
            return true;
        },
        onConfirm () {
            const _this = this;
            if (this.data.type === 'range' &&
                !this.checkRange(this.data.currentDate)) {
                return;
            }
            wx.nextTick(() => {
                // @ts-ignore
                _this.$emit('confirm', (0, utils_1.copyDates)(_this.data.currentDate));
            });
        },
        onClickSubtitle (event) {
            this.$emit('click-subtitle', event);
        },
    },
});
