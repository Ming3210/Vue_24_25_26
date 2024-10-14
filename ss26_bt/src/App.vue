<template>
  <div>
    <Exercise01 />
    <Exercise02 />
    <Exercise03 />
    <Exercise04 />
    <Exercise05 />
    <Exercise06 />
    <Exercise07 />
    <Exercise08 />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Exercise01 from "./components/Exercise01.vue";
import Exercise02 from "./components/Exercise02.vue";
import Exercise03 from "./components/Exercise03.vue";
import Exercise04 from "./components/Exercise04.vue";
import Exercise05 from "./components/Exercise05.vue";
import Exercise06 from "./components/Exercise06.vue";
import Exercise07 from "./components/Exercise07.vue";
import Exercise08 from "./components/Exercise08.vue";
import { useStore } from "vuex";
const store = useStore();

onMounted(() => {
  store.commit("initializeDarkMode");
});
</script>

<style></style>
