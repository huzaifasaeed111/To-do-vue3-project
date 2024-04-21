import axios from 'axios';
import { apiUrl, headersConfig } from './ApiConfig';
export default {
  // Login endpoint 
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      const user = response.data.user;
      commit('SET_TOKEN', user.token);
      commit('SET_USER', user);
      commit('SET_LOGIN_STATUS', true);
      return { success: true, user };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error };
    }
  },
  // signup Endpoint
  async signup({ commit }, { email, password, password_confirmation }) {
    try {
      const response = await axios.post(`${apiUrl}/register`, { email, password, password_confirmation });
      commit('SET_REGISTER_STATUS', true);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Signup failed:', error);
      return { success: false, error };
    }
  },
  // Fetch data Through API 
  async fetchTodoItems({ commit, state }) {
    try {
      const response = await axios.get(`${apiUrl}/items`, headersConfig(state.token));
      commit('SET_TODO_ITEMS', response.data);
    } catch (error) {
      console.error('Failed to fetch Todo items', error);
    }
  },
// Logout Endpoint
  async logout({commit, state}) {
    try{
      await axios.post(`${apiUrl}/logout`, null, headersConfig(state.token));
      commit('CLEAR_USER_DATA');
      return { success: true };
    }catch(error){
      return { success: false, error };
    }
  },
// Create Item Endpoint
  async createItem({ commit, state }, { title, description }) {
    try {
      const response = await axios.post(`${apiUrl}/item`, { title, description }, headersConfig(state.token));
      const itemId = response.data.id;
      commit('ADD_TODO_ITEM', response.data);
      return { success: true, item: response.data };
    } catch (error) {
      console.error('Failed to create Task:', error);
      return { success: false, error };
    }
  },
  // View List Endpoint
  async viewItem({commit, state}, itemId){
    try{
      const response = await axios.get(`${apiUrl}/item/${itemId}`, headersConfig(state.token));
      commit('SET_ITEM_DETAILS', response.data);
      return { success: true, item: response.data };
    }catch(error){
      console.error('Failed to fetch item details:', error);
      return { success: false, error };
    }
  },
// Update the Single Item Endpoint
  async updateItem({ commit, state }, { itemId, id, title, description }) {
    try {
      const response = await axios.put(`${apiUrl}/item/${itemId}`, {id, title, description }, headersConfig(state.token));
      commit('SET_ITEM_DETAILS', response.data);
      return { success: true, item: response.data.item };
    } catch (error) {
      console.error('Failed to update item:', error);
      return { success: false, error: error }; 
    }
  },
// Delete Item from List Endpoint
  async deleteItem({ commit, state }, itemId) {
    try {
      await axios.delete(`${apiUrl}/item/${itemId}`, headersConfig(state.token));
      commit('DELETE_TODO_ITEM', itemId);
      return { success: true };
    } catch (error) {
      console.error('Failed to delete item:', error);
      return { success: false, error };
    }
  }
};
