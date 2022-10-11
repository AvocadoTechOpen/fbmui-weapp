
Object.defineProperty(exports, "__esModule", { value: true });
const relation_1 = require("../common/relation");
const component_1 = require("../common/component");

(0, component_1.VantComponent)({
    relation: (0, relation_1.useParent)('row'),
    props: {
        span: Number,
        offset: Number,
    },
});
