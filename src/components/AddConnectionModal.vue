<script setup lang="ts">
import { ref, watch } from "vue";
import { useHierarchyStore } from "../Store/AppStateStore";
//import { getRootObjects, getRootTags } from "../api/getters";
//import { useMessage } from "naive-ui";

const hierarchyStore = useHierarchyStore();
//const message = useMessage();

const props = defineProps({
  opened: {
    type: Boolean,
    required: true,
  },
});

const peresvetUrl = ref<string | null>(null);

const open = ref<boolean>(props.opened);

watch(props, async (newState, _) => {
  open.value = newState.opened;
});

async function fillTree() {
  if (!hierarchyStore.peresvetUrl) {
    return;
  }
  hierarchyStore.initTree();
  /*
  try {
    const rootObjects = await getRootObjects(hierarchyStore.peresvetUrl);
    hierarchyStore.tree!.children.find(
      (node) => node.attributes.objectClass === "prsObject"
    )!.children = rootObjects ? rootObjects : [];
  } catch (e: any) {
    message.error(
      `Ошибка при установке связи с сервисом objects: ${e.message}`
    );
  }
  try {
    const rootTags = await getRootTags(hierarchyStore.peresvetUrl);
    hierarchyStore.tree!.children.find(
      (node) => node.attributes.objectClass === "prsTag"
    )!.children = rootTags ? rootTags : [];
  } catch (e: any) {
    message.error(`Ошибка при установке связи с сервисом tags: ${e.message}`);
  }
  */
}

async function getConection() {
  hierarchyStore.peresvetUrl = peresvetUrl.value;
  if (hierarchyStore.peresvetUrl) {
    localStorage.setItem("peresvetUrl", hierarchyStore.peresvetUrl);
    await fillTree();
  }
}
</script>
<template>
  <n-modal v-model:show="open" preset="dialog" title="Создать">
    <template #header>
      <div>Установка соединения</div>
    </template>
    <div>
      <n-divider horizontal></n-divider>
      Внесите необходимую информацию для установки соединения
      <n-input
        :status="'error'"
        v-model:value="peresvetUrl"
        type="text"
        placeholder="URL адрес платформы Пересвет"
      />
    </div>
    <template #action>
      <div>
        <n-button @click="() => getConection()">Соединить</n-button>
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
