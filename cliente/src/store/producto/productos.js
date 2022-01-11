import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    productos: [],
    Producto:{
        codigoproducto: "",
        codigobarra: "",
        descripcion: "",
        preciocompra: "0",
        precioventaminorista: "",
        precioventamayorista: "",
        stockminimo: "",
        stockactual: "",
        codigomarca: 1,
        codigocategoria: "",
        codigimpuesto: "",
        codigodeposito: "",
        
    },
    CodioProducto:'',
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_PRODUCTO(state, producto){
        console.log(producto);
        state.productos = producto;
    },
    GET_PRODUCTO(state, value){
        console.log("Muttations: ", value)
        state.Producto = value;
    },
    GET_CODIGO_PRODUCTO(state, value){
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
    getCodigoProducto({commit}, configuracion) {
        console.log(configuracion);
        axios
          .get("producto/codigo",configuracion)
          .then(CodioProducto => CodioProducto.data)
            .then(CodioProducto => {
                commit("GET_CODIGO_PRODUCTO", CodioProducto);
            });
      },
    getProductos({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('producto/listar', configuracion)
            .then(producto => producto.data)
            .then(producto => {
                commit("SET_PRODUCTO", producto);
            });
    },
    
    guardarProducto({ commit }, configuracion) {
        console.log(configuracion);
        if (state.editar_item==false) {
            console.log("Guardar", state.Producto)
            let setProducto = state.Producto;
            axios
                .post('producto/guardar', { productos: setProducto }, configuracion)
                .then(result =>{
                    commit("SET_PRODUCTO", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    state.mensaje="Ocurrio un error"
                    console.log("Error: "+error);
                });
            state.editar_item = false;
        } 
    },

    modificarProducto({ commit }, configuracion){
        if (state.editar_item==true) {
            console.log("Editar", state.Producto);
            let setProducto = state.Producto;
            axios
                .put('producto/modificar', { productos: setProducto }, configuracion)
                .then(result =>{
                    commit("SET_PRODUCTO", result.data);
                    state.mensaje="Registro Modificado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
                console.log("Editar", state.Producto);
                state.editar_item = false;
          //  state.editar_item = !state.editar_item;
        }
    },

    getProducto({commit}, item){
        console.log("Item recibido", item);
        commit("GET_PRODUCTO", item);
    },

    buscarCodigoBarraProducto({commit}){
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
    setProducto: (state) => {
        console.log("hola"+state.Producto.codigobarra)
        return state.producto;
    }
};