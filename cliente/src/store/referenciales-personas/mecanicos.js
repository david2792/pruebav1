import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    mecanicos: [],
    Mecanico:{
        CodigoUsuario: "",
        Nombre: "",
        Apellido: "",        
    },
    configuracion: [],
    editar_item:false,
    
};

export const mutations = {
    SET_MECANICO(state, mecanico){
        console.log(mecanico);
        state.mecanicos = mecanico;
    },
    GET_MECANICO(state, value){
        console.log("Muttations: ", value)
        state.Mecanico = value;
    }
};

export const actions = {
    getMecanicos({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('clientes/mecanico/', configuracion)
            .then(mecanico => mecanico.data)
            .then(mecanico => {
                commit("SET_MECANICO", mecanico);
            });
    },
    
    guardarCliente({ commit }, configuracion) {
        console.log(configuracion);
        if (state.editar_item==false) {
            console.log("Guardar", state.Cliente)
            let setCliente = state.Cliente;
            axios
                .post('clientes', { clientes: setCliente }, configuracion)
                .then(result =>{
                    commit("SET_CLIENTE", result.data);
                }).catch(error=>{
                    console.log("Error: "+error);
                });
            //state.editar_item = !state.editar_item;
        } else {
            console.log("Editar", state.Cliente);
            let setCliente = state.Cliente;
            axios
                .put('clientes', { clientes: setCliente }, configuracion)
                .then(result =>{
                    commit("SET_CLIENTE", result.data);
                }).catch(error=>{
                    console.log("Error: "+error);
                });
                //console.log("Editar", state.Proveedor);
                state.editar_item = !state.editar_item;
        }
    },

    getCliente({commit}, item){
        console.log("Item recibido", item);
        commit("GET_CLIENTE", item);
    }
};

export const getters = {
    setMecanico: (state) => {
        console.log(state.Mecanico.CodigoUsuario)
        return state.mecanico;
    }
};