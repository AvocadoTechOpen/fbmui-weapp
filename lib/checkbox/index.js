
Object.defineProperty(exports, "__esModule", { value: true });
const relation_1 = require("../common/relation");
const component_1 = require("../common/component");

function emit(target, value) {
    target.$emit('input', value);
    target.$emit('change', value);
}
(0, component_1.VantComponent)({
    field: true,
    relation: (0, relation_1.useParent)('checkbox-group'),
    classes: ['icon-class', 'label-class'],
    props: {
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: {
            type: String,
            value: 'right',
        },
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: 'round',
        },
        iconSize: {
            type: null,
            value: 20,
        },
    },
    data: {
        parentDisabled: false,
        direction: 'vertical',
    },
    methods: {
        emitChange (value) {
            if (this.parent) {
                this.setParentValue(this.parent, value);
            }
            else {
                emit(this, value);
            }
        },
        toggle () {
            const _a = this.data; const {parentDisabled} = _a; const {disabled} = _a; const {value} = _a;
            if (!disabled && !parentDisabled) {
                this.emitChange(!value);
            }
        },
        onClickLabel () {
            const _a = this.data; const {labelDisabled} = _a; const {parentDisabled} = _a; const {disabled} = _a; const {value} = _a;
            if (!disabled && !labelDisabled && !parentDisabled) {
                this.emitChange(!value);
            }
        },
        setParentValue (parent, value) {
            const parentValue = parent.data.value.slice();
            const {name} = this.data;
            const {max} = parent.data;
            if (value) {
                if (max && parentValue.length >= max) {
                    return;
                }
                if (parentValue.indexOf(name) === -1) {
                    parentValue.push(name);
                    emit(parent, parentValue);
                }
            }
            else {
                const index = parentValue.indexOf(name);
                if (index !== -1) {
                    parentValue.splice(index, 1);
                    emit(parent, parentValue);
                }
            }
        },
    },
});
