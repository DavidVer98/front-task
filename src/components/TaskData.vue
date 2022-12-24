<template>
 
        <div   id="tasks" class="" style="overflow-y: auto; max-height: 500px; overflow-x: hidden;">
          <div  class="grid grid-cols-1  grid-flow-row ">

              <div  @click="accordion(task._id)" class="inline-flex items-center space-x-2 cursor-pointer p-5 text-center bg-white row-start-1 row-end-1  border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> 
              <div class="text-gray-800 truncate" style="text-align: start;    width:40ch;">{{task.title}}</div>
             
          </div> 
          <div class=" p-5 text-center bg-white col-start-2 col-end-4 border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent">
              <div class="inline-flex"> 
                <router-link :to="{path:`/task/${task._id}`, params:{} } " >
                    <svg  class="w-4 h-4 mx-2 text-slate-500 hover:text-purple-800 hover:cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </router-link>

                  <svg  @click="deleteTask(task._id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>                       
                </div>
          </div>
          <Transition  name="slide-fade">
          <div v-if="(!isOpen)"    class="p-5 bg-white col-start-1 col-end-4 " style="overflow: hidden !important">
              <div class="grid grid-cols-2 gap-1">
                <div class="col-span-1">
                  <span class="text-slate-800 ">Fecha: </span> 
                  <span class="text-slate-400 text-base font-light leading-relaxed mt-0 mb-4 ">{{filterformatDate(new Date (task.date))}}</span>
                </div>
         
                <div class="text-end ml-5">
                  <label class="inline-flex relative items-center  cursor-pointer">
                  <input type="checkbox" value="false" class="sr-only peer" v-model="checked" @click="doneTask()">
                  <div class="w-7 h-4 bg-gray-200 rounded-full peer dark:bg-red-400 peer-focus:ring-4 peer-focus:bg-indigo-600 dark:peer-focus:ring-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                
                </label>
                </div>

                <div class="col-span-2">
                  <span class="text-slate-800">Descripción: </span> 
                <span class="text-slate-400 text-base font-light leading-relaxed mt-0 mb-4 ">{{task.description}}</span>
                </div>
              </div>
            </div>
            </Transition>
          </div>

  

    </div>
    
</template>

<script lang="ts">

import { defineComponent } from "vue";
import TaskService from '../../services/TaskService';
import {Task} from 'src/interfaces/Task';
import moment from 'moment';

export default defineComponent({
  name: "TaskData",
  props: {
    // object task:
    task: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      dateUpdate: new Date(),
      error: false,
      idAccordion : '',
      isOpen: true,
      checked: this.task.done,
    };
  },
  methods: {
    deleteTask(id: any) {
      console.log(id);
      TaskService.deleteTask(id).then((response) => {
        this.$emit("onDeleteTask", id);
      }).catch((error) => {
        console.log(error);
      });
    },
    accordion(_id: any) {
            this.isOpen = !this.isOpen
           this.idAccordion = _id
        },
        filterformatDate(date: any) {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },
  doneTask(){
    // eslint-disable-next-line vue/no-mutating-props
    this.task.done = !this.task.done
    TaskService.updateTask(this.task._id, this.task).then((response) => {
      this.$emit("onUpdateTask", this.task);
    }).catch((error) => {
      console.log(error);
    });
  }
  },
  },
);
</script>

<style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}


</style>
