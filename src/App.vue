<template>
  <NavBar />
  <main class="py-20">
    <router-view />
  </main>
  <div class="text-end tag">
    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Version 1.0 - Beta </span>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue"
import '../styles/app.css'; // Here we import the CSS file tailwindcss is using
// import TaskFormCompoment from "./components/TaskForm.vue";

export default defineComponent({
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: {NavBar},
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.tag{
  position:absolute;
    top: 95%;
    right: 0%;
}
</style>
