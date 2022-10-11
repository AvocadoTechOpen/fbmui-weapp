
Object.defineProperty(exports, "__esModule", { value: true });
const relation_1 = require("../common/relation");
const component_1 = require("../common/component");

(0, component_1.VantComponent)({
    field: true,
    relation: (0, relation_1.useChildren)('checkbox', function (target) {
        this.updateChild(target);
    }),
    props: {
        max: Number,
        value: {
            type: Array,
            observer: 'updateChildren',
        },
        disabled: {
            type: Boolean,
            observer: 'updateChildren',
        },
        direction: {
            type: String,
            value: 'vertical',
        },
    },
    methods: {
        updateChildren () {
            const _this = this;
            this.children.forEach((child) => _this.updateChild(child));
        },
        updateChild (child) {
            const _a = this.data; const {value} = _a; const {disabled} = _a; const {direction} = _a;
            child.setData({
                value: value.indexOf(child.data.name) !== -1,
                parentDisabled: disabled,
                direction,
            });
        },
    },
});
