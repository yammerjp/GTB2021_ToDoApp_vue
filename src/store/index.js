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
      const tasks = res.data.map(taskValidator).filter(({ id }) => id !== undefined);
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
      const task = taskValidator(res.data);
      if (task.id === undefined) {
        console.error(`task validation (id:${id}) is failed`);
        return;
      }
      context.commit('updateTask', task);
    },
    async postTaskAction(context, postingTaskParams) {
      const res = await axios.post(`${apiHost}/tasks`, postingTaskParams);
      if (res.status !== 200) {
        console.error('post task is failed');
        console.error(res);
        return;
      }
      const task = taskValidator(res.data);
      if (task.id === undefined) {
        console.error('task validation is failed');
        return;
      }
      context.commit('updateTask', task);
    },
    async putTaskAction(context, taskParams) {
      const res = await axios.put(`${apiHost}/tasks`, taskParams);
      if (res.status !== 200) {
        console.error('put task is failed');
        console.error(res);
        return;
      }
      const task = taskValidator(res.data);
      if (task.id === undefined) {
        console.error('task validation is failed');
        return;
      }
      context.commit('updateTask', task);
    },
    async deleteTaskAction(context, id) {
      const res = await axios.delete(`${apiHost}/tasks/${id}`);
      if (res.status !== 201) {
        console.error('delete task is failed');
        console.error(res);
        return;
      }
      context.commit('deleteTask', id);
    },
  },
  modules: {
  },
});
