
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../common/component");
const relation_1 = require("../common/relation");

(0, component_1.VantComponent)({
    props: {
        info: null,
        name: null,
        icon: String,
        dot: Boolean,
        iconPrefix: {
            type: String,
            value: 'van-icon',
        },
    },
    relation: (0, relation_1.useParent)('tabbar'),
    data: {
        active: false,
        activeColor: '',
        inactiveColor: '',
    },
    methods: {
        onClick () {
            const {parent} = this;
            if (parent) {
                const index = parent.children.indexOf(this);
                const active = this.data.name || index;
                if (active !== this.data.active) {
                    parent.$emit('change', active);
                }
            }
            this.$emit('click');
        },
        updateFromParent () {
            const {parent} = this;
            if (!parent) {
                return;
            }
            const index = parent.children.indexOf(this);
            const parentData = parent.data;
            const {data} = this;
            const active = (data.name || index) === parentData.active;
            const patch = {};
            if (active !== data.active) {
                patch.active = active;
            }
            if (parentData.activeColor !== data.activeColor) {
                patch.activeColor = parentData.activeColor;
            }
            if (parentData.inactiveColor !== data.inactiveColor) {
                patch.inactiveColor = parentData.inactiveColor;
            }
            if (Object.keys(patch).length > 0) {
                this.setData(patch);
            }
        },
    },
});
