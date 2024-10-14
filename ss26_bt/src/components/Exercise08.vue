<template>
  <div>
    <h1>B8</h1>
    <h2>{{ languageText }}</h2>
    <button @click="changeLanguage">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

// Lấy store
const store = useStore();

// Tạo một thuộc tính reactive để theo dõi ngôn ngữ hiện tại
const language = computed(() => store.state.language);

// Thay đổi ngôn ngữ thông qua mutation
const changeLanguage = () => {
  store.commit("toggleLanguage");
};

// Nội dung văn bản dựa trên ngôn ngữ
const languageText = computed(() =>
  language.value === "vi" ? "Xin chào!" : "Hello!"
);
const buttonText = computed(() =>
  language.value === "vi" ? "Chuyển sang Tiếng Anh" : "Switch to Vietnamese"
);
</script>

<style scoped></style>
