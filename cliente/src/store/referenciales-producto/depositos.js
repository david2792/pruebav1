import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    Depositos: [],
};

export const mutations = {
    SET_DEPOSITO(state, Depositos){
        console.log(Depositos);
        state.Depositos = Depositos;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getDepositos({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('deposito/listar', configuracion)
            .then(deposito => deposito.data)
            .then(deposito => {
            //   console.log(ciudad)
               commit("SET_DEPOSITO", deposito);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};