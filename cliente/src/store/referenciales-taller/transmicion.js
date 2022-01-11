import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    transmiciones: [],
};

export const mutations = {
    SET_TRANSMICION(state, transmicion){
        console.log(transmicion);
        state.transmiciones = transmicion;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getTransmiciones({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('estadotransmiciones', configuracion)
            .then(transmicion => transmicion.data)
            .then(transmicion => {
              console.log("asdcsa "+transmicion)
               commit("SET_TRANSMICION", transmicion);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};