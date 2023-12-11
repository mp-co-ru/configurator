<script setup lang="ts">
import { useAppStateStore } from "../../Store/AppStateStore";
import { useThemeVars } from "naive-ui";

const props = defineProps({
  parentId: {
    type: String,
    required: true,
    default: "",
  },
  path: {
    type: String,
    required: true,
    defualt: "",
  },
});

function addNodeHandler() {
  store.openCreateNode();
  store.createNodeParent = props.parentId;
  store.createNodePath = props.path;
}

const themeVars = useThemeVars();
const store = useAppStateStore();
</script>

<template>
  <n-popover trigger="hover">
    <template #trigger>
      <li class="add-node-button" @click="addNodeHandler">
        <div class="content">
          <div class="info">
            <fa-icon icon="fa-solid fa-plus"></fa-icon>
          </div>
        </div>
      </li>
    </template>
    <span>Добавить новый узел</span>
  </n-popover>
</template>

<style>
.add-node-button {
  padding: 0.2rem;
  width: 100%;
}

.add-node-button::marker {
  display: none;
}

.add-node-button > .content {
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: center;
  flex-flow: row;
}

.add-node-button > .content > .info {
  width: 100%;
  background-color: v-bind("themeVars.primaryColorSuppl");
  filter: opacity(0.5);
  border-radius: 0.4rem;
  transition-timing-function: ease-in-out;
  transition-duration: 0.1s;
  padding: 0.1rem 1rem 0.1rem 1rem;
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 1rem;
  border: 1px solid transparent;
}

.add-node-button > .content > .info:hover {
  filter: opacity(1);
  border: 1px solid v-bind("themeVars.primaryColorHover");
  background-color: #363636;
}
</style>
