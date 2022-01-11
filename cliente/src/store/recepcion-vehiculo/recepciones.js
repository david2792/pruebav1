import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
export const state = {
    recepciones: [],
    aux:[],
    Recepcion:{
        codigosucursal:"",
        puntoexpedicion:"",
        numero:"",
        chapa:"",
        codigocliente:"",
        recibidopor:"",
        estado:"",
        observaciones:"",
        fechaentrada:"",
        codigosucursal:"",
        puntoexpedicion:"",
        codigovehiculo:"",
        codigonivelcombustible:"",
        km:"",
        
    },
    detalleRecepcion:{
        codigosucursal:"",
        puntoexpedicion:"",
        codigovehiculo:"",
        codigonivelcombustible:"",
        km:"",
    },
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_RECEPCION(state, recepcion){
        console.log(recepcion);
        state.recepciones = recepcion;
    },
    SET_BUSCADOR_VEHICULO(state,resultado){
        console.log(resultado)
        state.aux=resultado;
    },
    GET_RECEPCION(state, value){
        console.log("Muttations: ", value)
        state.Recepcion = value;
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {
    getBuscadorRecepcion({commit}, configuracion){
        console.log(state.Recepcion.codigocliente);
        axios
            .get(`rvehiculo/list/${state.Recepcion.codigocliente}`, configuracion)
            .then(result =>{
                console.log(result)   
               commit("SET_BUSCADOR_VEHICULO", result.data); 
            }).catch(error=>{
                console.log("Error: "+error);
            });
        
    },
    getRecepciones({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('rvehiculo/listar', configuracion)
            .then(recepcion => recepcion.data)
            .then(recepcion => {
                commit("SET_RECEPCION", recepcion);
            });
    },
    
    guardarRecepcion({ commit }, configuracion) {
        console.log(configuracion);
        if (state.editar_item==false) {
            console.log("cabecera", state.Recepcion)
            //console.log("detalle", state.detalleRecepcion)
            let setDetalle= [];
           /// setDetalle=state.detalleRecepcion;
            let setRecepcion = state.Recepcion;
            axios
                .post('rvehiculo/guardar', { recepciones: setRecepcion }, configuracion)
                .then(result =>{
                    commit("SET_RECEPCION", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    state.mensaje="ERROR"
                    console.log("Error: "+error);
                });
        }else{
            let setRecepcion = state.Recepcion;
            axios
                .put('rvehiculo/actualizar', { recepciones: setRecepcion }, configuracion)
                .then(result =>{
                    commit("SET_RECEPCION", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    state.mensaje="ERROR"
                    console.log("Error: "+error);
                });
        }
    },

    getRecepcion({commit}, item){
        console.log("Item recibido", item);
        commit("GET_RECEPCION", item);
    },

}

export const getters = {
    setRecepcion: (state) => {
        console.log(state.Recepcion.numero)
        return state.recepcion;
    }
};