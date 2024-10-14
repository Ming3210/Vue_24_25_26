// src/store/index.js

import { createStore } from "vuex";

const store = createStore({
  state: {
    user: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        gender: "Nam",
        date: "20/12/2024",
        address: "123 Thành Công",
      },
      {
        id: 2,
        name: "Nguyễn Văn B",
        gender: "Nam",
        date: "20/12/2024",
        address: "123 Thành Công",
      },
    ],
    product: [
      {
        id: 1,
        name: "Sản phẩm 1",
        price: 100000,
        quantity: 10,
      },
    ],
    count: 0,
    randomNumber: [],
    company: "Rikkei Academy",
    isDarkMode: false,
    language: "vi",
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      if (state.count > 0) {
        state.count--;
      }
    },
    addNumber(state) {
      state.randomNumber.push(Math.floor(Math.random() * 100) + 1);
    },
    changeString(state) {
      state.company = "Rikkei Soft";
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", state.isDarkMode);
    },
    initializeDarkMode(state) {
      const savedMode = localStorage.getItem("isDarkMode");
      state.isDarkMode = savedMode === "true" ? true : false;
    },
    toggleLanguage(state) {
      state.language = state.language === "vi" ? "en" : "vi";
    },
  },
});

export default store;
