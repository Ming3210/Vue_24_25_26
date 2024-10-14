<!-- src/components/RandomNumber.vue -->

<template>
  <div>
    <h1>B5</h1>
    <div>Random Numbers: {{ store.state.randomNumber }}</div>
    <button @click="add">Add random number</button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const add = () => {
  store.commit("addNumber");
};
</script>

<style scoped></style>
