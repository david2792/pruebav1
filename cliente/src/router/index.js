import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
import Login from "../components/acceso/Login.vue";
import bienvenida from "../components/pantallaPrincipal/bienvenida.vue";
import VistaCliente from "../views/cliente/VistaCliente.vue";

// productos
import VistaProducto from "../views/producto/VistaProducto.vue";


import VistaServicio from "../views/servicio/VistaServicio.vue";
// taller
import VistaVehiculo from '../views/vehiculo/VistaVehiculo';
import VistaRecepcion from '../views/recepcion_vehiculo/VistaRecepcion';
import VistaOrden from '../views/orden_trabajo/VistaOrden'
import FormularioOrden from '../views/orden_trabajo/FormularioOrden'
import prueba from '../views/orden_trabajo/prueba'

// caja
import FormularioApertura from '../views/apertura_caja/FormularioApertura'
import FormularioArqueo from '../views/arqueo_cierre/FormularioArqueo'
import FormularioFacturacion from '../views/facturacion/FormularioFacturacion'

// Compras
import Vista from "../components/compras/formaspago/Vista";
import VistaCompras from '../components/compras/vistacompras/VistaCompras'
import VistaProveedor from '../views/proveedor/VistaProveedor'
// Informes
import Informe_Orden_Trabajo from '../views/informes/orden_trabajo/Orden_Trabajo'
import Filtro_orden from '../views/informes/orden_trabajo/Filtro_orden'
import Lista_Orden from '../views/informes/orden_trabajo/Lista_Orden'
import Impresion_Factura from '../views/facturacion/Impresion_Factura'

Vue.use(Router);
var router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        libre: true,
      },
    },
    {
      path: "/bienvenida",
      name: "Bienvenida",
      component: bienvenida,
      meta: {
        administrador: true,
      },
    },
    {
      path: "/clientes",
      name: "cliente",
      component: VistaCliente,
      meta: {
        administrador: true,
      }
    },
    
    // rutas de productos
    {
      path: '/productos',
      name: 'producto',
      component: VistaProducto,
      meta: {
        administrador: true
      }
    },
    {
      path: '/servicios',
      name: 'servicio',
      component: VistaServicio,
      meta: {
        administrador: true
      }
    },
    // taller
    {
      path: '/vehiculos',
      name: 'vehiculo',
      component: VistaVehiculo,
      meta: {
        libre: true
      }
    },
    {
      path: '/recepciones',
      name: 'recepcion',
      component: VistaRecepcion,
      meta: {
        libre: true
      }
    },
    {
      path: '/ordenes',
      name: 'orden',
      component: VistaOrden,
      meta: {
        libre: true
      }
    },
    {
      path: '/ordenesformulario',
      name: 'ordenformulario',
      component: VistaOrden,
      meta: {
        libre: true
      }
    },
    {
      path: '/aperturacajas',
      name: 'aperturacaja',
      component: FormularioApertura,
      meta: {
        libre: true
      }
    },
    {
      path: '/arqueo',
      name: 'arqueo',
      component: FormularioArqueo,
      meta: {
        libre: true
      }
    },
    {
      path: '/facturaciones',
      name: 'facturacion',
      component: FormularioFacturacion,
      meta: {
        libre: true
      }
    },
    // Compras
    {
      path: "/formaspago",
      name: "formaspago",
      component: Vista,
      meta: {
        administrador: true,
      },
    },
    {
      path: '/vistacompras',
      name: 'vistacompras',
      component: VistaCompras,
      meta:{
        administrador: true
      }
    },
    {
      path: '/vistaProveedor',
      name: 'VistaProveedor',
      component: VistaProveedor,
      meta: {
        administrador: true
      }
    },
    // informes
    {
      path: '/informe_orden_trabajo',
      name: 'Informe_Orden_Trabajo',
      component: Informe_Orden_Trabajo,
      meta:{
        administrador: true
      }
    },
    {
      path: '/filtro_orden',
      name:'Filtro_orden',
      component: Filtro_orden,
      meta:{
        administrador: true
      }
    },
    {
      path: '/lista_Orden',
      name: 'Lista_Orden',
      component: Lista_Orden,
      meta:{
        administrador: true
      }
    },
    {
      path: "/impresion_factura",
      name: "Impresion_Factura",
      component: Impresion_Factura,
      meta: {
        administrador : true
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.libre)) {
    next();
  } else if (
    store.state.usuario &&
    store.state.usuario.descripcion == "ADMINISTRADOR"
  ) {
    if (to.matched.some((record) => record.meta.administrador)) {
      next();
    }
  } else if (store.state.usuario && store.state.usuario.rol == "Vendedor") {
    if (to.matched.some((record) => record.meta.vendedor)) {
      next();
    }
  } else if (store.state.usuario && store.state.usuario.rol == "Almacenero") {
    if (to.matched.some((record) => record.meta.almacenero)) {
      next();
    }
  } else {
    next({ name: "Login" });
    localStorage.clear();
  }
});
export default router;
