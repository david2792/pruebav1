import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    marcas: [],
};

export const mutations = {
    SET_MARCA_VEHICULO(state, marca){
        console.log(marca);
        state.marcas = marca;
    },
    SET_AUX(state, Aux){
        console.log(Aux);
        state.Aux = Aux;
    }
};

export const actions = {
    getMarcas({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('marcavehiculos', configuracion)
            .then(marca => marca.data)
            .then(marca => {
              console.log(" "+marca)
               commit("SET_MARCA_VEHICULO", marca);
                // let auxiliar=[ciudad]
                // console.log(auxiliar)
                // commit("SET_AUX", auxiliar);
            });
    }
};

export const getters = {
};