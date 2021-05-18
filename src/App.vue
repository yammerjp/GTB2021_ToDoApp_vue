<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{
      tasksComputed
    }}
  </div>
</template>

<script>
/* import axios from 'axios'; */
import HelloWorld from './components/HelloWorld.vue';
import store from './store/index';

export default {
  name: 'App',
  store,
  data: () => ({
    tasks: [],
  }),
  components: {
    HelloWorld,
  },
  mounted() {
    this.$store.dispatch('getTasksAction');
    /*
    axios.get('http://localhost:3001/tasks').then(({ data }) => {
      console.log(data);
    });
    console.log('hel');
    console.log(this.$store.state.tasks);
    */
  },
  computed: {
    tasksComputed() {
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
