<template>
  <div>
    <h1>B6</h1>
    <p>{{ store.state.company }}</p>
    <button @click="change">Change State</button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const change = () => {
  store.commit("changeString");
};
</script>

<style></style>
