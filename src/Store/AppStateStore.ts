import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { set, get } from "lodash";
import { INode, nodeTypes } from "../components/interfaces";
import { EmptyObject, EmptyTag } from "../components/Hierarchy/EmptyNodes";
import { rootNode } from "./rootNodes";

export const useHierarchyStore = defineStore("hierarchyStore", () => {
  function deleteTreeNode(path: string) {
    if (!tree.value) {
      return;
    }
    const childIndex = parseInt(path[path.length - 2]);
    const parentPath = path.slice(0, -3);
    const subtree = get<INode | null>(tree.value, parentPath);
    if (subtree) {
      subtree.splice(childIndex, 1);
      set(tree, parentPath, subtree);
    }
  }

  function createTreeNode(node: INode, path: string) {
    if (!tree.value) {
      return;
    }
    let children: Array<INode> = get(tree.value, path);
    children.push(node);
  }

  const tree = ref<INode | null>(null);

  function initTree() {
    tree.value = { ...rootNode };
  }

  const initialPeresvetUrl = () => {
    const url = localStorage.getItem("peresvetUrl");
    if (!url) {
      return null;
    } else {
      initTree();
      return url;
    }
  };
  const peresvetUrl = ref<string | null>(initialPeresvetUrl());

  return {
    tree,
    peresvetUrl,
    deleteTreeNode,
    createTreeNode,
    initTree,
  };
});

export const useAppStateStore = defineStore("appState", () => {
  const createNodeOpened = ref<Boolean>(false);
  function openCreateNode() {
    if (createNodeOpened.value === false) {
      createNodeOpened.value = !createNodeOpened.value;
    }
  }

  function closeCreateNode() {
    createNode.value = null;
    createNodeParent.value = null;
    createNodePath.value = null;
    createNodeType.value = null;
    createNodeOpened.value = !createNodeOpened.value;
  }

  const createNodeType = ref<string | null>(null);

  interface INodeTypes {
    label: String;
    value: String;
    template: Object;
  }

  const NodeTypes = [
    { label: "Object", value: "Object", template: EmptyObject },
    { label: "Tag", value: "Tag", template: EmptyTag },
  ];

  const selectedNode = ref<INode | null>(null);

  watch(createNodeType, async (newState, _) => {
    const newTemplate = NodeTypes.filter(
      (t: INodeTypes) => t.label === newState
    )[0].template;
    createNode.value = newTemplate;
  });

  const createNodeParent = ref<string | null>(null);
  const createNode = ref<INode | null>(null);

  const createNodePath = ref<string | null>(null);

  function updateCreateNodeType(newType: nodeTypes) {
    createNodeType.value = newType;
  }

  function setSelectedNode(nodeData: INode) {
    selectedNode.value = nodeData;
  }

  function updateSelectedNode(key: string, newData: any) {
    if (selectedNode.value) {
      set(selectedNode.value, key, newData);
    }
  }

  function updateCreateNode(key: string, newData: any) {
    if (createNode.value) {
      set(createNode.value, key, newData);
    }
  }

  return {
    createNodeOpened,
    openCreateNode,
    closeCreateNode,
    createNodeType,
    selectedNode,
    setSelectedNode,
    updateSelectedNode,
    createNode,
    createNodePath,
    createNodeParent,
    updateCreateNode,
    updateCreateNodeType,
    NodeTypes,
  };
});
