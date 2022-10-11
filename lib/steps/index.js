
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const color_1 = require("../common/color");

(0, component_1.VantComponent)({
    classes: ['desc-class'],
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: 'horizontal',
        },
        activeColor: {
            type: String,
            value: color_1.GREEN,
        },
        inactiveColor: {
            type: String,
            value: color_1.GRAY_DARK,
        },
        activeIcon: {
            type: String,
            value: 'checked',
        },
        inactiveIcon: String,
    },
    methods: {
        onClick (event) {
            const {index} = event.currentTarget.dataset;
            this.$emit('click-step', index);
        },
    },
});
