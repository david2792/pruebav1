import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    aprturas: [],
    Apertura:{
        NumeroApertura:"",
        CodigoUsuario:"",
        NumeroCaja:"",
        Fecha:"",
        Hora:"",
        Monto:"",
        Estado:""
        
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
    getCodigoProducto({commit}, configuracion) {
        console.log(configuracion);
        axios
          .get("productos/codigo",configuracion)
          .then(CodioProducto => CodioProducto.data)
            .then(CodioProducto => {
                commit("GET_CODIGO_PRODUCTO", CodioProducto);
            });
      },
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

    getProducto({commit}, item){
        console.log("Item recibido", item);
        commit("GET_PRODUCTO", item);
    },
    buscarCodigoBarra({commit}){
        let producto = state.productos.find(
            find => find.CodigoBarra === state.Producto.CodigoBarra
          );
          // console.log(value);
          if(producto){
            console.log("encontrado", state.Producto.CodigoBarra);
            state.show_alert = true
            commit('SHOW_ALERT', state.show_alert)
          }else{
              console.log("datos validos")
              state.show_alert = false
              commit('SHOW_ALERT', state.show_alert)
          }
},
}
export const getters = {
    setApertura: (state) => {
        console.log(state.Apertura.NumeroApertura)
        return state.aperturas;
    }
};