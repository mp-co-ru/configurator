<script setup lang="ts">
import { ref } from "vue";
import { useAppStateStore, useHierarchyStore } from "../../Store/AppStateStore";
import AddConnectionModal from "../AddConnectionModal.vue";
import HierarchyNode from "./HierarchyNode.vue";
import { storeToRefs } from "pinia";

const store = useAppStateStore();
const hierarchyStore = useHierarchyStore();

const { tree } = storeToRefs(hierarchyStore);

const addConnectionModalOpen = ref<boolean>(false);
</script>

<template>
  <div class="hierarchy-tree-viewer">
    <ul class="hierarchy-block" v-if="hierarchyStore.peresvetUrl && tree">
      <HierarchyNode class="item" path="" :model="tree"></HierarchyNode>
      <li class="add" @click="store.openCreateNode()"></li>
    </ul>
    <n-empty
      v-if="!tree"
      size="huge"
      description="
      Для работы конфигуратора
      установите соединение с платформой Пересвет"
    >
      <template #extra>
        <n-button size="large" @click="addConnectionModalOpen = true">
          Установить
        </n-button>
      </template>
    </n-empty>
  </div>
  <AddConnectionModal :opened="addConnectionModalOpen"></AddConnectionModal>
</template>

<style>
.hierarchy-tree-viewer .hierarchy-block {
  list-style: none;
  width: 400px;
}
</style>
