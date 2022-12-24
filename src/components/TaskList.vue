<template>
 
  <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300" >

    <div v-if="error" class="flex p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mb-5" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Danger alert!</span> Opps.. problem get the list of the taks 😢
        </div>
    </div>

        <div class="flex flex-row justify-between items-center">
            <div>
                <h1 class="text-3xl font-medium">Tasks list</h1>
            </div>
            <div class="inline-flex space-x-2 items-center">
                <router-link to="/task/new" class="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4">
                      </path></svg>
                      <span class="text-sm font-medium hidden md:block">Add</span>                     
                </router-link>
            </div>
        </div>
        <p class="text-slate-500">Hello, here are your latest tasks</p>


        <div id="tasks" class="my-5" style="overflow-y: auto; max-height: 500px; ">
          <div v-for="item in tasks" :key="item._id"  class="grid grid-cols-1  grid-flow-row ">
            <TaskData :task="item" @onDeleteTask="deleteTask" @onUpdateTask="updateTask" />
          </div>
      </div>     
        <p class="text-xs text-slate-500 text-center">Last updated {{minutos}}</p>
    </div>
    
</template>

<script lang="ts">

import { defineComponent } from "vue";
import TaskService from '../../services/TaskService';
import {Task} from 'src/interfaces/Task';
import TaskData from './TaskData.vue';
import moment from 'moment';
export default defineComponent({
  name: "TasksList",
  setup() {
    return {};
  },
  components: {TaskData},
  data() {
    return {
      tasks: [] as Task[],
      dateUpdate: new Date(),
      minutos: '',
      error: false,
    };
  },


  mounted() {
    TaskService.getTasks().then((response) => {
      this.tasks = response;
      console.log(response);
      var utc_a = new Date(this.tasks[this.tasks.length-1].date);
      var utc_b = new Date(this.dateUpdate.toUTCString());
      let diff = Math.abs(utc_b.getMinutes()  - utc_a.getMinutes() );
      console.log(utc_a.getMinutes() , utc_b.getMinutes());
      console.log(diff)
      // this.minutos = diff;
      this.minutos = moment(utc_a, "YYYYMMDD").fromNow();
      this.tasks.forEach(task => {
        console.log("--------->",new Date(task.date).getHours(), new Date(task.date).getMinutes(), new Date(task.date).getSeconds())  
      })
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    deleteTask(id: any) {
      console.log("Deleted item" + id);
      this.tasks = this.tasks.filter((task) => task._id !== id);
    },
    updateTask(id: any) {
      console.log("Update status" + id);
      this.tasks = this.tasks.filter((task) => task._id !== id);
    },

  },
  },
);
</script>

<style scoped></style>
