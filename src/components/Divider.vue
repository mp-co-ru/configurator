<script setup lang="ts">
import { defineProps } from 'vue';

// const isMouseDown = false,
//   leftContent = document.querySelector('.left'),
//   divider = document.querySelector('.divider'),
//   rightContent = document.querySelector('.right');

interface DividerProps {
  text: String;
  width: number;
}

const props = defineProps<DividerProps>();
</script>

<template>
  <div class="main-vert-divider">
    {{ props.text }}
  </div>
</template>

<style>
.main-vert-divider {
  height: 100vh;
  width: v-bind(width);
  background-color: black;
}
</style>
