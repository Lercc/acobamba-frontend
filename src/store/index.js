/**
 *  VUEX
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// IMPORTAR MODULOS:
import api from './modules/api';
import token from './modules/token';
import client from './modules/client';
import user from './modules/user';

// REGISTRAR MODULOS:
export default new Vuex.Store({
  
  modules: {
    api,
    token,
    client,
    user,
  }
});