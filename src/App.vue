<template>
  <div id="app">
    <button @click="getTasks">get tasks</button>
    <button
      @click="postTask({title:'new task', description:'description.........'})"
    >
      post task</button>
    <button
      @click="putTask({
        id: tasks[0].id,
        title:'task updated',
        description:'description.........',
        done: true
    })" >
      put task
    </button>
    <button @click="deleteTask(tasks[0].id)">先頭のtaskを削除</button>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-for="task of tasks" :key="task.id">
      id: {{task.id}}, title: {{task.title}}, description: {{task.description}}, done: {{task.done}}
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import store from './store/index';

export default {
  name: 'App',
  store,
  components: {
    HelloWorld,
  },
  methods: {
    getTasks() {
      this.$store.dispatch('getTasksAction');
    },
    postTask({ title, description, done = false }) {
      this.$store.dispatch('postTaskAction', { title, description, done });
    },
    putTask({
      id, title, description, done,
    }) {
      this.$store.dispatch('putTaskAction', {
        id, title, description, done,
      });
    },
    deleteTask(id) {
      this.$store.dispatch('deleteTaskAction', id);
    },
  },
  mounted() {
    this.$store.dispatch('getTasksAction');
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasks();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
