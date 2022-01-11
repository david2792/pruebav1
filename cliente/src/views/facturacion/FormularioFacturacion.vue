<template>
<v-form  v-model="valid" ref="form">
    <v-card
    class="mx-auto"
    max-width="1300"
   >
      <v-card-text>
       <v-container grid-list-md>
        <v-layout align-center justify-center v-if="vFacturacion.apertura == 1"> 
        <v-row>
        <v-col cols="12" sm="12" md="12">
        <v-alert
        outlined
           color="green accent-1"
            >
           FACTURACION<v-icon color="green accent-1" style=" font-size: 38px; ">
                local_grocery_store
            </v-icon>
            <span>CAJERO: {{vFacturacion.Cajero}}</span>
         </v-alert>
        </v-col>

         <v-col  class="pa-1" cols="12" sm="12" md="1">
            <v-text-field
            v-model="vFacturacion.numeroApertura"
            outlined  
            dense
            label="NRO APERTURA"
            placeholder=" "
          ></v-text-field>
         </v-col>
          <v-col  class="pa-1" cols="12" sm="12" md="1">
            <v-text-field
            v-model="vFacturacion.caja"
            outlined  
            dense
            label="CAJA"
            placeholder=" "
          ></v-text-field>
         </v-col>
         <v-col  class="pa-1" cols="12" sm="12" md="1">
            <v-text-field
             v-model="vFacturacion.Cabecera.NumeroTimbrado"
            disabled
            outlined  
            dense
            label="TIMBRADO"
            placeholder="0"   
          ></v-text-field>
         </v-col>
         <v-col  class="pa-1" cols="12" sm="12" md="1">
            <v-text-field
            v-model="vFacturacion.CodigoSucursal"
            outlined  
            dense
            label="SUCURSAL"
            placeholder="0"   
          ></v-text-field>
         </v-col>
         <v-col  class="pa-1" cols="12" sm="12" md="1">
            <v-text-field
            v-model="vFacturacion.PuntoExpedicion"
            outlined  
            dense
            label="PUNTO EXPEDICION"
            placeholder="0"   
          ></v-text-field>
         </v-col>
          <v-col  class="pa-1" cols="12" sm="12" md="2">
           <v-select ref="condicion"
           dense
           @click="refrescarCondicion()"
            v-model="vCondicion.Condiciones[0]"
           
            :items="vCondicion.Condiciones"
            :item-text="item=>`${item.CodigoCondicion} ${item.Descripcion}`"
            item-value="item.CodigoCondicion"
            return-object
            label="CONDICION VENTA"
            placeholder="CONTADO" 
            outlined
            ></v-select>
         </v-col>
         <v-col  class="pa-1" cols="12" sm="12" md="2">
           <v-select ref="seleccionado"
           dense            
           v-model="vDocumento.Documentos[1]"

           @mousedown="validarTimbrado(),refrescarDocumento()"
           :items="vDocumento.Documentos"
           item-value="item.Codigo"
           :item-text="item=>`${item.Codigo} ${item.Descripcion}`"
            label="TIPO DOCUMENTO"
            return-object
            placeholder="NOTA-PEDIDO" 
            outlined
            ></v-select>
         </v-col>
          <v-col class=" pt-0 mt-0" cols="12" sm="2" md="2" >
           <v-text-field
           v-model="vFacturacion.DatosOrden.numero"
            outlined  
            dense
            label="Nro Orden de Trabajo"
            placeholder="0"   
          ></v-text-field>
            </v-col>
        <v-col  class=" pt-0 mt-0" cols="12" sm="12" md="12" >
            <v-divider></v-divider>
        </v-col>
        <!-- <v-col  class="pa-1" cols="12" sm="12" md="2">
            <v-text-field
             v-model="vFacturacion.Cabecera.NumeroTimbrado"
            disabled
            outlined  
            dense
            label="TIMBRADO"
            placeholder="0"   
          ></v-text-field>
         </v-col> -->
         
         <v-spacer></v-spacer>
         <!-- DIVISOR DE DATOS DE CLIENTE -->
         <v-row>
            <v-col class=" pt-0 mt-0" cols="12" sm="2" md="1" >
           <v-text-field
           v-model="vFacturacion.Cabecera.CodigoCliente"
            outlined  
            dense
            label="COD"
            placeholder="0"   
          ></v-text-field>
            </v-col>
            <v-col class=" pt-0 mt-0" cols="12" sm="12" md="5" >
           <v-text-field
           v-model="razonsocial"
            outlined  
            dense
            label="CLIENTE"
            placeholder="0"   
          ></v-text-field>
        </v-col>
         <v-col class=" pt-0 mt-0" cols="12" sm="12" md="1" >
             <v-btn @click="BuscadorCliente()"  style="font-size: 38px;"><v-icon color="blue" style="font-size: 38px;">search</v-icon></v-btn>
         </v-col>
        <v-col class=" pt-0 mt-0" cols="12" sm="12" md="2" >
           <v-text-field
           v-model="ci"
            outlined  
            dense
            label="C.I"
            placeholder="0"   
          ></v-text-field>
        </v-col>
        <v-col class=" pt-0 mt-0" cols="12" sm="12" md="3" >
           <v-text-field
           v-model="ruc"
            outlined  
            dense
            label="RUC"
            placeholder="0"   
          ></v-text-field>
        </v-col>
         </v-row>
         <!-- OTRA FILA -->
         <v-row>

         </v-row>
         <!-- FIN -->
         
         <!-- producto -->
                  <v-row>
            <v-col class=" pt-0 mt-0" cols="12" sm="2" md="1" >
           <v-text-field
            outlined  
            v-model="vFacturacion.DetalleCabecera.codigoproducto"
            dense
            label="COD"
            placeholder="0"   
          ></v-text-field>
            </v-col>
            <v-col class=" pt-0 mt-0" cols="12" sm="12" md="4" >
           <v-text-field
            outlined  
            v-model="vFacturacion.DetalleCabecera.descripcion"
            dense
            label="PRODUCTO"
            placeholder="0"   
          ></v-text-field>
        </v-col>
         <v-col class=" pt-0 mt-0" cols="12" sm="12" md="1" >
             <v-btn  @click="BuscadorProductos()"   style="font-size: 38px;"><v-icon style="font-size: 38px;">search</v-icon></v-btn>
         </v-col>
        <v-col class=" pt-0 mt-0" cols="12" sm="12" md="2" >
           <v-text-field
            outlined  
            v-model="vFacturacion.DetalleCabecera.precio"
            dense
            label="PRECIO"
            placeholder="0"   
          ></v-text-field>
        </v-col>
        <v-col class=" pt-0 mt-0" cols="12" sm="12" md="1" >
           <v-text-field
            outlined  
            v-model="vFacturacion.DetalleCabecera.cantidad"
            dense
            label="CANTIDAD"
            placeholder="0"   
          ></v-text-field>
        </v-col>
        <v-col class=" pt-0 mt-0" cols="12" sm="12" md="2" >
           <v-text-field
            outlined  
            v-model="vFacturacion.DetalleCabecera.stockactual"
            dense
            label="STOCK"
            placeholder="0"   
          ></v-text-field>
        </v-col>
        <v-col class=" pt-0 mt-0" cols="12" sm="12" md="1" >
            <v-btn @click="agregarDatosTabla()" color="red"><v-icon>add</v-icon></v-btn>
        </v-col>
         </v-row>
         <!-- fin -->
         <!-- LINEA DE TABLA -->
         <v-col  class=" pt-0 mt-0" cols="12" sm="12" md="12" >
            <v-divider ></v-divider>
        </v-col>
         <!-- FIN -->
        <v-col cols="12" sm="12" md="12">
             <v-data-table
                  :headers="cabeceraDetalles"
                  :items="vFacturacion.DetalleCabecera.datosDetalle "
                  class="elevation-1"
                  
              >
              <template v-slot:[`item.borrar`]="{ item }">
                <v-btn
                          outlined
                          class="mx-2"
                          fab
                          dark
                          small
                          color="pink darken-4"
                          @click="eliminarDetalle(vFacturacion.DetalleCabecera.datosDetalle,item)"
                        >
                          <v-icon dark>delete</v-icon>
                        </v-btn>
                      
                </template>
                  <template v-slot:items>
                  <td >{{item.codigoproducto}}</td>
                  <td  v-if="2==3" ></td>
                 <td  >{{item.descripcion}}</td>
                  <td >{{(item.cantidad )}}</td>
                  <td  >{{ item.precio | currency }}</td>
                  <td >{{item.subtotal}}</td>
                  
                </template>
              
                <template >
                  <h3>No hay artículos agregados al detalle.</h3>
                </template>
              </v-data-table>
               <v-flex class="text-xl">
                <strong><h3 style=" font-size: 18pt; text-align: right; color:white" c>TOTAL:{{fromatodemoneda(vFacturacion.DetalleCabecera.total=calcularTotal) }}</h3></strong>
              </v-flex>
        </v-col>
        <v-col cols="6" sm="6" md="2"  >
         <v-btn color="red " outlined large @click="guardar()" >GUARDAR<v-icon>save</v-icon></v-btn>
        </v-col>
        <v-col cols="6" sm="6" md="2"  >
         <v-btn color="succes " outlined large  @click="cancelarTodo()" >CANCELAR<v-icon>not_interested</v-icon></v-btn>
        </v-col>
        <v-col cols=6 sm="6" md="12" v-if="notificacion==1">
            <v-alert 
            
            dismissible
            close-icon="mdi-delete"
            color="light-blue accent-4"
            elevation="2"
            type="info"
            outlined
           >
      {{this.$store.state.vFacturacion.mensaje}}
    </v-alert>
        </v-col>
           </v-row>
        </v-layout>
        <v-alert v-if="vFacturacion.apertura == 0"
            dismissible
            color="red"
            elevation="2"
            type="error"  
           >
     Realizar Apertura
    </v-alert>
       </v-container>
      </v-card-text>
    </v-card>
    <!-- busqueda cliente -->
    <v-dialog v-model="dialogoCliente" max-width="1000px">
     <v-card>
       <v-card-text>
         <v-container  grid-list-md>
           <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
            <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          color="red"
        ></v-text-field>
        <v-data-table
        :headers="cabeceraCliente"
        :items="vCliente.clientes"
        :search="search"
        id="cabecera"
        class="elevation-4"
      >

      <template v-slot:[`item.opcion`]="{ item }">
       <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink darken-4"
                @click="agregarDatosCliente(item)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
      </template>
        <template v-slot:items>
          
          <td>{{ props.item.CodigoCliente}}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.Cedula }}</td>
          <td>{{ props.item.Ruc }}</td>
          <td>{{ props.item.Direccion }}</td>
          <td>{{ props.item.Telefono }}</td>
      <td></td>

        </template>
      </v-data-table>
              </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
    </v-card>
    </v-dialog>
    <!-- fin -->
    <!-- busqueda productos -->
    <v-dialog v-model="dialogoProducto" max-width="1000px">
       <v-card>
        <v-card-text>
         <v-container  grid-list-md>
           <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          color="red"
        ></v-text-field>
        <v-data-table
        :headers="cabeceraProducto"
        :items="vProducto.productos"
        :search="search"
        id="cabecera"
        class="elevation-4"
      >
      <template v-slot:[`item.opcion`]="{ item }">
       <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink darken-4"
                @click="agregarDatosProducto(item)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
      </template>
        <template v-slot:items>
          <td>{{ props.item.CodigoProducto }}</td>
          <td>{{ props.item.CodigoBarra }}</td>
          <td >{{ props.item.Descripcion }}</td>
          <td>{{props.item.PrecioVentaMinorista }}</td>
          <td>{{ props.item.StockActual }}</td>
          <td>{{ props.item.Marca}}</td>
          <td>{{ props.item.Categoria}}</td>
      <td></td>

        </template>
      </v-data-table>
            </v-flex>
           </v-layout>
         </v-container>
        </v-card-text>
       <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" @click="cerrarBuscadorProducto()">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
    <!-- fin productos -->
    <!-- dialogo cobro -->
   <v-dialog v-model="dialogocobro" max-width="500px">
       <v-card>
        <v-card-text>
         <v-container  grid-list-md>
           <v-layout wrap>
              <v-row>
                 <v-col cols="12" sm="12" md="12">
                   <h2  style=" font-size: 18pt;">{{fromatodemoneda(vFacturacion.DetalleCabecera.total)}}</h2>
                 </v-col>
                   <v-col cols="12" sm="12" md="12">
                   <v-text-field
                   v-model="pago"
                    style=" font-size: 18pt;"
                   id="separadorMiles"
                   @click="separador()"
                   @keyup="calcularVuelto()"
                     label="Monto de Pago"
                    ></v-text-field>
                 </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field
                   v-model="vuelto"
                   style=" font-size: 18pt;"
                     label="Vuelto"
                    ></v-text-field>
                 </v-col>
                 <v-col cols="6" sm="6" md="2"   class=" ml-5"  >
                <v-btn color="red " large @click="cobrar()" >Cobrar<v-icon>save</v-icon></v-btn>
                </v-col>
                <v-col cols="6" sm="6" md="2"  class=" ml-15"  >
                <v-btn color="pink " large @click="cancelar()" >Cancelar<v-icon>save</v-icon></v-btn>
                </v-col>
              </v-row>
           </v-layout>
         </v-container>
        </v-card-text>
       </v-card>
   </v-dialog>
    <!-- fin dialogo cobro -->
</v-form>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
//numero:'',
      // detalle de clientes

      razonsocial:'',
      ci:'',
      direccion:'',
      telefono:'',
      ruc:'',
      // fin
      valid: true,
      mensaje:'',
      search:'',
      pago:'',
      vuelto:'',
      notificacion:0,
      dialogocobro:false,
      dialogoProducto:false,
      dialogoCliente:false,
      token_configuration: [],
    montoRules: [(v) => !!v || "Monto requerido"],

    cabeceraDetalles:[
        { text: 'Borrar', value: 'borrar', sortable: false,class:"subtitle-1 text-uppercase green accent-5"},
        { text: 'Codigo Producto', value: 'codigoproducto', sortable: false,class:"subtitle-1 text-uppercase green accent-5"},
        // { text: 'codigoimpuesto', value: 'codigoimpuesto', sortable: false, align: ' d-none'},
        { text: 'Descripciones', value: 'descripcion', sortable: false,class:"subtitle-1 text-uppercase green accent-5"},
        { text: 'Cantidad', value: 'cantidad', sortable: false,class:"subtitle-1 text-uppercase green accent-5"},
        { text: 'Precio', value: 'precio', sortable: false,class:"subtitle-1 text-uppercase green accent-5"},
        { text: 'Sub-Total', value: 'subtotal', sortable: false,class:"subtitle-1 text-uppercase green accent-5" },
      ],
    cabeceraCliente: [
        { text: "Opcion", value: "opcion", sortable: true,class:"primary " },
        { text: "Codigo", value: "CodigoCliente", sortable: true, class:"primary" },
        { text: "Razon Social", value: "RazonSocial", sortable: true ,class:"primary subtitle-1 text-uppercase"},
        { text: "Cedula", value: "Cedula", sortable: true,class:"primary subtitle-1 text-uppercase" },
        { text: "RUC", value: "Ruc", sortable: false,class:"primary subtitle-1 text-uppercase" },
        { text: "Dirección", value: "Direccion", sortable: false,class:"primary subtitle-1 text-uppercase" },
        { text: "Teléfono", value: "Telefono", sortable: false,class:"primary subtitle-1 text-uppercase" },        
      ],
    cabeceraProducto: [
         { text: "Opciones", value: "opcion", sortable: false,class:"primary subtitle-1 text-uppercase "  },
        { text: "Codigo", value: "CodigoProducto", sortable: true,class:"primary subtitle-1 text-uppercase "  },
        { text: "C. de Barra", value: "CodigoBarra", sortable: false,class:"primary subtitle-1 text-uppercase "  },
        { text: "Descripcion", value: "Descripcion", sortable: false,class:"primary subtitle-1 text-uppercase "  },
        { text: "Precio Venta",value: "PrecioVentaMinorista",sortable: false,class:"primary subtitle-1 text-uppercase "},
        { text: "Stock Actual", value: "StockActual", sortable: false,class:"primary subtitle-1 text-uppercase " },
        { text: "Marca", value: "Marca", sortable: false,class:"primary subtitle-1 text-uppercase"  },
        { text: "Categoria", value: "Categoria", sortable: false,class:"primary subtitle-1 text-uppercase "  },
        
      ],
    };

  },
 
  mounted() {
    let header = { "auth-token": this.$store.state.token };
     this.token_configuration = { headers: header };
     this.$store.state.vFacturacion.Cabecera.CodigoUsuario= this.$store.state.usuario.codigo
     this.$store.dispatch("getValidarApertura", this.token_configuration);
     this.$store.state.vFacturacion.PuntoExpedicion=this.$store.state.usuario.PuntoExpedicion
     this.$store.state.vFacturacion.CodigoSucursal=this.$store.state.usuario.CodigoSucursal
     this.$store.dispatch("getCondicion", this.token_configuration);
     this.$store.dispatch("getDocumento", this.token_configuration);
      this.$store.state.vFacturacion.Cabecera.CodigoTiposDocumento=2
      this.$store.dispatch("getNumeroTimbrado", this.token_configuration);
      this.CargarCliente();
      this.$store.state.vFacturacion.DatosOrden.numero = this.$route.params.numero;
      console.log(this.$route.params.numero)
      if(this.$route.params.numero != null)
      {
      this.$store.dispatch("CapturarOrdenTrabajo", this.token_configuration);
      this.razonsocial = this.$route.params.RazonSocial;
      this.$store.state.vFacturacion.Cabecera.CodigoCliente = this.$route.params.CodigoCliente;
      }

  },
  computed: {
    ...mapState(["vFacturacion","vCondicion","vDocumento","vCliente","vProducto"]),
     
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setApertura"]),
    },
    calcularTotal: function(){
      let resultado=0.0;
      for(var i=0;i<this.vFacturacion.DetalleCabecera.datosDetalle.length;i++){
        resultado=resultado+((this.vFacturacion.DetalleCabecera.datosDetalle[i].cantidad*this.vFacturacion.DetalleCabecera.datosDetalle[i].precio));
      }
      return resultado ;
    },
  },

  methods: {
    CargarCliente()
    {
      this.vFacturacion.Cabecera.CodigoCliente=0
      this.razonsocial="CLIENTE OCASIONAL"
      this.ruc="xxx"
      this.ci="xxx"
    },
    createFreshProveedor() {
      return {
            Monto:""
      };
    },
     fromatodemoneda(value) {
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    },

    validarTimbrado()
    {
      this.$store.state.vFacturacion.Cabecera.CodigoTiposDocumento=this.$refs.seleccionado.value.Codigo
      this.$store.dispatch("getNumeroTimbrado", this.token_configuration);
      this.vFacturacion.NumeroTimbrado=this.$store.state.vFacturacion.NumeroTimbrado;
      console.log("hola "+this.vFacturacion.NumeroTimbrado)
      
    },
    // inicio metodos clientes
    BuscadorCliente()
    {
      this.$store.dispatch("getClientes", this.token_configuration);
      this.dialogoCliente=true
    },
    agregarDatosCliente(data){

        this.$store.state.vFacturacion.Cabecera.CodigoCliente= data.CodigoCliente;
        this.razonsocial= data.RazonSocial;
        this.ci = data.Cedula;
        // this.direccion = data.Direccion;
        // this.telefono = data.Telefono;
        this.ruc = data.Ruc;

        this.cerrarDialogoCliente()
        
    },
    cerrarDialogoCliente(){
      this.dialogoCliente=false
    },
    // fin metodos clientes

    // inicio metodos de productos
    BuscadorProductos(){
        this.$store.dispatch("getProductos", this.token_configuration);
        this.dialogoProducto=true;
    },
    cerrarBuscadorProducto()
    {
      this.dialogoProducto=false;
    },
    agregarDatosProducto(data){

        this.$store.state.vFacturacion.DetalleCabecera.codigoproducto= data.CodigoProducto;
        this.$store.state.vFacturacion.DetalleCabecera.descripcion= data.Descripcion;
        this.$store.state.vFacturacion.DetalleCabecera.precio= data.PrecioVentaMinorista;
        this.$store.state.vFacturacion.DetalleCabecera.stockactual= data.StockActual;

        this.cerrarBuscadorProducto()
        
    },
    limpiarTodo()
    {
      return {
        codigoproducto:'',
        descripcion:'',
        cantidad:'',
        precio:'',
        subtotal:'',
        stockactual:'',
        total:'',
        datosDetalle:[]
      }
    },
    separador(){
        let separador = document.getElementById('separadorMiles');
        separador.addEventListener('input', (e) => {
        let entrada = e.target.value.split(','),
        parteEntera = entrada[0].replace(/\./g, ''),
        parteDecimal = entrada[1],
        salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        e.target.value = salida + (parteDecimal !== undefined ? ',' + parteDecimal : '');
        }, false);
    },
    calcularVuelto()
    {
     
      let resultado =this.fromatodemoneda( this.pago.split('.').join("") - this.vFacturacion.DetalleCabecera.total)
     this.vuelto= resultado
    },
    limpiarTabla()
    {
        this.vFacturacion.DetalleCabecera.datosDetalle=[]
    },
    limpiarDatosProductos()
    {
      this.vFacturacion.DetalleCabecera=this.limpiarTodo();
    },
    limpiarCobro()
    {
      this.vuelto=""
      this.pago=""
    },
     limpiarAgegarProductos() {
    this.vFacturacion.DetalleCabecera.codigoproducto=""
    this.vFacturacion.DetalleCabecera.descripcion=""
    this.vFacturacion.DetalleCabecera.cantidad=""
    this.vFacturacion.DetalleCabecera.precio=""
    this.vFacturacion.DetalleCabecera.stockactual=""

    },
    cancelar()
    {
      this.limpiarCobro()
      this.dialogocobro=false
    },
    cancelarTodo()
    {
      this.CargarCliente();
      this.vFacturacion.DatosOrden.numero=''
      this.limpiarDatosProductos()
      this.limpiarCobro()
     // this.dialogocobro=false
    },
    cargarDatosOrden()
    {
        //this.razonsocial =  this.vFacturacion.DetalleCabecera.datosDetalle[0].RazonSocial
       //  this.$store.state.vFacturacion.DetalleCabecera.datosDetalle[0].codigocliente
    },
    encuentra(){
      let sw=0;
      for (var i=0;i<this.vFacturacion.DetalleCabecera.datosDetalle.length;i++){
        if(this.vFacturacion.DetalleCabecera.datosDetalle[i].codigoproducto==this.vFacturacion.DetalleCabecera.codigoproducto){
         sw=true;
          this.vFacturacion.DetalleCabecera.datosDetalle.push(
            { cantidad:1+this.vFacturacion.DetalleCabecera.cantidad })
        }
      }
      console.log(sw)
      return sw;
    },

    agregarDatosTabla()
    {
       if (this.encuentra()==true){
              console.log('La recepcion ya ha sido agregada.');
            } else{
                  if(this.vFacturacion.DetalleCabecera.cantidad.length==0)
          {
        this.vFacturacion.DetalleCabecera.cantidad=1
        this.vFacturacion.DetalleCabecera.datosDetalle.push(
            {  
             
              codigoproducto:this.vFacturacion.DetalleCabecera.codigoproducto ,
              descripcion:this.vFacturacion.DetalleCabecera.descripcion,
              cantidad:this.vFacturacion.DetalleCabecera.cantidad,
              precio:this.vFacturacion.DetalleCabecera.precio,
              subtotal:this.vFacturacion.DetalleCabecera.precio*this.vFacturacion.DetalleCabecera.cantidad
            })
        this.limpiarAgegarProductos()
      }else{
         this.vFacturacion.DetalleCabecera.datosDetalle.push(
            {  
             
              codigoproducto:this.vFacturacion.DetalleCabecera.codigoproducto ,
              descripcion:this.vFacturacion.DetalleCabecera.descripcion,
              cantidad:this.vFacturacion.DetalleCabecera.cantidad,
              precio:this.vFacturacion.DetalleCabecera.precio,
              subtotal:this.vFacturacion.DetalleCabecera.precio*this.vFacturacion.DetalleCabecera.cantidad
            })
        this.limpiarAgegarProductos()
      }
      
            }
      
      
    },
     eliminarDetalle(arr,item){
      let i=arr.indexOf(item);
      if (i!= -1){
        arr.splice(i,1);
      }
  
    },
    // fin
    refrescarCondicion()
    {
      this.$store.dispatch("getCondicion", this.token_configuration);
    },
    refrescarDocumento()
    {
      //console.log(this.seleccionado = this.$refs.seleccionado.value.Codigo)
     this.$store.dispatch("getDocumento", this.token_configuration);
     

    },
    guardar()
    {
      this.validarTimbrado()
      this.dialogocobro=true;
      this.notificacion=0
    },
    cobrar(){
     if(this.vuelto>=0)
     {
      this.vFacturacion.Cabecera.CodigoSucursal=this.vFacturacion.CodigoSucursal;
      this.vFacturacion.Cabecera.NumeroTimbrado=this.vFacturacion.Cabecera.NumeroTimbrado;
      this.vFacturacion.Cabecera.PuntoExpedicion=this.vFacturacion.PuntoExpedicion;
      this.vFacturacion.Cabecera.CodigoUsuario=this.$store.state.usuario.codigo;
      this.vFacturacion.Cabecera.CodigoTiposDocumento=this.$refs.seleccionado.value.Codigo;
      this.vFacturacion.Cabecera.CodigoCondicion=this.$refs.condicion.value.CodigoCondicion;
      this.vFacturacion.Cabecera.CodigoSucursal=this.vFacturacion.CodigoSucursal;
      this.vFacturacion.Cabecera.numeroApertura=this.vFacturacion.numeroApertura;
      this.vFacturacion.Cabecera.CodigoFormasCobro=0; 
      this.$store
        .dispatch("guardarFactura", this.token_configuration)
        .then(this.registroExitoso,this.regitroError);
        this.$router.push({name:'Impresion_Factura'})
     }
    },
     registroExitoso(result) {
      
      this.CargarCliente();
      this.notificacion=1
      // this.limpiarDatosProductos()
      // this.limpiarCobro()
      this.dialogocobro=false
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
    reset () {
        this.$refs.form.reset()
      },

    separador(){
        let separador = document.getElementById('separadorMiles');
        separador.addEventListener('input', (e) => {
        let entrada = e.target.value.split(','),
        parteEntera = entrada[0].replace(/\./g, ''),
        parteDecimal = entrada[1],
        salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        e.target.value = salida + (parteDecimal !== undefined ? ',' + parteDecimal : '');
        }, false);
    }
  },
  // nuevo codigo
};
</script>
<style >
#texto{
 font-size: 40%;
}
</style>