import Vue from 'vue';
import Vuex from 'vuex';
import {IUserState} from '@/store/modules/user';

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
}

const store = new Vuex.Store<IRootState>({});

export default store;
