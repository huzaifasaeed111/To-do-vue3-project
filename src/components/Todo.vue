<template>
  <v-container>
    <!-- Header section -->
    <v-row class="bg-teal">
      <!-- Title -->
      <v-col cols="8" xs="12" sm="6" md="6" lg="8" xlg="8">
        <h2>My Todo's App</h2>
      </v-col>
      <!-- Create Todo button -->
      <v-col cols="3" xs="6" sm="3" md="3" lg="3" xlg="3">
        <v-btn class="w-100" @click="dialog = true">+ Create Todo</v-btn>
      </v-col>
      <!-- Logout button -->
      <v-col cols="1" xs="6" sm="3" md="3" lg="1" xlg="1">
        <v-btn class="w-100" @click="handleLogout">Logout</v-btn>
      </v-col>
    </v-row>

    <!-- Todo List section -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-teal">All Task</h1>
      </v-col>
      <v-col cols="12">
        <TodoList></TodoList>
      </v-col>
    </v-row>

    <!-- Create Todo dialog -->
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" width="50%">
          <v-card>
            <v-card-title>
              Create New Task
              <v-spacer></v-spacer>
            </v-card-title>
            <v-form @submit.prevent="handleCreate">
              <v-card-text>
                <v-text-field 
                  v-model="title" 
                  label="Task Title"
                  variant="underlined"
                ></v-text-field>
                <v-textarea 
                  v-model="description" 
                  label="Description"
                  variant="underlined"
                ></v-textarea>
                <v-btn
                  variant="tonal"
                  elevation="2"
                  class="w-100 bg-teal mt-4"
                  type="submit"
                >ADD</v-btn>
                <v-btn
                  variant="tonal"
                  elevation="2"
                  class="w-100 bg-white mt-4"
                  @click="dialog = false"
                >cancel</v-btn>
              </v-card-text>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import router from '../router/index';
import TodoList from './TodoList.vue';

const dialog = ref(false);
const title = ref('');
const description = ref('');
const store = useStore();

const handleLogout = async () => {
  await store.dispatch('logout');
  router.push('/');
};

const handleCreate = async () => {
  try {
    const { success, item, error } = await store.dispatch('createItem', {
      title: title.value,
      description: description.value
    });

    if (success) {
      dialog.value = false;
      const itemId = item.item.id;
      const obj = {
        id: itemId,
        title: title.value,
        description: description.value
      };

      store.state.todo_data.items.data.unshift(obj);
    } else {
      console.error('Error occurred while creating item:', error);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};


onMounted(() => {
  store.dispatch('fetchTodoItems');
});
</script>
