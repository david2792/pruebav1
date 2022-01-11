import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Condiciones: [],
};

export const mutations = {
    SET_CONDICION(state, condicion){
        console.log(condicion);
        state.Condiciones = condicion;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getCondicion({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('condicion', configuracion)
            .then(condicion => condicion.data)
            .then(condicion => {
              console.log(condicion)
               commit("SET_CONDICION", condicion);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};