import axios from 'axios';

export const state = {
    proveedores: [],
    Proveedor: {
        CodigoProveedor: "",
        RazonSocial: "",
        Cedula: "",
        Ruc: "",
        Direccion: "",
        Telefono: "",
        Email: "",
        Web: "",
        CodigoCiudad: "",
        Ciudad: "",
        configuracion: [],
    },
    editar_item: false,
    show_alert: false,
    show_alertE: false,
};

export const mutations = {
    SET_PROVEEDOR(state, proveedor) {
        console.log(proveedor);
        state.proveedores = proveedor;
    },
    GET_PROVEEDOR(state, value) {
        console.log("Muttations: ", value)
        state.Proveedor = value;
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {
    getProveedores({ commit }, configuracion) {
        console.log(configuracion);
        axios
            .get('proveedores', configuracion)
            .then(proveedor => proveedor.data)
            .then(proveedor => {
                commit("SET_PROVEEDOR", proveedor);
            });
    },
    getProveedor({ commit }, item) {
        console.log("Item recibido", item);
        commit("GET_PROVEEDOR", item);
    },

    guardarProveedor({ commit }, configuracion) {
        let setProveedor = state.Proveedor;
        if (!state.editar_item) {
            axios
                .post('proveedores', { proveedores: setProveedor }, configuracion)
                .then(result =>{
                    commit("SET_PROVEEDOR", result.data)
                }).catch(error=>{
                    console.log("Error: "+error);
                });
        } else {
            axios
                .put('proveedores', { proveedores: setProveedor }, configuracion)
                .then(result =>{
                    commit("SET_PROVEEDOR", result.data);
                }).catch(error=>{
                    console.log("Error: "+error);
                });
            console.log("Editar", state.Proveedor);
            state.editar_item = !state.editar_item;
        }
    },

    buscarCIProveedor({commit}){
        let proveedor = state.proveedores.find(
            find => find.Cedula === state.Proveedor.Cedula
          );
          // console.log(value);
          if(proveedor){
            console.log("encontrado", state.Proveedor.Cedula);
            state.show_alert = true
            commit('SHOW_ALERT', state.show_alert)
          }else{
              console.log("datos validos")
              state.show_alert = false
              commit('SHOW_ALERT', state.show_alert)
          }
    },
    buscarEmailProveedor({commit}){
        let proveedor = state.proveedores.find(
            find => find.Email === state.Proveedor.Email
          );
          // console.log(value);
          if(proveedor){
            console.log("encontrado", state.Proveedor.Email);
            state.show_alertE = true
            commit('SHOW_ALERTEMAIL', state.show_alertE)
          }else{
              console.log("datos validos, Registrar");
              state.show_alertE = false;
              commit('SHOW_ALERTEMAIL', state.show_alertE);
          }
    }
};

export const getters = {
    setProveedor: (state) => {
        return state.proveedor;
    },
};