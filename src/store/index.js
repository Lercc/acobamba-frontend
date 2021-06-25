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
import errors from './modules/errors';

// REGISTRAR MODULOS:
export default new Vuex.Store({
  
  modules: {
    token,
    client,
    api,
    user,
    errors,
  }
});