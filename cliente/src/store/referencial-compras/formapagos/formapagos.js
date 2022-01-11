import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    fpagos: [],
    fpago:{
        CodigoFormasPago: "",
        Descripcion:"",
        Plazo: "",
        Dias: "",
        Estado: false,
    },
    editar_item: false,
};
export const mutations = {
    SET_FORMAPAGOS(state, fpagos){
        state.fpagos = fpagos;
    },
    GET_FORMAPAGO(state, formapago){
        state.fpago = formapago;
    },
};
export const actions = {
    setFormaPagos({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('fpagos/formapagos', configuracion)
            .then((result) => {
                commit('SET_FORMAPAGOS', result.data);
            }).catch((err) => {
                console.log(err)
            });
    },

    getFormaPago({commit}, item){
        console.log("Item recibido", item);
        commit("GET_FORMAPAGO", item);
    },
    
    guardarFormaPago({commit}, configuracion){
        console.log(configuracion, state.fpago)
        if (!state.editar_item) {
            axios
                .post('fpagos/insertarformapagos', {fpago: state.fpago}, configuracion)
                .then((result) => {
                    commit('SET_FORMAPAGOS', result.data);
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("Oooh boy, yes today!")
        }
    }
};
export const getters = {};