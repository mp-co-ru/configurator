import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { set, get } from "lodash";
import { INode, nodeTypes } from "../components/interfaces";
import {
  EmptyAlert,
  EmptyDataStorage,
  EmptyObject,
  EmptyTag,
} from "../models/nodeTemplates";
import { rootNode } from "../models/rootNodes";

export const useHierarchyStore = defineStore("hierarchyStore", () => {
  function deleteTreeNode(path: string) {
    if (!tree.value) {
      return;
    }
    const childIndex = parseInt(path[path.length - 2]);
    const parentPath = path.slice(0, -3);
    const subtree = get(tree.value, parentPath);
    if (subtree && subtree instanceof Array) {
      subtree.splice(childIndex, 1);
      set(tree, parentPath, subtree);
    }
  }

  function createTreeNode(node: INode, path: string) {
    if (!tree.value) {
      return;
    }
    let children = get(tree.value, path);
    if (children instanceof Array) {
      children.push(node);
    }
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
    { label: "Объект", value: "Объект", template: EmptyObject },
    { label: "Тег", value: "Тег", template: EmptyTag },
    {
      label: "Хранилище данных",
      value: "Хранилище данных",
      template: EmptyDataStorage,
    },
    { label: "Тревога", value: "Тревога", template: EmptyAlert },
  ];

  const selectedNode = ref<INode | null>(null);

  watch(createNodeType, async (newState, _) => {
    const newTemplate = NodeTypes.filter(
      (t: INodeTypes) => t.label === newState
    )[0].template;
    createNode.value = newTemplate as unknown as INode;
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
