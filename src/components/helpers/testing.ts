import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { set, cloneDeep } from "lodash";
import { EmptyObject, EmptyTag } from "../Hierarchy/EmptyNodes";
import { INode } from "../interfaces";
import { create } from "naive-ui";

interface INodeTypes {
  label: String;
  value: String;
  template: Object;
}

const NodeTypes = ref<Array<INodeTypes>>([
  { label: "Object", value: "Object", template: EmptyObject },
  { label: "Tag", value: "Tag", template: EmptyTag },
  { label: "Data source", value: "DataSource", template: {} },
]);

const createNodeType = ref<string>("Tag");

const internalCreateNode = () => {
  return NodeTypes.value.filter(
    (t: INodeTypes) => t.label === createNodeType.value
  )[0];
};

const createNode = reactive(internalCreateNode());

console.log(createNode);
