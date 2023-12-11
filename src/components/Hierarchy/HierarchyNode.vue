<script setup lang="ts">
import { defineProps, PropType, computed, ref } from "vue";
import { INode } from "../interfaces.js";
import type { objectClass } from "../interfaces";
import { useAppStateStore, useHierarchyStore } from "../../Store/AppStateStore";
import { useDialog, useMessage, useThemeVars } from "naive-ui";
import AddNodeButton from "./AddNodeButton.vue";
import { getChildren } from "../../api/getters";
import { deleteNode } from "../../api/deleters";

const themeVars = useThemeVars();
const store = useAppStateStore();
const message = useMessage();
const dialog = useDialog();

async function handleDelete(id: string, objClass: objectClass) {
  dialog.warning({
    title: "Confirm",
    content: "Are you sure?",
    positiveText: "Sure",
    negativeText: "Not Sure",
    onPositiveClick: () => {
      deleteNode(hierarchyStore.peresvetUrl!, objClass, id).then((res) => {
        if (res) {
          console.log(res);
          hierarchyStore.deleteTreeNode(props.path);
          message.success("Удален");
        } else {
          message.error(`Ошибка удаления нода ${id}`);
        }
      });
    },
    onNegativeClick: () => {
      message.error("Отмена");
    },
  });
}

const hierarchyStore = useHierarchyStore();

const props = defineProps({
  model: {
    type: Object as PropType<INode>,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
const isOpen = ref(false);
const loading = ref<boolean>(false);
const isFolder = computed(() => {
  return props.model.children && props.model.children.length;
});

const pathPrefix = computed(() => (props.path !== "" ? "." : ""));

const nodeOptions = [
  {
    label: "Добавить нод",
    key: "addChild",
  },
];

const handleNodeOptionSelect = (key: string | number) => {
  switch (key) {
    case "addChild":
      store.openCreateNode();
      store.createNodeParent = props.model.id;
      break;
    default:
      break;
  }
};

const nodeOptionsShow = ref<boolean>(false);

async function getChild() {
  if (props.model._static) {
    if (props.model.children.length > 0) {
      isOpen.value = !isOpen.value;
    }
    return;
  }
  loading.value = true;
  try {
    const children = await getChildren(
      hierarchyStore.peresvetUrl!,
      props.model.attributes.objectClass as objectClass,
      props.model.id.toString()
    );
    props.model.children = children;
    isOpen.value = !isOpen.value;
    loading.value = false;
  } catch (e: any) {
    message.error(e.message);
    loading.value = false;
  }
}
</script>
<template>
  <li class="hierarchy-item">
    <div
      class="hierarchy-item-content"
      :class="{ bold: isFolder }"
      @click="getChild"
    >
      <div class="hierarchy-item-info">
        <div v-if="isFolder" class="folder-icon">
          <fa-icon
            v-if="isOpen && !loading"
            icon="fa-solid fa-folder-open"
          ></fa-icon>
          <fa-icon
            v-if="!isOpen && !loading"
            icon="fa-solid fa-folder-closed"
          ></fa-icon>
          <n-spin :size="20" v-if="loading" />
        </div>

        <n-popover trigger="hover">
          <template #trigger>
            <fa-icon
              icon="fa-solid fa-box"
              :color="themeVars.primaryColorHover"
              v-if="props.model.attributes.objectClass === 'prsObject'"
            ></fa-icon>
            <fa-icon
              icon="fa-solid fa-gear"
              :color="themeVars.primaryColorHover"
              v-if="props.model.attributes.objectClass === 'prsTag'"
            ></fa-icon>
            <span
              v-if="
                props.model.attributes.objectClass !== 'prsObject' &&
                props.model.attributes.objectClass !== 'prsTag'
              "
            ></span>
          </template>
          <span>Объект</span>
        </n-popover>
        <span class="hierarchy-node-name">{{ model.attributes.cn }}</span>
        <n-divider vertical></n-divider>
        <div class="hierarchy-item-options">
          <n-button-group horizontal>
            <n-button tertiary size="tiny" round>
              <fa-icon
                icon="fa-solid fa-trash"
                color="#de4f44"
                @click="handleDelete(model.id, model.attributes.objectClass)"
              ></fa-icon>
            </n-button>
            <n-button tertiary size="tiny" round>
              <n-dropdown
                :on-clickoutside="() => (nodeOptionsShow = false)"
                :show="nodeOptionsShow"
                :options="nodeOptions"
                @select="handleNodeOptionSelect"
                placement="right"
                size="small"
              >
                <n-button
                  class="node-options-button"
                  quaternary
                  @click.stop="nodeOptionsShow = !nodeOptionsShow"
                  ><fa-icon icon="fa-solid fa-ellipsis"></fa-icon
                ></n-button>
              </n-dropdown>
            </n-button>
          </n-button-group>
        </div>
      </div>
    </div>
    <ul class="hierarchy-block" v-show="isOpen" v-if="isFolder">
      <HierarchyNode
        :key="`${props.path}${pathPrefix}children[${index}]`"
        class="item"
        v-for="(mod, index) in model.children"
        :model="mod"
        :path="`${props.path}${pathPrefix}children[${index}]`"
        @click.stop="store.setSelectedNode(mod)"
      >
      </HierarchyNode>
      <AddNodeButton
        :parent-id="model.id"
        :path="`${props.path}${pathPrefix}children`"
      ></AddNodeButton>
    </ul>
  </li>
</template>
<style>
.hierarchy-item {
  padding: 0.2rem;
  width: 400px;
}

.hierarchy-item::marker {
  display: none;
}

.hierarchy-item > .hierarchy-item-content {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-flow: row;
  width: 100%;
}

.hierarchy-item > .hierarchy-item-content > .hierarchy-item-info {
  justify-content: space-between;
  background-color: #2a2a2a;
  width: 100%;
  border-radius: 0.4rem;
  transition-timing-function: ease-in-out;
  transition-duration: 0.1s;
  padding: 0.5rem 1rem 0.5rem 1rem;
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 1rem;
  border: 1px solid transparent;
}

.hierarchy-item
  > .hierarchy-item-content
  > .hierarchy-item-info
  > .folder-icon {
  display: flex;
  align-items: center;
}

.hierarchy-item > .hierarchy-item-content > .hierarchy-item-info:hover {
  border: 1px solid v-bind("themeVars.primaryColorHover");
  background-color: #363636;
}

.hierarchy-item
  > .hierarchy-item-content
  > .hierarchy-item-info
  > .hierarchy-node-name {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.node-options-button {
  padding: 0;
}
.node-options-button:active,
.node-options-button:hover,
.node-options-button:focus {
  background-color: transparent !important;
}
</style>
