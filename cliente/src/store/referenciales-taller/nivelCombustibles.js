import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    niveles: [],
};

export const mutations = {
    SET_NIVEL(state, nivel){
        console.log(nivel);
        state.niveles = nivel;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getNiveles({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('nivelcombustibles', configuracion)
            .then(nivel => nivel.data)
            .then(nivel => {
              console.log(" "+nivel)
               commit("SET_NIVEL", nivel);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};