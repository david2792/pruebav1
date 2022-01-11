import axios from "axios"

export const state ={
    cabecera_compras: {
        NroFactura: "",
        Fecha: new Date().toISOString().substr(0, 10),
        estado: 0,
        codigocondicion: 1,
        codigoUsuario: "",
        codigoPedido: 1,
        CodigoFormasPago: 1,
        codigoProveedor: "",
        Total: 0,
    },

    Limpiar_cabecera_compras: {
        NroFactura: "",
        Fecha: new Date().toISOString().substr(0, 10),
        estado: 0,
        codigocondicion: 1,
        codigoUsuario: "",
        codigoPedido: 1,
        CodigoFormasPago: 1,
        codigoProveedor: "",
        Total: 0,
    },
    listaCompras: [],
    mensaje: "",
};

export const mutations= {
    SET_CABECERA_COMPRA(state, cabecera_compras){
        state.cabecera_compras = cabecera_compras;
    },
    
    SET_LISTA_COMPRAS(state, {NroFactura, CodigoProducto, Descripcion, Cantidad, Precio, SubTotal}){
        let productInCompras = state.listaCompras.find(item =>{
            return item.CodigoProducto === CodigoProducto;
        });
        if (productInCompras) {
            productInCompras.Cantidad += Cantidad;
            return;
        } 
        state.listaCompras.push({
            NroFactura, 
            CodigoProducto, 
            Descripcion, 
            Cantidad, 
            Precio,
            SubTotal
        });
    },

    SET_MENSAJE(state, mensaje){
        state.mensaje = mensaje;
    },

    LIMPIAR_COMPRAS(state){
        state.cabecera_compras = state.Limpiar_cabecera_compras;
    }
};

export const actions= {
    insertCompras({commit}, configuracion){
        console.log("Insert compras where: Cabecera: ", state.cabecera_compras, ", Detalle: ", state.listaCompras, ", Datos: ", configuracion);
        axios
            .post("compras/guardar", {cabecera_compras: state.cabecera_compras, detalle_compras: state.listaCompras}, configuracion)
            .then((result) => {
                commit("SET_MENSAJE", result.data.mensaje);
                state.listaCompras = [];
                commit("LIMPIAR_COMPRAS");
            }).catch((err) => {
                console.log("error al tratar de registrar compras: ", err);
                mensaje = "error al tratar de registrar compras: ", err;
                commit("SET_MENSAJE", mensaje);
            });
    },

    addItemToCompras({commit}, {NumeroFactura, CodigoProducto, Descripcion, Cantidad, Precio, subTotal}){
        commit('SET_LISTA_COMPRAS', {NumeroFactura, CodigoProducto, Descripcion, Cantidad, Precio, subTotal});
        console.log("Lista de compras: ", state.listaCompras);
    }
};

export const getters={
    totalCompras: state =>{
        state.cabecera_compras.Total = 0;
        state.listaCompras.forEach(element => {
            state.cabecera_compras.Total += element.Precio * element.Cantidad;
        });
        return state.cabecera_compras.Total;
    }
};