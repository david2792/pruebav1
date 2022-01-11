import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    clientes: [],
    Cliente:{
        RazonSocial: "",
        CodigoCliente: "",
        Cedula: "",
        Ruc: "",
        Direccion: "",
        Telefono: "",
        CodigoCiudad:"",
        Email: "",
        
    },
    configuracion: [],
    editar_item:false,
    
};

export const mutations = {
    SET_CLIENTE(state, cliente){
        console.log(cliente);
        state.clientes = cliente;
    },
    GET_CLIENTE(state, value){
        console.log("Muttations: ", value)
        state.Cliente = value;
    }
};

export const actions = {
    getClientes({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('clientes', configuracion)
            .then(cliente => cliente.data)
            .then(cliente => {
                commit("SET_CLIENTE", cliente);
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
    setCliente: (state) => {
        console.log(state.Cliente.CodigoCliente)
        return state.cliente;
    }
};