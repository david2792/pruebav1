import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    cierres: [],
    Cierre:{
        NumeroApertura:"" ,
        monto:""       
    },
    
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_APERTURA(state, producto){
        console.log(producto);
        state.productos = producto;
    },
    GET_APERTURA(state, value){
        console.log("Muttations: ", value)
        state.Producto = value;
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {
 
    getApertura({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('abrircaja/abrir', configuracion)
            .then(apertura => apertura.data)
            .then(producto => {
                commit("SET_PRODUCTO", producto);
            });
    },
    
    guardarApertura({ commit }, configuracion) {
        console.log(configuracion);
            console.log("Guardar", state.Apertura)
            let setApertura = state.Apertura;  
            axios
                .post('abrircaja/abrir', { aperturas: setApertura }, configuracion)
                .then(result =>{
                    commit("SET_APERTURA", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
            state.editar_item = !state.editar_item;
    },

}
export const getters = {
    setArqueo: (state) => {
        console.log(state.Cierre.NumeroApertura)
        return state.cierres;
    }
};