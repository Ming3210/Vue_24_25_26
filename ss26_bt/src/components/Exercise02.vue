<template>
  <div>
    <h1>B2</h1>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Địa chỉ</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.state.user" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.dob }}</td>
          <td>{{ item.address }}</td>
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
