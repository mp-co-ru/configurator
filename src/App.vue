<!--
A nested tree component that recursively renders itself.
You can double click on an item to turn it into a folder.
-->

<script setup lang="ts">
import { Separator } from "radix-vue";
import AddNodeModal from "./components/AddNodeModal.vue";
import HierarchyTree from "./components/Hierarchy/HierarchyTree.vue";
import { ref } from "vue";
import { INode } from "./components/interfaces";
import EditForm from "./components/NodeEditor/EditForm.vue";
import { useAppStateStore } from "./Store/AppStateStore";
import { darkTheme } from "naive-ui";

const store = useAppStateStore();

const theme = ref(darkTheme);
const siderCollapsed = ref<boolean>(store.selectedNode == null);
const setEditedNode = (node: INode | null) => {
  editedNode.value = node;
};
store.$subscribe((_, state) => setEditedNode(state.selectedNode));
const editedNode = ref<INode | null>(store.selectedNode);
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider max="3">
      <n-dialog-provider>
        <n-layout has-sider sider-placement="right">
          <div class="conf-header">
            <div
              class="logo"
              style="height: 100%; padding: 0.3rem; box-sizing: border-box"
            >
              <img src="./assets/logo_middle_text.png" style="height: 100%" />
            </div>
            <h1 class="conf-header-title">Конфигуратор</h1>
            <button class="conf-header-settings">
              <fa-icon icon="fa-solid fa-cog"></fa-icon>
            </button>
          </div>
          <div class="hierarchy-editor">
            <div class="hierarchy-tree">
              <div class="hierarchy-tree-menu">
                <Separator
                  class="hierarchy-tree-menu-divider"
                  orientation="vertical"
                ></Separator>
                <div class="hierarchy-tree-menu-search">
                  <fa-icon
                    icon="fa-solid fa-magnifying-glass"
                    class="hierarchy-tree-menu-search-icon"
                  ></fa-icon>
                  <input class="hierarchy-tree-menu-search-input" />
                </div>
                <Separator
                  class="hierarchy-tree-menu-divider"
                  orientation="vertical"
                ></Separator>
              </div>
              <HierarchyTree></HierarchyTree>
            </div>
            <n-layout-sider
              collapse-mode="width"
              :collapsed-width="64"
              :width="480"
              style="height: 100%"
              :collapsed="siderCollapsed"
              show-trigger="bar"
              @collapse="siderCollapsed = true"
              @expand="siderCollapsed = false"
            >
              <n-space vertical class="sider-container">
                <EditForm v-if="!siderCollapsed"></EditForm>
                <fa-icon icon="fa-solid fa-pen"></fa-icon>
              </n-space>
            </n-layout-sider>
          </div>
        </n-layout>
        <AddNodeModal></AddNodeModal>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
.conf-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 1rem;
  z-index: 99;
  padding-left: 1rem;
  padding-right: 1rem;
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 3rem;
  background-color: #1f1f1f;
  box-shadow: 0px 5px 25px #0e0e0e;
}

.conf-header > .conf-header-title {
  font-family: Circe-Regular;
  font-size: 1.5rem;
  color: #646cff;
  font-weight: 800;
  position: relative;
}

.conf-header-settings {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.hierarchy-editor {
  padding-top: 4.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-grow: 1;
  flex-flow: row;
  align-items: flex-start;
  gap: 1rem;
  background-color: #121212;
  /* flex: 1 1 0px; */
}

.hierarchy-editor > .hierarchy-tree {
  display: flex;
  background-color: #1f1f1f;
  box-sizing: border-box;
  border-radius: 1rem;
}

.hierarchy-editor > .hierarchy-tree {
  padding: 1rem;
  ul {
    padding-left: 50px;
  }
}

.hierarchy-editor > .hierarchy-tree {
  flex-flow: column;
  flex-grow: 1;
  height: 100%;
  margin-right: 0.5rem;
}

.hierarchy-tree-menu {
  border: 1px solid #262855;
  box-shadow: 0px 3px 20px #0e0e0e;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.8rem;
  height: 3.5rem;
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 0.3rem 1rem;
  gap: 1rem;
  background-color: #121212;
}

.hierarchy-tree-menu-divider {
  background-color: #262855;
  width: 1px;
  height: 100%;
}

.hierarchy-tree-menu-search {
  position: relative;
  display: flex;
  flex-flow: row;
}

.sider-container {
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: auto;
  justify-content: top !important;
}

.hierarchy-tree-menu-search-input {
  border-radius: 0.4rem;
  border: none;
  height: 1.5rem;
  padding-left: 2rem;
}

.hierarchy-tree-menu-search-input:focus-visible {
  border: 1px solid #646cff;
}

.hierarchy-tree-menu-search-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.3rem;
}

.hierarchy-tree-viewer {
  overflow: auto;
}

.hierarchy-block {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>
