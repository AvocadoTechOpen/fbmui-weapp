
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");

(0, component_1.VantComponent)({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: 'circular',
        },
        size: String,
        textSize: String,
    },
    data: {
        array12: Array.from({ length: 12 }),
    },
});
