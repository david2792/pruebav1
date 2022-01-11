import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Ciudades: [],
};

export const mutations = {
    SET_CIUDAD(state, Ciudades){
        console.log(Ciudades);
        state.Ciudades = Ciudades;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getCiudades({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('ciudades', configuracion)
            .then(ciudad => ciudad.data)
            .then(ciudad => {
              console.log(ciudad)
               commit("SET_CIUDAD", ciudad);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};