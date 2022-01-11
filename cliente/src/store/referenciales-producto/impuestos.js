import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Impuestos: [],
};

export const mutations = {
    SET_IMPUESTO(state, Impuestos){
        console.log(Impuestos);
        state.Impuestos = Impuestos;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getImpuestos({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('impuesto/listar', configuracion)
            .then(impuesto => impuesto.data)
            .then(impuesto => {
            //   console.log(ciudad)
               commit("SET_IMPUESTO", impuesto);
            });
    }
};

export const getters = {
};