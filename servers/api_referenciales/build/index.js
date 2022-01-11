"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const validateToken_1 = require("./libs/validateToken");
// inidex rutas
const indexRutas_1 = __importDefault(require("./rutas/indexRutas"));
// referenciales productos
const ruta_presentacion_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_presentacion"));
const ruta_categoria_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_categoria"));
const ruta_unidadMedida_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_unidadMedida"));
const ruta_impuesto_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_impuesto"));
const ruta_marca_1 = __importDefault(require("./rutas/rutas-referenciales/ruta_marca"));
const ruta_producto_1 = __importDefault(require("./rutas/rutas-producto/ruta_producto"));
const ruta_servicio_1 = __importDefault(require("./rutas/rutas-producto/ruta_servicio"));
const ruta_lista_1 = __importDefault(require("./rutas/rutas-producto/ruta_lista"));
const ruta_cliente_1 = __importDefault(require("./rutas/rutas-clientes/ruta_cliente"));
const ruta_ciudad_1 = __importDefault(require("./rutas/rutas-localidades/ruta_ciudad"));
const ruta_departamento_1 = __importDefault(require("./rutas/rutas-localidades/ruta_departamento"));
const ruta_pais_1 = __importDefault(require("./rutas/rutas-localidades/ruta_pais"));
const ruta_usuario_1 = __importDefault(require("./rutas/rutas-acceso/ruta_usuario"));
const ruta_usuarioMecanico_1 = __importDefault(require("./rutas/rutas-usuario/ruta-usuarioMecanico"));
const ruta_estadoRecepecion_1 = __importDefault(require("./rutas/rutas-taller/ruta-estadoRecepecion"));
const ruta_nivelCombustible_1 = __importDefault(require("./rutas/rutas-taller/ruta-nivelCombustible"));
const ruta_tipoTransmicion_1 = __importDefault(require("./rutas/rutas-taller/ruta-tipoTransmicion"));
const ruta_traccion_1 = __importDefault(require("./rutas/rutas-taller/ruta-traccion"));
const ruta_modeloVehiculo_1 = __importDefault(require("./rutas/rutas-taller/ruta-modeloVehiculo"));
const ruta_marcaVehiculo_1 = __importDefault(require("./rutas/rutas-taller/ruta-marcaVehiculo"));
const ruta_tipoCombustible_1 = __importDefault(require("./rutas/rutas-taller/ruta-tipoCombustible"));
const ruta_color_1 = __importDefault(require("./rutas/rutas-taller/ruta-color"));
const ruta_anios_1 = __importDefault(require("./rutas/rutas-taller/ruta-anios"));
const ruta_estadoReparacion_1 = __importDefault(require("./rutas/rutas-taller/ruta-estadoReparacion"));
const ruta_estadorecepcion_1 = __importDefault(require("./rutas/rutas-taller/ruta-estadorecepcion"));
const ruta_vehiculo_1 = __importDefault(require("./rutas/rutas-taller/ruta-vehiculo"));
const ruta_recepcionvehiculo_1 = __importDefault(require("./rutas/rutas-taller/ruta-recepcionvehiculo"));
const ruta_ordenTrabajo_1 = __importDefault(require("./rutas/rutas-taller/ruta-ordenTrabajo"));
// referenciales factura
const ruta_timbrado_1 = __importDefault(require("./rutas/rutas-referenciales-factura/ruta_timbrado"));
const ruta_sucursales_1 = __importDefault(require("./rutas/rutas-referenciales-factura/ruta_sucursales"));
const ruta_tiposDocumentos_1 = __importDefault(require("./rutas/rutas-referenciales-factura/ruta_tiposDocumentos"));
// Referenciales compras
const rutas_proveedores_1 = __importDefault(require("./rutas/rutas-compras/rutas-proveedores"));
const rutas_compras_1 = __importDefault(require("./rutas/rutas-compras/rutas-compras"));
// referenciales cajas 
const ruta_aperturacaja_1 = __importDefault(require("./rutas/rutas-referenciales-caja/ruta-aperturacaja"));
// facturacion
const ruta_facturacion_1 = __importDefault(require("./rutas/rutas-facturacion/ruta-facturacion"));
const ruta_condicion_1 = __importDefault(require("./rutas/rutas-referenciales-factura/ruta-condicion"));
const ruta_tipodocumento_1 = __importDefault(require("./rutas/rutas-referenciales-factura/ruta-tipodocumento"));
const rutas_formapagos_1 = __importDefault(require("./rutas/rutas-compras/rutas-formapagos"));
// fin referenciales productos
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.rutas();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    rutas() {
        //instanciamos el index de rutas
        this.app.use(indexRutas_1.default);
        // instanciamos las rutas de referenciales
        this.app.use('/api/depositos', validateToken_1.TokenValidation, ruta_presentacion_1.default);
        this.app.use('/api/marcas', validateToken_1.TokenValidation, ruta_marca_1.default);
        this.app.use('/api/unidades', validateToken_1.TokenValidation, ruta_unidadMedida_1.default);
        this.app.use('/api/impuestos', validateToken_1.TokenValidation, ruta_impuesto_1.default);
        //this.app.use('/api/familias',familiaRutas);
        this.app.use('/api/categorias', validateToken_1.TokenValidation, ruta_categoria_1.default);
        this.app.use('/api/productos', validateToken_1.TokenValidation, ruta_producto_1.default);
        this.app.use('/api/servicios', validateToken_1.TokenValidation, ruta_servicio_1.default);
        this.app.use('/api/listasprecios', validateToken_1.TokenValidation, ruta_lista_1.default);
        this.app.use('/api/clientes', validateToken_1.TokenValidation, ruta_cliente_1.default);
        // referenciales localidades
        this.app.use('/api/ciudades', validateToken_1.TokenValidation, ruta_ciudad_1.default);
        this.app.use('/api/departamentos', validateToken_1.TokenValidation, ruta_departamento_1.default);
        this.app.use('/api/paises', validateToken_1.TokenValidation, ruta_pais_1.default);
        // referenciales taller
        this.app.use('/api/estadorecepciones', validateToken_1.TokenValidation, ruta_estadoRecepecion_1.default);
        this.app.use('/api/nivelcombustibles', validateToken_1.TokenValidation, ruta_nivelCombustible_1.default);
        this.app.use('/api/estadorepaciones', validateToken_1.TokenValidation, ruta_estadoReparacion_1.default);
        this.app.use('/api/estadotransmiciones', validateToken_1.TokenValidation, ruta_tipoTransmicion_1.default);
        this.app.use('/api/tracciones', validateToken_1.TokenValidation, ruta_traccion_1.default);
        this.app.use('/api/modelovechiculos', validateToken_1.TokenValidation, ruta_modeloVehiculo_1.default);
        this.app.use('/api/marcavehiculos', validateToken_1.TokenValidation, ruta_marcaVehiculo_1.default);
        this.app.use('/api/tipocombustibles', validateToken_1.TokenValidation, ruta_tipoCombustible_1.default);
        this.app.use('/api/colores', validateToken_1.TokenValidation, ruta_color_1.default);
        this.app.use('/api/anios', validateToken_1.TokenValidation, ruta_anios_1.default);
        this.app.use('/api/estadotrabajos', validateToken_1.TokenValidation, ruta_estadorecepcion_1.default);
        this.app.use('/api/vehiculos', ruta_vehiculo_1.default);
        this.app.use('/api/vehiculos', validateToken_1.TokenValidation, ruta_vehiculo_1.default);
        this.app.use('/api/rvehiculo', ruta_recepcionvehiculo_1.default);
        this.app.use('/api/orden', validateToken_1.TokenValidation, ruta_ordenTrabajo_1.default);
        this.app.use('/api/mecanico', validateToken_1.TokenValidation, ruta_usuarioMecanico_1.default);
        // fin de referenciales
        //referenciales Facturas
        this.app.use('/api/timbrados', validateToken_1.TokenValidation, ruta_timbrado_1.default);
        this.app.use('/api/sucursales', validateToken_1.TokenValidation, ruta_sucursales_1.default);
        this.app.use('/api/tiposDocumentos', validateToken_1.TokenValidation, ruta_tiposDocumentos_1.default);
        // referenciales compras
        this.app.use('/api/proveedores', validateToken_1.TokenValidation, rutas_proveedores_1.default);
        this.app.use('/api/fpagos', validateToken_1.TokenValidation, rutas_formapagos_1.default);
        this.app.use('/api/compras', validateToken_1.TokenValidation, rutas_compras_1.default);
        // ruta de acceso
        this.app.use('/api/usuario', ruta_usuario_1.default);
        // ruta caja
        this.app.use('/api/abrircaja', validateToken_1.TokenValidation, ruta_aperturacaja_1.default);
        // facturacion
        this.app.use('/api/facturacion', validateToken_1.TokenValidation, ruta_facturacion_1.default);
        this.app.use('/api/condicion', validateToken_1.TokenValidation, ruta_condicion_1.default);
        this.app.use('/api/tipodocumento', validateToken_1.TokenValidation, ruta_tipodocumento_1.default);
    }
    iniciar() {
        this.app.listen(this.app.get('port'), () => {
            console.log("se inicio el servidor");
        });
    }
}
const servidor = new Server();
servidor.iniciar();
