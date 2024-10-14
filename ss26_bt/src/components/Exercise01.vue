<template>
  <div>
    <h1>
      B1
      <div>
        <p>id:{{ store.state.user[0].id }},</p>
        <p>Họ và tên :{{ store.state.user[0].name }}</p>
        <p>Giới tính: {{ store.state.user[0].gender }}</p>
        <p>Ngày sinh:{{ store.state.user[0].date }}</p>
        <p>Địa chỉ:{{ store.state.user[0].address }}</p>
      </div>
    </h1>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
console.log(store);
</script>

<style></style>
