import { createStore } from "vuex";
import Storage from "../utils/Storage";
import { STORAGE_NAME } from "../constants";

export const ACTIONS = {
  ADD_TASK: "addTask",
  EDIT_TASK: "editTask",
  GET_TASKS: "getTasks",
  REMOVE_TASK: "removeTask",
  TOGGLE_CLOSED: "toggleClosed",
};

const MUTATIONS = {
  SET_TASKS: "setTasks",
  REMOVE_TASK: "removeTask",
  TOGGLE_CLOSED: "toggleClosed",
};

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    [MUTATIONS.SET_TASKS](state, payload) {
      state.tasks = payload;
    },

    [MUTATIONS.REMOVE_TASK](state, payload) {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },

    [MUTATIONS.TOGGLE_CLOSED](state, payload) {
      state.tasks.find((task) => task.id === payload.id).closed =
        payload.closed;
    },
  },
  actions: {
    [ACTIONS.ADD_TASK]({ commit }, payload) {
      Storage.add(STORAGE_NAME, payload);
    },

    [ACTIONS.EDIT_TASK]({ commit }, payload) {
      Storage.edit(STORAGE_NAME, payload);
    },

    [ACTIONS.GET_TASKS]({ commit }) {
      commit(MUTATIONS.SET_TASKS, Storage.get(STORAGE_NAME));
    },

    [ACTIONS.REMOVE_TASK]({ commit }, payload) {
      Storage.delete(STORAGE_NAME, payload);
      commit(MUTATIONS.REMOVE_TASK, payload);
    },

    [ACTIONS.TOGGLE_CLOSED]({ commit }, payload) {
      const closed = Storage.toggleClosed(STORAGE_NAME, payload);
      commit(MUTATIONS.TOGGLE_CLOSED, { id: payload, closed });
    },
  },
});
