import { createStore } from "vuex";

const store = createStore({
  state: {
    count: 0,
    todos: [
      {
        id: 1,
        name: "Task 1",
        status: false,
      },
      {
        id: 2,
        name: "Task 2",
        status: true,
      },
      {
        id: 3,
        name: "Task 3",
        status: false,
      },
    ],
  },
  getters: {
    getCount(state) {
      return state.count;
    },
    getCompletedTodo(state) {
      return state.todos.filter((todo) => todo.status);
    },
  },
  mutations: {
    increment(state, payload) {
      setTimeout(() => {
        state.count += payload.amount;
      }, 1000);
    },
  },
  actions: {
    inc({ commit }) {
      setTimeout(() => {
        commit("increment", { amount: 1 });
      }, 1000);
    },
  },
});

export default store;
