export default {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_LOGIN_STATUS(state, status) {
    state.isLoggedIn = status;
  },
  SET_TOKEN(state, token){
    state.token = token;
    state.isLoggedIn = !!token;
  },
  SET_REGISTER_STATUS(state, status) {
    state.isRegistered = status;
  },
  SET_TODO_ITEMS(state, todo_data){
    state.todo_data = todo_data;
  },
  CLEAR_USER_DATA(state){
    state.token = null;
    state.user=null;
    state.isLoggedIn = false;
    state.todo_data = []
  },
  ADD_TODO_ITEM(state, newItem) {
    state.todoItems[newItem.id] = newItem;
  state.todoItems = { ...state.todoItems };
  },
  SET_ITEM_DETAILS(state, itemDetails) {
    state.itemDetails = itemDetails;
  },
  
  DELETE_TODO_ITEM(state, itemId) {
    state.todo_data.items.data = state.todo_data.items.data.filter(item => item.id !== itemId);
    state.todo_data = { ...state.todo_data }; // Trigger reactivity
  }
};
