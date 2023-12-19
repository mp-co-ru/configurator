<script setup lang="ts">
import { createNode } from "../api/creators";
import { useAppStateStore, useHierarchyStore } from "../Store/AppStateStore";
import { INode, nodeTypes } from "./interfaces";
import CreateForm from "./NodeEditor/CreateForm.vue";
import { storeToRefs } from "pinia";
import { useMessage } from "naive-ui";

const store = useAppStateStore();
const hierarchyStore = useHierarchyStore();
const message = useMessage();

const { createNodeOpened } = storeToRefs(store);

async function saveNode() {
  const res = await createNode(
    hierarchyStore.peresvetUrl!,
    store.createNode!.attributes.objectClass,
    store.createNode!.attributes,
    store.createNodeParent !== "" ? store.createNodeParent : null
  );
  if (!res) {
    message.error("Ошибка создания тега");
  } else {
    message.success(`Тег ${res.id} создан`);
    store.createNode!.id = res.id.toString();
    createNodeOpened.value = false;
    hierarchyStore.createTreeNode(
      store.createNode as INode,
      store.createNodePath!
    );
  }
}
</script>
<template>
  <n-modal
    v-model:show="createNodeOpened"
    preset="dialog"
    title="Создать"
    :on-update:show="store.closeCreateNode"
  >
    <template #header>
      <div>Создание нового узла {{ store.createNodeType }}</div>
    </template>
    <div>
      <n-divider horizontal></n-divider>
      Укажите тип нового нода
      <n-space vertical>
        <n-select
          v-model:value="store.createNodeType"
          :options="store.NodeTypes"
          class="select-node-type"
          @update:value="(val: nodeTypes) => store.updateCreateNodeType(val)"
        />
      </n-space>
      <n-divider horizontal></n-divider>
      Внесите необходимую информацию для создания нового нода
      <CreateForm></CreateForm>
    </div>
    <template #action>
      <div>
        <n-button @click="saveNode">Save changes</n-button>
      </div>
    </template>
  </n-modal>
</template>
<style>
.add-node-modal-overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(39, 38, 38, 0.5);
  backdrop-filter: blur(3px);
}

.add-node-modal {
  padding: 10px;
  max-height: 80vh;
  overflow: scroll;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2d2d2d;
}

.add-node-modal-close {
  font-size: x-large;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
}

.add-node-modal-h-divider {
  height: 2px;
  background-color: #2d2d2d;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.add-node-modal-form > input {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  background: #424242;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 12px;
  color: #fff;
  border-radius: 0.3rem;
}

.select-node-type {
  background-color: #2d2d2d;
}

.add-node-save-button {
  background-color: #424242;
  border-radius: 0.4rem;
  border: 1px solid #646cff;
  transition-timing-function: ease-in-out;
  transition-duration: 0.1s;
}

.add-node-save-button:hover {
  background-color: #595959;
}
</style>
../api/main
