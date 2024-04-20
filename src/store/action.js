import axios from 'axios';
const apiUrl = 'http://3.232.244.22/api';
export default {
  // Login Api calling function
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

  async fetchTodoItems({ commit, state }) {
    try {
      const response = await axios.get(`${apiUrl}/items`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('SET_TODO_ITEMS', response.data);
    } catch (error) {
      console.error('Failed to fetch Todo items', error);
    }
  },

  async logout({commit, state}) {
    try{
      const response = await axios.post(`${apiUrl}/logout`, null, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('CLEAR_USER_DATA');
      return { success: true };
    }catch(error){
      return { success: false, error };
    }
  },

  async createItem({ commit, state }, { title, description }) {
    try {
      const response = await axios.post(`${apiUrl}/item`, { title, description }, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
  
      const itemId = response.data.id;
      commit('ADD_TODO_ITEM', response.data);
  
      return { success: true, item: response.data };
    } catch (error) {
      console.error('Failed to create Task:', error);
      return { success: false, error };
    }
  },
  

  async viewItem({commit, state}, itemId){
    try{
      const response = await axios.get(`${apiUrl}/item/${itemId}`,{
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('SET_ITEM_DETAILS', response.data);
        return { success: true, item: response.data };
    }catch(error){
      console.error('Failed to fetch item details:', error);
      return { success: false, error };
    }
  },

  async updateItem({ commit, state }, { itemId, id, title, description }) {
    try {
      const response = await axios.put(`${apiUrl}/item/${itemId}`, {id, title, description }, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('SET_ITEM_DETAILS', response.data);
      return { success: true, item: response.data.item };
    } catch (error) {
      console.error('Failed to update item:', error);
      return { success: false, error: error }; 
    }
  },

  async deleteItem({ commit, state }, itemId) {
    try {
      const response = await axios.delete(`${apiUrl}/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('DELETE_TODO_ITEM', itemId);
      return { success: true };
    } catch (error) {
      console.error('Failed to delete item:', error);
      return { success: false, error };
    }
  }
};

