<template>
  <!-- Create a table to display a Todo list with actions. -->
  <v-table class="w-100">
    <thead>
      <tr class="bg-teal">
        <th class="text-left">Task #</th>
        <th class="text-left">Task Name</th>
        <th class="text-left">Description</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <!-- list show data dynamically -->
    <tbody v-for="(item, index) in todoData" :key="'item_' + index">
      <tr v-for="list in item.data" :key="'list_' + list.id">
        <td>{{ list.id }}</td>
        <td>{{ list.title }}</td>
        <td>{{ list.description }}</td>
        <!-- List action button against each list -->
        <td>
          <v-icon class="mx-1" color="teal" @click="viewItemDetails(list)">mdi-eye</v-icon>
          <v-icon class="mx-1" color="teal" @click="editItem(list)">mdi-pencil</v-icon>
          <v-icon class="mx-1" color="teal" @click="deleteListItem(list)">mdi-delete</v-icon>
        </td>
      </tr>
    </tbody>
  </v-table>
  <!-- Dialog box for viewing a specific Todo List. -->
  <v-dialog v-model="viewItemDialog" width="75%">
    <v-card>
      <v-card-title>Item Details</v-card-title>
      <v-card-text v-if="selectedItem">
        <div>ID: {{ selectedItem.id }}</div>
        <div>Title: {{ selectedItem.title }}</div>
        <div>Description: {{ selectedItem.description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="tonal" elevation="2" class="w-100 bg-teal mt-4" @click="closeDialogs">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!-- Dialog box for Updating a specific Todo List. -->
  <v-dialog v-model="editItemDialog" width="75%">
    <v-card>
      <v-card-title>Edit Item</v-card-title>
      <v-card-text>
        <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
        <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
      </v-card-text>
      <v-card-actions >
        <v-btn variant="tonal" elevation="2" class="w-25 mx-4 bg-teal mt-4" @click="updateSelectedItem">Update</v-btn>
        <v-btn variant="tonal" elevation="2" class="w-25 bg-teal mt-4" @click="cancelEdit">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalPages"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
      @input="changePage"
    ></v-pagination>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, computed, ref } from 'vue';

const selectedItem = ref(null);
const viewItemDialog = ref(false);
const editItemDialog = ref(false);
const editedItem = ref(null);
const page = ref(1); 

const store = useStore();
const todoData = computed(() => store.state.todo_data);
// This function utilizes the viewItem Endpoint, which is used to display a specific Todo List by using the list ID.
const viewItemDetails = async (list) => {
  try {
    const response = await store.dispatch('viewItem', list.id);
    if (response.success) {
      selectedItem.value = response.item.item;
      viewItemDialog.value = true;
    } else {
      console.error('Failed to fetch item details:', response.error);
    }
  } catch(error) {
    console.error('Error fetching item details:', error);
  }
}

const editItem = (list) => {
  editedItem.value = { ...list };
  editItemDialog.value = true;
}
// This function utilizes the updateItem Endpoint, which is used to update the list against a specific ID.
const updateSelectedItem = async () => {
  try {
    const response = await store.dispatch('updateItem', {
      itemId: editedItem.value.id,
      title: editedItem.value.title,
      description: editedItem.value.description
    });
    
    if (response.success) {
      // Trigger reactivity manually by updating the state
      const index = todoData.value.items.data.findIndex(item => item.id === editedItem.value.id);
      if (index !== -1) {
        // Update the item in todoData
        todoData.value.items.data[index] = { ...todoData.value.items.data[index], ...editedItem.value };
      }

      editItemDialog.value = false; // Close the edit dialog
    } else {
      console.error('Failed to update item:', response.error);
    }
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

const cancelEdit = () => {
  editItemDialog.value = false;
}

const deleteListItem = async (list) => {
  try {
    const response = await store.dispatch('deleteItem', list.id);
    if (response.success) {
      store.commit('DELETE_TODO_ITEM', list.id);
    } else {
      console.error('Failed to delete item:', response.error);
    }
  } catch(error) {
    console.error('Error deleting item:', error);
  }
}
// this function is used for closing the Dialog box
const closeDialogs = () => {
  viewItemDialog.value = false;
  editItemDialog.value = false;
}

onMounted(() => {
  store.dispatch('fetchTodoItems');
});
</script>
