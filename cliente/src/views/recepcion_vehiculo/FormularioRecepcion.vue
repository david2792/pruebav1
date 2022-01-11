<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card>
      <v-card-title>
        <span class="headline">Recepcion de  Vehiculo</span>
      </v-card-title>
      <v-card-text>
     <v-container grid-list-md>
           <v-layout wrap>
           <v-layout row wrap>
          <v-flex xs8 sm8 md8 lg8 xl8>
            <v-autocomplete
             outlined
                required
                :items="vCliente.clientes"
                :item-text="item=>`${item.CodigoCliente} ${item.RazonSocial}`"
                item-value="CodigoCliente"
                label="Cliente"
                :rules="clienteRules"
                v-model="vRecepcion.Recepcion.codigocliente"
            ></v-autocomplete>  
          </v-flex>
           <v-flex xs2 sm2 md4 lg4 xl4>
               <v-btn  class="ma-2" color="pink"  @click="abrirBusqueda()">Buscar
                <v-icon  right>search</v-icon>
            </v-btn>
           </v-flex>
            <v-flex xs12 sm12 md4 lg4 xl4>
            <v-text-field  :rules="codigoRules" outlined v-model="vRecepcion.Recepcion.codigovehiculo" label="Codigo Vehiculo"></v-text-field>
          </v-flex>
            <v-flex xs12 sm12 md4 lg4 xl4>
            <v-text-field  :rules="chapaRules" outlined v-model="vRecepcion.Recepcion.chapa" label="Chapa Vehiculo"></v-text-field>
          </v-flex>
           <v-flex xs12 sm12 md4 lg4 xl4>
            <v-autocomplete
                outlined
                required
                :items="vNivel.niveles"
                :item-text="item=>`${item.codigonivelcombustible} ${item.descripcion}`"
                item-value="codigonivelcombustible"
                label="Nivel Combustible"
                :rules="nivelRules"
                v-model="vRecepcion.Recepcion.codigonivelcombustible"
            ></v-autocomplete> 
          </v-flex>
           <v-flex xs12 sm12 md4 lg4 xl4>
            <v-text-field  :rules="kmRules" outlined v-model="vRecepcion.Recepcion.km" label="Km de Entrada"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md10 lg8 xl8>
            <v-text-field  :rules="observacionRules" outlined v-model="vRecepcion.Recepcion.observaciones" label="Observacion"></v-text-field>
          </v-flex>
        </v-layout>
     </v-layout>
          </v-container>
      </v-card-text>
      <v-card-actions>
      <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" dark color="teal darken-4" @click="modal=!modal, limpiar()">
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
        <v-btn class="mb-2"  color="blue darken-1" @click="guardar()">
          Guardar
          <v-icon>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-card-actions>
       <v-flex xs12 sm12 md12 xl12 v-if="notificacion==1">
           <v-alert 
            
            dismissible
            close-icon="mdi-delete"
            color="light-blue accent-4"
            elevation="2"
            type="info"
            outlined
           >
      {{this.$store.state.vRecepcion.mensaje}}
    </v-alert>
         </v-flex>
    </v-card>
   <v-dialog v-model="busqueda" max-width="1000px">
           <v-card>
            <v-card-title>
              <span class="headline">Seleccione un Vehiculo</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraArticulos"
                          :items="vRecepcion.aux"
                      >
                       <template v-slot:[`item.seleccionar`]="{ item }">
                        <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    color="pink darken-4"
                                       @click="agregarDetalle(item)"
                                >
                                    <v-icon dark>mdi-pencil</v-icon>
                                </v-btn>
                        </template>
                     <template v-slot:items>
                        
                           <td>{{ props.item.codigo }}</td>
                          <td>{{ props.item.chapa }}</td>
                          <td>{{ props.item.marca }}</td>
                          <td>{{ props.item.modelo }}</td>
                          <td>{{ props.item.transmicion }}</td>
                          <td>{{ props.item.color }}</td>
                          <td>{{ props.item.chasis }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
         
        <v-card-actions>
          <v-btn color="blue darken-1"  @click="cerrarBusqueda()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
   </v-dialog>
  </v-form>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import axios from 'axios';
export default {
  data() {
    return {
      busqueda:false,
      articulos:[],
      texto:'',
      cabeceraArticulos: [
        { text: 'Seleccionar', value: 'seleccionar', sortable: false},
         { text: 'CODIGO',value: 'codigovehiculo', sortable: false},
        { text: 'CHAPA',value: 'chapa', sortable: false },
        { text: 'MARCA',value: 'marca', sortable: false },
        { text: 'MODELO',value: 'modelo', sortable: true },
        { text: 'TRACCION',value: 'transmicion', sortable: true},
        { text: 'COLOR',value: 'color', sortable: false},
        { text: 'OBSERVACION', value: 'chasis', sortable: false},
      ],
      busqueda: false,
      valid: true,
      mensaje:'',
      notificacion:0,
      token_configuration: [],
    clienteRules: [(v) => !!v || "Cliente requerido"],
    codigoRules: [(v) => !!v || "Codigo requerido"],
    nivelRules: [(v) => !!v || "Nivel requerido"],
    kmRules: [(v) => !!v || "Km requerido"],
    chapaRules: [(v) => !!v || "chapa requerido"],
    observacionRules: [(v) => !!v || "Observacion requerido"],
    };
  },

  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getClientes", this.token_configuration);
    this.$store.dispatch("getNiveles", this.token_configuration);

  },
  computed: {
    ...mapState(["vCliente","vNivel", "vRecepcion","vVehiculo"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setRecepcion"]),
    },
  },

  methods: {
        agregarDetalle(data){
        this.errorArticulo=null;
        this.vRecepcion.Recepcion.codigovehiculo= data.codigovehiculo;
        this.vRecepcion.Recepcion.chapa=data.chapa;
        this.busqueda=false
    },
    abrirBusqueda()
    {
    this.$store.dispatch("getBuscadorRecepcion", this.token_configuration)
    this.busqueda=true
    },
    cerrarBusqueda()
    {
      this.busqueda=false
    },
    limpiarRecepcion() {
      return {
            CodigoCliente:"",
            observaciones:"",
            chapa:"",
            codigovehiculo:"",
  
            aux:[]
      };
    },
    limpiarDetalle() {
      return {
            km:"",
            chapa:"",
            codigovehiculo:"",
            codigonivelcombustible:"",
      };
    },
    capturarcodigo(texto) {
      const cod = texto.split(" ")[0];
      return cod;
    },
    reset () {
        this.$refs.form.reset()
      },
    limpiar() {
     this.vRecepcion.Recepcion = this.limpiarRecepcion();
  //  this.vRecepcion.detalleRecepcion = this.limpiarDetalle();
     this.notificacion=0
     //this.reset()
    },
    enviarCliente(){
         this.$store
        .dispatch("getBuscador", this.token_configuration)
        .then(this.registroExitoso(), this.regitroError());
    },
    guardar() {

      if(this.$refs.form.validate()){
        this.$store.state.vRecepcion.Recepcion.codigosucursal=this.$store.state.usuario.CodigoSucursal,
        this.$store.state.vRecepcion.Recepcion.puntoexpedicion=this.$store.state.usuario.PuntoExpedicion,
        this.$store.state.vRecepcion.Recepcion.recibidopor=this.$store.state.usuario.codigo
        //detalles
        this.$store.state.vRecepcion.Recepcion.codigosucursal=this.$store.state.usuario.CodigoSucursal
        this.$store.state.vRecepcion.Recepcion.puntoexpedicion=this.$store.state.usuario.PuntoExpedicion
         if(this.$store.state.vRecepcion.editar_item == false){
            this.$store
        .dispatch("guardarRecepcion", this.token_configuration)
        .then(this.registroExitoso, this.regitroError);
       
         }else{
           this.$store.state.vRecepcion.Recepcion.codigosucursal=this.$store.state.usuario.CodigoSucursal,
        this.$store.state.vRecepcion.Recepcion.puntoexpedicion=this.$store.state.usuario.PuntoExpedicion,
        this.$store.state.vRecepcion.Recepcion.recibidopor=this.$store.state.usuario.codigo
        //detalles
        this.$store.state.vRecepcion.Recepcion.codigosucursal=this.$store.state.usuario.CodigoSucursal
        this.$store.state.vRecepcion.Recepcion.puntoexpedicion=this.$store.state.usuario.PuntoExpedicion
        this.$store
        .dispatch("guardarRecepcion", this.token_configuration)
        .then(this.registroExitoso(), this.regitroError());
       //  this.$store.state.vCliente.editar_item =false
          console.log("voy a modificar")
        // this.limpiar();
         }
      
      }
        
    },
    registroExitoso(result) {
      //  this.vRecepcion.Recepcion = this.limpiarRecepcion();
      //  this.vRecepcion.detalleRecepcion = this.limpiarDetalle();
      this.limpiar()
     // this.reset()
      this.notificacion=1
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
  },
  // nuevo codigo
};
</script>