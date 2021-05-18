import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const apiHost = 'http://localhost:3002';

const taskValidator = ({
  id, title, description, done,
}) => {
  if (typeof id !== 'number') {
    console.error(`type validation failed. id: ${id} is not number...`);
    return false;
  }
  if (typeof title !== 'string') {
    console.error(`type validation failed. title: ${title} is not string...`);
    return false;
  }
  if (typeof description !== 'string') {
    console.error(`type validation failed. description: ${description} is not string...`);
    return false;
  }
  if (typeof done !== 'boolean') {
    console.error(`type validation failed. done: ${done} is not boolean...`);
    return false;
  }
  return true;
};

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
    updateTask(state, task) {
      state.tasks = [...state.tasks.filter(({ id }) => id !== task.id), task];
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter(({ id }) => id !== taskId);
    },
  },
  actions: {
    async getTasksAction(context) {
      const res = await axios.get(`${apiHost}/tasks`);
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
      const tasks = res.data.filter(taskValidator);
      context.commit('updateTasks', tasks);
    },
    async getTaskAction(context, id) {
      if (typeof id !== 'number') {
        console.error('get task need id (integer)');
        return;
      }
      const res = await axios.get(`${apiHost}/tasks/${id}`);
      if (res.status !== 200) {
        console.error(`get task (id:${id}) is failed`);
        console.error(res);
        return;
      }
      const task = res.data;
      if (!taskValidator(task)) {
        console.error(`task validation (id:${id}) is failed`);
        return;
      }
      context.commit('updateTask', task);
    },
    async postTaskAction(context, postingTaskParams) {
      const res = await axios.post(`${apiHost}/tasks`, postingTaskParams);
      const task = res.data;
      if (!taskValidator(task)) {
        console.error('task validation is failed');
        return;
      }
      context.commit('updateTask', task);
    },
    async putTaskAction(context, taskParams) {
      const res = await axios.put(`${apiHost}/tasks/${taskParams.id}`, taskParams);
      const task = res.data;
      if (!taskValidator(task)) {
        console.error('task validation is failed');
        return;
      }
      context.commit('updateTask', task);
    },
    async deleteTaskAction(context, id) {
      await axios.delete(`${apiHost}/tasks/${id}`);
      context.commit('deleteTask', id);
    },
  },
  modules: {
  },
});
