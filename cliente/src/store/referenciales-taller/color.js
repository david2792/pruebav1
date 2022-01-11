import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    colores: [],
};

export const mutations = {
    SET_COLOR(state, color){
        console.log(color);
        state.colores = color;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getColores({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('colores', configuracion)
            .then(color => color.data)
            .then(color => {
              console.log(" "+color)
               commit("SET_COLOR", color);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};