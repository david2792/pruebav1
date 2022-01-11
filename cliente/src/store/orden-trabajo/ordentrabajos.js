import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
export const state = {
    ordenes: [],
    aux:[],
    Orden:{
        codigosucursal:"",
        puntoexpedicion:"",
        numero:"",
        fechaemision:"",
        codigoestadoorden:"",
        observacion:"",
        CodigoUsuario:"",
        chapa:"",
        fechaemision:"",
        detalles:[] 
    },
    observacionRecepcion:'',
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_ORDEN(state, orden){
        console.log(orden);
        state.ordenes = orden;
    },
    SET_DETALLEORDEN(state, orden){
        console.log(orden);
        state.ordenes = orden;
    }
    ,
    SET_BUSCADOR(state,resultado){
        console.log(resultado)
        state.aux=resultado
    },
    GET_ORDEN(state, value){
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
    getBuscador({commit}, configuracion){
        console.log(state.Recepcion.codigocliente);
        axios
            .get(`rvehiculo/list/${state.Recepcion.codigocliente}`, configuracion)
            .then(result =>{
                console.log(result.data)  
             //  state.aux=result.data  
               commit("SET_BUSCADOR", result.data); 
            }).catch(error=>{
                console.log("Error: "+error);
            });
        
    },
    getOrdenes({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('orden/listar', configuracion)
            .then(orden => orden.data)
            .then(orden => {
                commit("SET_ORDEN", orden);
            });
    },
    getOrdenFacturacion({commit}, configuracion)
    {
        axios
            .get(`orden/listarUno/${state.Recepcion.codigocliente}`, configuracion)
            .then(result =>{
                console.log(result.data)  
             //  state.aux=result.data  
               commit("SET_BUSCADOR", result.data); 
            }).catch(error=>{
                console.log("Error: "+error);
            });
    },
    guardarOrden({ commit }, configuracion) {
        console.log(configuracion);
        if (state.editar_item==false) {
            console.log("cabecera", state.Orden)
            //console.log("detalle", state.detalleRecepcion)
            let setOrden = state.Orden;
            axios
                .post('orden/guardar', { ordenes: setOrden }, configuracion)
                .then(result =>{
                    commit("SET_ORDEN", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    state.mensaje="ERROR"
                    console.log("Error: "+error);
                });
        }else{
            let setOrden = state.Orden;
            axios
                .put('rvehiculo/actualizar', { ordenes: setOrden }, configuracion)
                .then(result =>{
                    commit("SET_ORDEN", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    state.mensaje="ERROR"
                    console.log("Error: "+error);
                });
        }
    },

    getActualizar({commit}, item){
        console.log("Item recibido", item);
        commit("GET_ORDEN", item);
    },
 

}

export const getters = {
    setOrden: (state) => {
        console.log(state.Orden.numero)
        return state.orden;
    }
};