<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStateStore, useHierarchyStore } from "../../Store/AppStateStore";
import NodeForm from "./NodeForm.vue";
import { ref } from "vue";
import { updateNode } from "../../api/updaters";

const hierarchyStore = useHierarchyStore();
const store = useAppStateStore();
const { selectedNode } = storeToRefs(store);
const disabled = ref<boolean>(true);

async function updateHandler() {
  if (!hierarchyStore.peresvetUrl || !selectedNode.value) {
    return;
  }
  updateNode(
    hierarchyStore.peresvetUrl,
    selectedNode.value.attributes.objectClass,
    selectedNode.value
  );
}
</script>
<template>
  <div class="node-editor" v-if="store.selectedNode">
    <div class="node-editor-title">
      <h2>Свойства</h2>
      <n-button circle @click="disabled = !disabled"
        ><fa-icon icon="fa-solid fa-pen"></fa-icon
      ></n-button>
    </div>
    <n-divider />
    <div class="node-editor-view">
      <NodeForm
        :node="selectedNode"
        @update-field="
          ({ path, newVal }) => store.updateSelectedNode(path, newVal)
        "
        :disabled="disabled"
      ></NodeForm>
    </div>
    <n-divider />
    <div class="node-editor-save">
      <n-button :disabled="disabled" @click="updateHandler">Сохранить</n-button>
    </div>
  </div>
</template>
<style>
.node-editor {
  display: flex;
  background-color: #1f1f1f;
  box-sizing: border-box;
  border-radius: 1rem;
  flex-flow: column;
  height: 100%;
  padding-left: 1rem;
  padding-bottom: 2rem;
  padding-top: 1rem;
  padding-right: 2rem;
}

.node-editor > .node-editor-title {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.node-editor > .node-editor-view {
  height: 100%;
  overflow: scroll;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
}

.node-editor > .node-editor-save {
  padding-top: 0.5rem;
}
</style>
