import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    productos: [],
    Producto:{
        CodigoProducto: "",
        CodigoBarra: "",
        Descripcion: "",
        PrecioCompra: "",
        PrecioVentaMinorista: "",
        CodigoDeposito: "",
        
    },
    CodigoProducto:'',
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_SERVICIO(state, producto){
        console.log(producto);
        state.productos = producto;
    },
    GET_SERVICIO(state, value){
        console.log("Muttations: ", value)
        state.Producto = value;
    },
    GET_CODIGO_SERVICIOO(state, value){
        console.log("codigo: ", value)
        state.CodigoProducto = value;
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {

    getServicios({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('servicios/listar', configuracion)
            .then(producto => producto.data)
            .then(producto => {
                commit("SET_SERVICIO", producto);
            });
    },
    
    guardarServicio({ commit }, configuracion) {
        console.log("ESTADO "+state.editar_item);
        if (state.editar_item==false) {
            console.log("Guardar", state.Producto)
            let setProducto = state.Producto;
            axios
                .post('servicios/add', { productos: setProducto }, configuracion)
                .then(result =>{
                    commit("SET_SERVICIO", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
       //  state.editar_item = !state.editar_item;
        } else {
            console.log("Editar", state.Producto);
            let setServicio = state.Producto;
            axios
                .put('servicios/update', { productos: setServicio }, configuracion)
                .then(result =>{
                    commit("SET_SERVICIO", result.data);
                    state.mensaje="Registro Modificado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
                console.log("Editar", state.Producto);
                state.editar_item = false;
         // state.editar_item = !state.editar_item;
        }
    },

    getServicio({commit}, item){
        console.log("Item recibido", item);
        commit("GET_SERVICIO", item);
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
    setServicio: (state) => {
        console.log(state.Producto.CodigoBarra)
        return state.producto;
    }
};