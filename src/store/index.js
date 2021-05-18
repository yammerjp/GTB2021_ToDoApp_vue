import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  getters: {
    getTasks: (state /* , getters */) => () => state.tasks,
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
    getTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async getTasksAction(context) {
      const res = await axios.get('http://localhost:3002/tasks');
      if (res.status !== 200) {
        console.error('get tasks is failed');
        console.error(res);
        return;
      }
      if (!res.data.length) {
        console.error('get tasks is got, but it is not array');
        console.error(res);
        return;
      }
      const tasks = res.data.map(({
        id, title, description, done,
      }) => {
        if (typeof id !== 'number') {
          console.error(`type validation failed. id: ${id} is not number...`);
          return {};
        }
        if (typeof title !== 'string') {
          console.error(`type validation failed. title: ${title} is not string...`);
          return {};
        }
        if (typeof description !== 'string') {
          console.error(`type validation failed. description: ${description} is not string...`);
          return {};
        }
        if (typeof done !== 'boolean') {
          console.error(`type validation failed. done: ${done} is not boolean...`);
          return {};
        }
        return {
          id, title, description, done,
        };
      }).filter(({ id }) => id !== undefined);
      console.log(tasks);
      // context.commit('getTasks', res.data);
      context.commit('getTasks', tasks);
    },
  },
  modules: {
  },
});
