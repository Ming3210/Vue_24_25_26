<template>
  <div>
    <h1>B3</h1>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.state.product" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <button @click="deleteStudent(item.id)">Xóa</button>
            <button @click="deleteStudent(item.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<style></style>
