<template>
  <div>
    <h1>header</h1>
    <div>Giá trị của count: {{ store.state.count }}</div>
    <button @click="click">Increasment</button>
    <button @click="alterClick">Increase after 1s</button>
    <!-- <p>Getter: {{ store.getters }}</p> -->

    <ul>
      <li v-for="todo in store.state.todos" :key="todo.id">
        {{ todo.name }}
      </li>
    </ul>
    <button @click="getTodo">Completed todo</button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const click = () => {
  store.commit("increment", {
    amount: 5,
  });
};

const alterClick = () => {
  store.dispatch("inc");
};

const getTodo = () => {
  console.log("Các công việc đã hoàn thành", store.getters.getCompletedTodo);
};
console.log(store);
</script>

<style></style>
