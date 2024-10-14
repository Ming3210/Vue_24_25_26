<!-- src/components/DarkMode.vue -->

<template>
  <div :class="['dark-mode-container', { dark: isDarkMode }]">
    <h1>B7</h1>
    <label class="toggle-label">
      <input type="checkbox" :checked="isDarkMode" @change="toggleTheme" />
      Chế độ Tối
    </label>
    <p>Đây là nội dung trong chế độ {{ isDarkMode ? "Tối" : "Sáng" }}.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isDarkMode = computed(() => store.state.isDarkMode);

const toggleTheme = () => {
  store.commit("toggleDarkMode");
};
</script>

<style scoped>
.dark-mode-container {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark-mode-container.dark {
  background-color: #2c3e50;
  color: #ecf0f1;
}

.toggle-label {
  cursor: pointer;
}

.toggle-label input {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
