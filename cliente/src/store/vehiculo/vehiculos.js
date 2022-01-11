import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const state = {
    vehiculos: [],
    Vehiculo:{
        codigovehiculo:"",
            CodigoCliente:"",
            codigomarca: "",
            codigomodelo:  "",
            codigotransmision: "",
            codigocolor: "",
            chapa: "",
            observacion: "",
            chasis: "",
            modelo:""

        
    },

    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false
    
};

export const mutations = {
    SET_VEHICULO(state, vehiculo){
        console.log(vehiculo);
        state.vehiculos = vehiculo;
    },
    GET_VEHICULO(state, value){
        console.log("Muttations: ", value)
        state.Vehiculo = value;
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {
    filtrarPorCodigoCliente() {
          returnstate.Vehiculo.filter(
            item => item.CodigoCliente ===state.Vehiculo.CodigoCliente

          );

      },
 

    getVehiculos({commit}, configuracion){
        console.log(configuracion);
        axios
            .get('vehiculos/', configuracion)
            .then(vehiculo => vehiculo.data)
            .then(vehiculo => {
                commit("SET_VEHICULO", vehiculo);
            });
    },
    
    guardarVehiculo({ commit }, configuracion) {
        console.log(configuracion);
        if (state.editar_item==false) {
            console.log("Guardar", state.Vehiculo)
            let setVehiculo = state.Vehiculo;
            axios
                .post('vehiculos', { vehiculos: setVehiculo }, configuracion)
                .then(result =>{
                    commit("SET_VEHICULO", result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    state.mensaje="ERROR"
                    console.log("Error: "+error);
                });
            //state.editar_item = !state.editar_item;
        } else {
            console.log("Editar", state.Vehiculo);
            let setVehiculo = state.Vehiculo;
            axios
                .put('vehiculos', { vehiculos: setVehiculo }, configuracion)
                .then(result =>{
                    commit("SET_VEHICULO", result.data);
                    state.mensaje="Registro Modificado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
                console.log("Editar", state.Vehiculo);
                state.editar_item = !state.editar_item;
          //  state.editar_item = !state.editar_item;
        }
    },

    getVehiculo({commit}, item){
        console.log("Item recibido", item);
        commit("GET_VEHICULO", item);
    },

}
export const getters = {
    setVehiculo: (state) => {
        console.log(state.Vehiculo.codigo)
        return state.vehiculo;
    }
};