import state from './state.js';
import mutations from './mutation.js';
import actions from './action.js';
import { createStore } from 'vuex';
export default createStore({
  state,
  mutations,
  actions
});