import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import store from '..';

export const state = {
    facturaciones: [],
    get_facturacion:[],
    Cabecera:{
        CodigoTiposDocumento:"",
        numeroApertura:"",
        NumeroTimbrado:"",
        CodigoSucursal:"",
        PuntoExpedicion:"",
        NumeroFactura:"",
        CodigoCondicion:"",
        CodigoFormasCobro:"",
        CodigoCliente:"",
        Apodo:"",
        CodigoUsuario:"",
        Fecha:"",
        Hora:"",
        Estado:"",
        TotalLetras:""
        
    },
    
    DetalleCabecera:{
        codigoproducto:'',
        descripcion:'',
        cantidad:'',
        precio:'',
        subtotal:'',
        stockactual:'',
        total:'',
        datosDetalle:[]
    },
    DatosOrden:{
        numero:''
    },
//   datos de apertura
        numeroApertura:"",
        caja:"",
        Cajero:"",
//   fin datos de apertura
// datos empresa 
        PuntoExpedicion:"",
        CodigoSucursal:"",
        NumeroTimbrado:"",
// fin datos empresa
   // numero:'',
    codigo:"",
    datosApertura:[],
    detalleFactura:[],
    configuracion: [],
    mensaje:'',
    editar_item:false,
    show_alert: false,
    show_alertE: false,
    // validar apertura
    apertura:0
    
};

export const mutations = {
    SET_FACTURA(state, facturacion){
      console.log(facturacion);
        // state.facturaciones = facturacion;
        state.get_facturacion = facturacion.cabecera;

    },
    SET_MENSAJE(state, mensaje){
        //  console.log(producto);
          state.mensaje = mensaje;
      },
      SET_DETALLE_ORDEN(state, orden)
      {
        console.log("Somos la factura")
        console.log(orden);
        state.DetalleCabecera.datosDetalle = orden;
      },
    GET_APERTURA(state, value){
        console.log("Muttations: ", value)
        state.Producto = value;
    },
    SET_VALIDARAPERTURA(state,apertura)
    {
       if(apertura.length==0)
       {
        console.log("apertura falta")
        state.apertura=0
       }else
       {
        state.numeroApertura=apertura[0].numeroApertura
        state.caja=apertura[0].caja
        state.Cajero=apertura[0].Cajero
        state.apertura=1
       }
 
    },
    SET_VALIDARTIMBRADO(state,timbrado)
    {
      //  console.log("timbrado "+timbrado[0].NumeroTimbrado)
        state.Cabecera.NumeroTimbrado=timbrado[0].NumeroTimbrado
    },
    SHOW_ALERT(state, show){
        state.show_alert = show;
    },
    SHOW_ALERTEMAIL(state, show){
        state.show_alertE = show;
    }
};

export const actions = {
    getNumeroTimbrado({commit}, configuracion) {
        console.log(state.Cabecera.CodigoTiposDocumento);
        axios
        .get(`facturacion/timbrado/${state.Cabecera.CodigoTiposDocumento}`, configuracion)
            .then(timbrado => timbrado.data)
            .then(timbrado => {
                commit("SET_VALIDARTIMBRADO", timbrado);
            });
      },

    getValidarApertura({commit},configuracion){
        axios
        .get(`facturacion/validar/${state.Cabecera.CodigoUsuario}`, configuracion)
            .then(apertura => apertura.data)
            .then(apertura => {
                commit("SET_VALIDARAPERTURA", apertura);
            });

    },
    
    guardarFactura({ commit }, configuracion) {
        console.log(configuracion);
            console.log("Guardar", state.Cabecera)
            console.log("orden", state.DatosOrden)
            let setCabecera = state.Cabecera;
            let setDetalle = state.DetalleCabecera;  
            let setOrden = state.DatosOrden;
            axios
                .post('facturacion/guardar', { cabeceras: setCabecera, detalles:setDetalle, orden:setOrden }, configuracion)
                .then(result =>{
                    console.log("Retornando datos from factura: ", result.data)
                 commit("SET_FACTURA",result.data);
                    state.mensaje="Registro Guardado"
                }).catch(error=>{
                    console.log("Error: "+error);
                });
            state.editar_item = !state.editar_item;
    },

    CapturarOrdenTrabajo({ commit }, configuracion)
    {
       // console.log(state.Cabecera.CodigoTiposDocumento);
        axios
        .get(`orden/update/${state.DatosOrden.numero}`, configuracion)
            .then(orden => orden.data)
            .then(orden => {
                commit("SET_DETALLE_ORDEN", orden);
            });
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
    setFacturacion: (state) => {
        console.log(state.Cabecera.NumeroFactura)
        return state.aperturas;
    }
};