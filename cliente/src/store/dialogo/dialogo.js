import Vue from 'vue';
import Vuex from 'vuex';

export const state= {
    dialog: false,
    dialog_01: false,
};
export const mutations= {
    UPDATE_MODAL(state, value){
        state.dialog = value;
    },

    UPDATE_MODAL01(state, value){
        state.dialog_01 = value;
    }
};
export const actions= {
    switchDialog({commit}, value){
        commit("UPDATE_MODAL", value);
    },

    switchDialog01({commit}, value){
        commit("UPDATE_MODAL01", value);
    }
};
export const getters= {
    getModal: state => {
        return state.dialog;
      },

      getModal01: state => {
        return state.dialog_01;
      }
};
