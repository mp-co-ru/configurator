<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStateStore } from "../../Store/AppStateStore";
import NodeForm from "./NodeForm.vue";

const store = useAppStateStore();
const { createNode } = storeToRefs(store);
</script>
<template>
  <NodeForm
    :node="createNode"
    @update-field="({ path, newVal }) => store.updateCreateNode(path, newVal)"
  ></NodeForm>
</template>
<style></style>
