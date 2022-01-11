<template>
      <v-form v-model="valid" ref="form" lazy-validation>
    <v-card>
      <v-card-text>
       <v-container grid-list-md>
        <v-layout row wrap> 
           <v-flex xs12 sm12 md12 lg12 xl12>
            <v-text-field  @click="mostrarModalArticulos()" v-model="vOrden.observacionRecepcion"  outlined label="Observaciones de la recepcion ">
            </v-text-field>
          </v-flex>
         <template v-if="1==2">
             <v-flex xs2 sm2 md2 lg2 xl2>
            <v-text-field v-model="vOrden.Orden.numero"  outlined label="Codigo Recepcion ">
            </v-text-field>
          </v-flex>
         </template>
          <v-flex xs12 sm12 md6 lg6 xl6>
            <v-text-field v-model="vOrden.Orden.chapa" outlined  label="Numero de Chapa ">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md6 lg6 xl6>
               <v-menu
          ref="menu"
          v-model="fecha"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Fecha del Trabajo"
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
                outlined
                required
                :items="vMecanico.mecanicos"
                :item-text="item=>`${item.CodigoUsuario} ${item.Nombre} ${item.Apellido}`"
                item-value="CodigoUsuario"
                label="Mecanico a Cargo"
                v-model="vOrden.Orden.CodigoUsuario"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md8 lg8 xl8>
            <v-text-field v-model="vOrden.Orden.observacion"  outlined  label="Observacion del Trabajo Realizado">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm4 md10 lg10 xl10>
            <v-text-field v-model="descripcion"  @click="mostrarModalRepuestos()"  outlined label="Repuestos a Utilizar">
            </v-text-field>
          </v-flex>

           <v-flex xs12 sm2 md2 lg2 xl2  mt-1>
            <v-btn large  outlined color="red" @click="mostrarModalRepuestos()">
              <v-icon dark>add_task</v-icon>
            </v-btn>
          </v-flex>

         <v-flex xs12 sm12 md3 lg3 xl3>
            <v-text-field v-model="stock" disabled outlined   label="Stock Actual">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md4 lg4 xl4>
            <v-text-field v-model="cantidad" outlined label="Cantidad">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md3 lg2 xl2>
            <v-text-field v-model="precio"  outlined label="Precio">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm2 md2 lg2 xl2  mt-1>
            <v-btn outlined  
            color="pink accent-4"  
            large  
            label="Precio"
             @click="agregarTabla()">
              <v-icon>
                  playlist_add</v-icon>
            </v-btn>
          </v-flex>
         <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="codigoimpuesto" v-if="2==3" label="Impuesto">
            </v-text-field>
          </v-flex>
         <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="codigoproducto" v-if="2==3" label="cd producto">
            </v-text-field>
          </v-flex>
           <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="subtotal" v-if="2==3" label="cd producto">
            </v-text-field>
          </v-flex>
          <!--fin  -->
          <v-flex xs12 sm12 md12 lg12 xl12>
           <v-card>
              <v-data-table
                  :headers="cabeceraDetalles"
                  :items="vOrden.Orden.detalles"
                  class="elevation-1"
              >
              <template v-slot:[`item.borrar`]="{ item }">
                <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="pink darken-4"
                          @click="eliminarDetalle(vOrden.Orden.detalles,item)"
                        >
                          <v-icon dark>delete</v-icon>
                        </v-btn>
                      
                </template>
                  <template v-slot:items>
                  <td class="text-xs-center">{{item.codigoproducto}}</td>
                  <td class="text-xs-center" v-if="2==3" >{{item.codigoimpuesto}}</td>
                  <td class="text-xs-center">{{item.descripcion}}</td>
                  <td class="text-xs-center">{{(item.cantidad )}}</td>
                  <td class="text-xs-center" >{{item.precio}}</td>
                  <td  class="text-xs-center">{{ item.subtotal}}</td>
                  
                </template>
                <template slot="no-data">
                  <h3>No hay artículos agregados al detalle.</h3>
                </template>
              </v-data-table>
           </v-card>
              <v-flex class="text-xl">
                <strong><h2>TOTAL DEL TRABAJO:{{fromatodemoneda(subtotal=calcularTotal) }}</h2></strong>
              </v-flex>
        
          </v-flex>
            <v-flex xs12 sm12 md12 xl12 v-if="notificacion==1">
           <v-alert 
            
            dismissible
            close-icon="mdi-delete"
            color="light-blue accent-4"
            elevation="2"
            type="info"
            outlined
           >
      {{this.$store.state.vOrden.mensaje}}
    </v-alert>
         </v-flex>
          <v-flex xs2 sm12 md4 lg2 xl1 mr-7>
            <v-btn color="deep-purple darken-3"  outlined large @click="modal=!modal,limpiarCabecera()">Cancelar<v-icon>clear</v-icon></v-btn>
          </v-flex>
          <v-flex xs2 sm12 md4 lg2 xl1>
             <v-btn color="red "  outlined large  @click="guardar()">Guardar<v-icon>save</v-icon></v-btn>
          </v-flex>
     <!-- dialogo para agregar repuestos o mercaderias -->
        <v-dialog v-model="dialogrepuestos" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione una Repuesto</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraRepuesto"
                          :items="repuestos"
                          class="elevation-10"
                          :search="texto"
                      >
                         <template v-slot:[`item.opcion`]="{ item }">
                          <v-btn
                          id="bot"
                              class="mx-2"
                              large
                              block
                              color="orange"
                              @click="agregarDatosRepuesto(item)"
                                  >
                                    <v-icon dark>system_update_alt</v-icon>
                          </v-btn>    
                          </template>
                             <template v-slot:items>
                           <td>{{ props.item.CodigoProducto }}</td>
                          <td>{{ props.item.Descripcion }}</td>
                          <td>{{ props.item.PrecioVentaMinorista }}</td>
                          <td>{{ props.item.Marca }}</td>
                          <td>{{ props.item.StockActual }}</td>
                           <td>{{ props.item.Deposito }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- fin del dialogo para agregar repuestos -->
        <!-- dialogo para agregar recepciones -->
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione una Recepcion</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraRecepcion"
                          :items="recepciones"
                          class="elevation-10"
                          :search="texto"
                      >
                        <template v-slot:[`item.opcion`]="{ item }">
                          <v-btn
                              class="mx-2"
                              large
                              block
                              color="orange"
                               @click="agregarDetalle(item)"
                                  >
                                    <v-icon dark>add</v-icon>
                          </v-btn>    
                          </template>
                          <template v-slot:items>
                           <td>{{ props.item.numero }}</td>
                          <td>{{ props.item.chapa }}</td>
                          <td>{{ props.item.fechaentrada }}</td>
                          <td>{{ props.item.observaciones }}</td>
                          <td>{{ props.item.RazonSocial }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
       </v-layout>
    </v-container>
      </v-card-text>
    </v-card>
  </v-form>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapState } from "vuex";
export default {
  data(){
    return{
      valid: true,
      date: new Date().toISOString().substr(0, 10),
      fecha: false,
      dialog: false,
      dialogrepuestos:false,
      search:'',
      subtotal:'',
      notificacion:0,
      mensaje:'',
      ventas:[],
      recepcion:'',
      codigorecepcion:'',
      ordenes:[],
      orden:'',
      mecanico:'',
      mecanicos:[],
      repuestos:[],
      codigoproducto:'',
      cantidad:'',
      precio:'',
      stock:'',
      codigoimpuesto:'',
      descripcion:'',
      avisorden:'',
      headers: [
        
        { text: 'Opciones', value: 'opciones', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'Nro', value: 'numero', sortable: true, class: "cabecera colorCabecera--text" },
        { text: 'CHAPA  ', value: 'numerochapa', sortable: true,class: "cabecera colorCabecera--text",},
        { text: 'CLIENTE', value: 'RazonSocial', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'OBSERVACION ORDEN', value: 'observacionorden', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'OBSERVACION RECEPCION', value: 'observacionrecepcion', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'FECHA ORDEN', value: 'fechaemision', sortable: false,class: "cabecera colorCabecera--text"  },
         { text: 'FECHA RECEPCION', value: 'fechaentrada', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'ESTADO DEL TRABAJO', value: 'estadorden', sortable: false,class: "cabecera colorCabecera--text"  },
        // { text: 'Estado', value: 'estado', sortable: false  }
      ],

      cabeceraDetalles:[
        { text: 'Borrar', value: 'borrar', sortable: false,class:"error"},
        { text: 'Codigo Producto', value: 'codigoproducto', sortable: false,class:"error"},
        { text: 'codigoimpuesto', value: 'codigoimpuesto', sortable: false, align: ' d-none'},
        { text: 'Descripciones', value: 'descripcion', sortable: false,class:"error"},
        { text: 'Cantidad', value: 'cantidad', sortable: false,class:"error" },
        { text: 'Precio', value: 'precio', sortable: false,class:"error"},
        { text: 'Sub-Total', value: 'subtotal', sortable: false,class:"error"  },

        // { text: 'Descuento', value: 'descuento', sortable: false },
        // { text: 'Sub Total', value: 'subtotal', sortable: false  }
      ],
      detalles:[],
      total:0,
      recepciones:[],
      texto:'',
      cabeceraRecepcion: [
        { text: 'Seleccionar', value: 'opcion', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'CODIGO',value: 'numero', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'CHAPA',value: 'chapa', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'FECHA ENTRADA',value: 'fechaentrada', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'OBSERVACION',value: 'observaciones', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'CLIENTE',value: 'RazonSocial', sortable: true,class: "cabecera colorCabecera--text" },
        // { text: 'Estado', value: 'estado', sortable: false }
      ],
         cabeceraRepuesto: [
        { text: 'Seleccionar', value: 'opcion', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'CODIGO',value: 'CodigoProducto', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'DESCRIPCION',value: 'Descripcion', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'PRECIO VENTA',value: 'PrecioVentaMinorista', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'MARCA',value: 'Marca', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'STOCK ACTUAL',value: 'StockActual', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'DEPOSITO',value: 'Deposito', sortable: true,class: "cabecera colorCabecera--text" },
        // { text: 'Estado', value: 'estado', sortable: false }
      ],
    }
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
     this.$store.dispatch("getMecanicos", this.token_configuration);
  },
 computed: {
    ...mapState(["vOrden","vMecanico"]),
     modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setOrden"]),
    },
    calcularTotal: function(){
      let resultado=0.0;
      for(var i=0;i<this.vOrden.Orden.detalles.length;i++){
        resultado=resultado+((this.vOrden.Orden.detalles[i].cantidad*this.vOrden.Orden.detalles[i].precio));
      }
      return resultado;
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogrepuestos(val){
      val || this.close()
    }
  },
  created () {
     this.listar();
     this.selecOrden();
     this.selectEstado();
  },
  methods: {

    fromatodemoneda(value) {
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    selecOrden(){
      let me=this;
      let ordenArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('estadotrabajos/',configuracion).then(function (response){
        ordenArray=response.data;
        ordenArray.map(function(x){
          me.ordenes.push({text:x.codigo +" "+x.descripcion, value:x.CodigoCliente});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
     selectEstado(){
      let me=this;
      let personaArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('estadorecepciones/',configuracion).then(function (response){
        personaArray=response.data;
        personaArray.map(function(x){
          me.estadorecepciones.push({text:x.descripcion,value:x.codigo});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    capturarcodigo(texto){
       const cod = texto.split(' ')[0]
       return cod
    },

  
    agregarDetalle(data){
      this.errorArticulo=null;
      if (this.encuentra(data.chapa)==true){
        this.errorArticulo='La recepcion ya ha sido agregada.';
      }
      else{
       console.log( data.chapa)
        this.vOrden.Orden.numero= data.numero;
        this.vOrden.Orden.chapa=data.chapa;
        this.vOrden.observacionRecepcion=data.observaciones
        this.codigo='';
      }
      this.close();
    },
     agregarDatosRepuesto(data){

        this.codigoproducto= data.CodigoProducto;
        this.descripcion=data.Descripcion;
        this.codigoimpuesto=data.CodigImpuesto;
        this.stock=data.StockActual;
        this.precio=data.PrecioVentaMinorista;

        this.close();
    },
    limpiarDatosRepuesto(){
      this.descripcion='';
      this.cantidad='';
      this.precio='';
      this.stock='';
    },
    agregarNuevo(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      console.log(this.$store.state.usuario)         
      axios.post('orden/insertardetalle',
          {
              'CodigoSucursal':this.$store.state.usuario.CodigoSucursal,
              'PuntoExpedicion':this.$store.state.usuario.PuntoExpedicion,
              'numero':this.codigorecepcion,
              'codigoestadoorden':this.capturarcodigo(this.orden),
              'observacion': this.avisorden,
              'codigoproducto':this.codigoproducto,
              'codigomecanico':this.capturarcodigo(this.mecanico),
              'codigoimpuesto':this.codigoimpuesto,
              'orden': this.orden,
              'descripcion':this.descripcion,
              'cantidad':this.cantidad,
              'precio':this.precio,
          },configuracion)
          .then(function(response){
           // me.limpiarDetalle();
          })
          .catch(function(error){
            console.log(error);
          });
    },
     agregarTabla(){
       this.errorArticulo=null;
       if(this.codigoproducto==''){
         this.errorArticulo='DEBE DE SELECCIONAR UN REPUESTO';
         return;
       }
      if (this.encuentra(this.codigoproducto)==true){
            this.errorArticulo='El artículo ya ha sido agregado.';
       }else{
            if(this.bandera==1){
                this.agregarNuevo()
                this.vOrden.Orden.detalles.push(
            {  
              codigoproducto:this.codigoproducto,
              codigoimpuesto:this.codigoimpuesto,
              orden: this.orden,
              descripcion:this.descripcion,
              cantidad:this.cantidad,
              precio:this.precio,
              subtotal:this.precio*this.cantidad
            }
        );
            }else{
              {
          this.vOrden.Orden.detalles.push(
            {  
              codigoproducto:this.codigoproducto,
              codigoimpuesto:this.codigoimpuesto,
              orden: this.orden,
              descripcion:this.descripcion,
              cantidad:this.cantidad,
              precio:this.precio,
               subtotal:this.precio*this.cantidad
            }
        );
        this.limpiarDetalle();
       }
            }
       }
        console.log(this.detalles)
        this.limpiarDatosRepuesto()
    },
    encuentra(codigoproducto){
      let sw=0;
      for (var i=0;i<this.detalles.length;i++){
        if(this.detalles[i].codigoproducto==codigoproducto){
          sw=true;
        }
      }
      return sw;
    },
    eliminarDetalle(arr,item){
      // if(this.bandera==1){
      // let me=this;
      // let header={ "auth-token" : this.$store.state.token};
      // let configuracion= {headers : header};
      // axios.put('orden/eliminar',
      // {
      //  'codigoproducto':item.codigoproducto,
      //  'cantidad':item.cantidad,
      //  'codigorecepcion':this.codigorecepcion
      // },configuracion,).then(function (response){
    
      // }).catch(function(error){
      //   console.log(error);
      // });
      // }
      let i=arr.indexOf(item);
      if (i!= -1){
        arr.splice(i,1);
      }
  
    },
    listarRecepcion(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/recepcion',configuracion).then(function (response){
        me.recepciones=response.data;
        console.log(me.recepciones)
      }).catch(function(error){
        console.log(error);
      });
    },
    listarRepuesto(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/repuesto',configuracion).then(function (response){
        me.repuestos=response.data;
        console.log(me.repuestos)
      }).catch(function(error){
        console.log(error);
      });
    },
     editar(item){
      this.bandera=1;
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/update/'+item.numero,configuracion).then(function (response){
        me.detalles=response.data;
        for (let i in me.detalles){
         me.chapa=me.detalles[i].numerochapa
         me.codigorecepcion=me.detalles[i].numero
         me.orden=me.detalles[i].estadorden
         me.avisorden=me.detalles[i].observacion
          me.observacion=me.detalles[i].observaciones
         // console.log(me.cliente)
        }
        me.mostrarNuevo();
      }).catch(function(error){
        console.log(error);
      });
    },
    mostrarModalArticulos(){
      this.dialog=1;
      this.listarRecepcion();
    },
    mostrarModalRepuestos(){
        this.dialogrepuestos=1;
       this.listarRepuesto();
    },
    listarDetalles(){
      console.log("cliente 2")
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      cliente:this.cliente;
      console.log(cliente)
       axios.get('rvehiculo/'+cliente,configuracion).then(function (response){
        me.detalles=response.data.detalles;
      }).catch(function(error){
        console.log(error);
      });
    },

    entregado(item) {
      let me = this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      this.numero = item.numero;
      console.log(this.numero);
      axios
          .put("orden/entregado",{ numero: this.numero},configuracion)
          .then(function(response) {
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
            console.log("error");
          });
    },
    listar(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/listar/',configuracion).then(function (response){
        me.ventas=response.data;
      }).catch(function(error){
        console.log(error);
      });

    },
    limpiarDetalle(){
      this.codigoimpuesto='';
      this.codigoproducto='';
      this.stock='';
      this.precio='';
      this.cantidad='';
      this.descripcion='';
    },
 
    mostrarNuevo(){
      this.verNuevo=1;
    },
    ocultarNuevo(){
      this.limpiar()
    },
    guardar(){
        this.$store.state.vOrden.Orden.codigosucursal=this.$store.state.usuario.CodigoSucursal,
        this.$store.state.vOrden.Orden.puntoexpedicion=this.$store.state.usuario.PuntoExpedicion,
        this.$store.state.vOrden.Orden.recibidopor=this.$store.state.usuario.codigo
        //detalles
        this.$store.state.vOrden.Orden.codigosucursal=this.$store.state.usuario.CodigoSucursal
        this.$store.state.vOrden.Orden.puntoexpedicion=this.$store.state.usuario.PuntoExpedicion
        this.$store.state.vOrden.Orden.fechaemision=this.date
         if(this.$store.state.vOrden.editar_item == false){
            this.$store
        .dispatch("guardarOrden", this.token_configuration)
        .then(this.registroExitoso, this.regitroError);
         }
    },
        registroExitoso(result) {
       this.notificacion=1;
        this.limpiarCabecera();   
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
      limpiar() {
      return {
        codigosucursal:"",
        puntoexpedicion:"",
        numero:"",
        fechaemision:"",
        codigoestadoorden:"",
        observacion:"",
        CodigoUsuario:"",
        chapa:"",
        fechaemision:"",
        detalles:[] 
      };
      this.notificacion=0;
    },
    limpiarCabecera(){
      this.vOrden.Orden=this.limpiar()
      this.limpiarDetalle()
      this.vOrden.observacionRecepcion=''
    },
    limpiarDetalle() {
      return {
            km:"",
            chapa:"",
            codigovehiculo:"",
            codigonivelcombustible:"",
      };
    },
    close () {
      this.dialog = false;
      this.dialogrepuestos=false;
    }
  }
}
</script>
