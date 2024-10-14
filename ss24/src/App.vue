<template>
  <div>
    <div
      v-if="addStatus"
      class="fixed inset-0 bg-slate-500 bg-opacity-35 flex items-center justify-center z-50"
    >
      <div class="relative z-60">
        <Addform :postEdit="edittingPost" :isEdit="isEdit" @cancel="cancel" />
      </div>
    </div>
    <div class="flex justify-between mb-4">
      <div class="flex space-x-2">
        <input
          type="text"
          v-model="search"
          @input="searching"
          placeholder="Nhập từ khóa tìm kiếm"
          class="border rounded-md w-[200px] h-[36px] px-3 border-input bg-background"
        />
        <select v-model="selectedFilter" @change="onFilterChange">
          <option value="" disabled>Lọc bài viết</option>
          <option value="published">Đã xuất bản</option>
          <option value="unpublished">Ngừng xuất bản</option>
        </select>
      </div>
      <div>
        <Button
          @click="addOpen"
          class="px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          Thêm mới bài viết
        </Button>
      </div>
    </div>

    <!-- Posts Table -->
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">STT</TableHead>
          <TableHead>Tiêu đề</TableHead>
          <TableHead>Hình ảnh</TableHead>
          <TableHead>Ngày viết</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Chức năng</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(post, index) in posts" :key="post.id">
          <TableCell class="font-medium">{{ index + 1 }}</TableCell>
          <TableCell>{{ post.title }}</TableCell>
          <TableCell>
            <img
              :src="post.image"
              alt="Post Image"
              class="w-16 h-16 object-cover rounded-full"
            />
          </TableCell>
          <TableCell>{{ post.date }}</TableCell>
          <TableCell v-if="post.status">
            <p class="bg-green-200 rounded-md w-1/2">Đã xuất bản</p>
          </TableCell>
          <TableCell v-else>
            <p class="bg-red-200 rounded-md w-1/2">Chưa xuất bản</p>
          </TableCell>
          <TableCell>
            <div class="space-x-2">
              <button
                v-if="!post.block"
                @click="block(post)"
                class="px-2 py-1 text-white bg-red-500 rounded"
              >
                Chặn
              </button>
              <button
                v-if="post.block"
                @click="block(post)"
                class="px-2 py-1 text-white bg-orange-300 rounded"
              >
                Bỏ chặn
              </button>
              <button
                @click="edit(post)"
                class="px-2 py-1 text-white bg-green-500 rounded"
              >
                Sửa
              </button>
              <button
                @click="del(post.id)"
                class="px-2 py-1 text-white bg-gray-500 rounded"
              >
                Xóa
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Button from "./components/ui/button/Button.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Addform from "./components/Addform.vue";

const selectedFilter = ref("");
const posts = ref([]);
const addStatus = ref(false);
const isEdit = ref(false);
const edittingPost = ref({});
const search = ref("");

const getData = async () => {
  const res = await axios.get("http://localhost:8080/posts");
  posts.value = res.data;
};

const searching = async () => {
  const res = await axios.get(
    `http://localhost:8080/posts?title_like=${search.value}`
  );
  posts.value = res.data;
};

const onFilterChange = async () => {
  const status = selectedFilter.value === "published";
  const res = await axios.get(`http://localhost:8080/posts?status=${status}`);
  posts.value = res.data;
};

const edit = (post) => {
  addStatus.value = true;
  isEdit.value = true;
  edittingPost.value = post; // Lưu bài viết đang chỉnh sửa
};

const addOpen = () => {
  addStatus.value = true;
  isEdit.value = false; // Đặt chế độ thêm mới
  edittingPost.value = {}; // Xóa dữ liệu cũ
};

const cancel = () => {
  addStatus.value = false;
  getData();
};

const block = async (post) => {
  const newPost = { ...post, block: !post.block };
  await axios.put(`http://localhost:8080/posts/${post.id}`, newPost);
  getData();
};

const del = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this post?");
  if (!confirm) {
    return;
  }
  await axios.delete(`http://localhost:8080/posts/${id}`);
  getData();
};

onMounted(() => {
  getData();
});
</script>

<style scoped>
thead {
  background-color: rgb(208, 229, 250);
}
img {
  border: 1px solid #ddd;
}
button {
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  opacity: 0.8;
}
</style>
