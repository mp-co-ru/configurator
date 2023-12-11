<script setup lang="ts">
import { computed, PropType } from "vue";
import { IAttributes, INode } from "../interfaces";

const props = defineProps({
  node: {
    type: Object as PropType<INode | Omit<INode, string> | IAttributes | null>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const flatNode = computed(() => {
  function flattenObject(
    obj: Partial<INode> | Partial<IAttributes> | null,
    parentKey?: string
  ) {
    if (!obj) {
      return [];
    }
    let result: Array<any> = [];
    // delete obj["children"];
    Object.entries(obj).forEach(([key, val]) => {
      const _key = parentKey ? parentKey + "." + key : key;
      if (typeof val === "object" && !(val instanceof Array)) {
        result = [...result, ...flattenObject(val, _key)];
      } else {
        if (!["parentId", "_static", "isOpen", "objectClass"].includes(key)) {
          result.push([key, val, _key]);
        }
      }
    });
    return result;
  }
  return props.node ? flattenObject(props.node) : "";
});
</script>

<template>
  <n-form
    ref="formRef"
    :label-width="80"
    :model="node"
    :disabled="props.disabled"
  >
    <div v-for="[fieldName, fieldVal, fieldKey] in flatNode">
      <n-form-item
        :label="fieldName"
        :path="fieldKey"
        v-if="typeof fieldVal === 'string'"
      >
        <n-input
          :value="fieldVal"
          @input="(val: string) => $emit('updateField', {path: fieldKey, newVal: val})"
          :placeholder="fieldName"
        />
      </n-form-item>
      <n-form-item
        :label="fieldName"
        :path="fieldKey"
        v-if="typeof fieldVal === 'number'"
      >
        <n-input-number
          :value="fieldVal"
          @update:value="(val: number) => $emit('updateField', {path: fieldKey, newVal: val})"
          :placeholder="fieldName"
        />
      </n-form-item>
      <n-form-item
        :span="12"
        :label="fieldName"
        :path="fieldKey"
        v-if="typeof fieldVal === 'boolean'"
      >
        <n-switch
          :value="fieldVal"
          @update:value="(val: boolean) => $emit('updateField', {path: fieldKey, newVal: val})"
          :placeholder="fieldName"
        />
      </n-form-item>
    </div>
  </n-form>
</template>
