<template>
  <div>
    <h1>B4</h1>
    <div>
      <p>{{ store.state.count }}</p>
    </div>
    <button @click="inc">Increasment</button>
    <button @click="de">Decreament</button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const inc = () => {
  store.commit("increment");
};

const de = () => {
  store.commit("decrement");
};
</script>

<style></style>
