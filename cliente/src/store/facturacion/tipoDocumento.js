import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Documentos: [],
};

export const mutations = {
    SET_DOCUMENTO(state, documento){
        console.log(documento);
        state.Documentos = documento;
    },

};

export const actions = {
    getDocumento({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('tipodocumento', configuracion)
            .then(documento => documento.data)
            .then(documento => {
              console.log(documento)
               commit("SET_DOCUMENTO", documento);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};