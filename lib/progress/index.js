
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const color_1 = require("../common/color");
const utils_1 = require("../common/utils");

(0, component_1.VantComponent)({
    props: {
        inactive: Boolean,
        percentage: {
            type: Number,
            observer: 'setLeft',
        },
        pivotText: String,
        pivotColor: String,
        trackColor: String,
        showPivot: {
            type: Boolean,
            value: true,
        },
        color: {
            type: String,
            value: color_1.BLUE,
        },
        textColor: {
            type: String,
            value: '#fff',
        },
        strokeWidth: {
            type: null,
            value: 4,
        },
    },
    data: {
        right: 0,
    },
    mounted () {
        this.setLeft();
    },
    methods: {
        setLeft () {
            const _this = this;
            Promise.all([
                (0, utils_1.getRect)(this, '.fbm-progress'),
                (0, utils_1.getRect)(this, '.fbm-progress__pivot'),
            ]).then((_a) => {
                const portion = _a[0]; const pivot = _a[1];
                if (portion && pivot) {
                    _this.setData({
                        right: (pivot.width * (_this.data.percentage - 100)) / 100,
                    });
                }
            });
        },
    },
});