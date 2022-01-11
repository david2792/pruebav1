import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    modelos: [],
};

export const mutations = {
    SET_MODELO(state, modelo){
        console.log(modelo);
        state.modelos = modelo;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getModelos({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('modelovechiculos', configuracion)
            .then(modelo => modelo.data)
            .then(modelo => {
              console.log(" "+modelo)
               commit("SET_MODELO", modelo);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};