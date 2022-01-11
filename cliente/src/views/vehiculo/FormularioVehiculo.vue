<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card>
      <v-card-title>
        <span class="headline">Registro Vehiculo</span>
      </v-card-title>
      <v-card-text>
     <v-container grid-list-md>
           <v-layout wrap>
           <v-layout row wrap>
          <v-flex xs12 sm8 md8 lg8 xl8>
            <v-autocomplete
             outlined
                required
                :items="vCliente.clientes"
                :item-text="item=>`${item.CodigoCliente} ${item.RazonSocial}`"
                item-value="CodigoCliente"
                label="Cliente"
                :rules="clienteRules"
                v-model="vVehiculo.Vehiculo.CodigoCliente"
            
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
             :rules="transmisionRules"
                outlined
                required
                :items="vTransmicion.transmiciones"
                :item-text="item=>`${item.codigotransmision} ${item.nombre}`"
                item-value="codigotransmision"
                label="Transmicion"
                v-model="vVehiculo.Vehiculo.codigotransmision"
              ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
           <v-autocomplete
            :rules="marcaRules"
                outlined
                required
                :items="vMarcaVehiculo.marcas"
                :item-text="item=>`${item.codigomarca} ${item.nombre}`"
                item-value="codigomarca"
                label="Marca Vehiculo"
                v-model="vVehiculo.Vehiculo.codigomarca"
              ></v-autocomplete>
          </v-flex>
           <v-flex xs12 sm4 md4 lg4 xl4>
           <v-autocomplete
            :rules="modeloRules"
                outlined
                required
                :items="vModelo.modelos"
                :item-text="item=>`${item.codigomodelo} ${item.nombre}`"
                item-value="codigomodelo"
                label="Modelo"
                v-model="vVehiculo.Vehiculo.codigomodelo"
              ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
           <v-autocomplete
            :rules="colorRules"
                outlined
                required
                :items="vColor.colores"
                :item-text="item=>`${item.codigocolor} ${item.nombre}`"
                item-value="codigocolor"
                label="Color"
                v-model="vVehiculo.Vehiculo.codigocolor"
              ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field  :rules="chapaRules" outlined v-model="vVehiculo.Vehiculo.chapa" label="N. Chapa"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md8 lg8 xl8>
            <v-text-field  :rules="chasisRules" outlined v-model="vVehiculo.Vehiculo.chasis" label="Numero Chasis"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>    
             <v-text-field  :rules="observacionRules" outlined v-model="vVehiculo.Vehiculo.observacion" label="Observacion"></v-text-field>
          </v-flex>
        </v-layout>
     </v-layout>
          </v-container>
      </v-card-text>
      <v-card-actions>
      <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" dark color="red accent-3" @click="modal=!modal, limpiar()">
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
      {{this.$store.state.vVehiculo.mensaje}}
    </v-alert>
         </v-flex>
    </v-card>
  </v-form>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      valid: true,
      mensaje:'',
      notificacion:0,
      token_configuration: [],
    clienteRules: [(v) => !!v || "Cliente requerido"],
    marcaRules: [(v) => !!v || "Marca requerido"],
    modeloRules: [(v) => !!v || "Modelo requerido"],
    transmisionRules: [(v) => !!v || "Transmicion requerido"],
    colorRules: [(v) => !!v || "Color requerido"],
    chapaRules: [(v) => !!v || "chapa requerido"],
    observacionRules: [(v) => !!v || "Observacion requerido"],
    chasisRules: [(v) => !!v || "Chasis requerido"],
    };
  },
  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getTransmiciones", this.token_configuration);
    this.$store.dispatch("getClientes", this.token_configuration);
    this.$store.dispatch("getMarcas", this.token_configuration);
    this.$store.dispatch("getColores", this.token_configuration);
    this.$store.dispatch("getModelos", this.token_configuration);
  },
  computed: {
    ...mapState(["vTransmicion", "vCliente","vColor","vMarcaVehiculo","vModelo", "vVehiculo"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setVehiculo"]),
    },
  },

  methods: {
    createFreshProveedor() {
      return {
            CodigoCliente:"",
            codigomarca: "",
            codigomodelo:  "",
            codiogotransmision: "",
            codigocolor: "",
            chapa: "",
            observacion: "",
            chasis: "",
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
     this.vVehiculo.Vehiculo = this.createFreshProveedor();
     this.reset ();
      this.notificacion=0;
    },

    guardar() {

      if(this.$refs.form.validate()){
          // this.$store.state.vVehiculo.Vehiculo.codigomodelo =this.capturarcodigo(this.vVehiculo.Vehiculo.codigomodelo)
          // this.$store.state.vVehiculo.Vehiculo.codigomarca =this.capturarcodigo(this.vVehiculo.Vehiculo.codigomarca)
          // this.$store.state.vVehiculo.Vehiculo.codigotransmision =this.capturarcodigo(this.vVehiculo.Vehiculo.codigotransmision)
          // this.$store.state.vVehiculo.Vehiculo.codigocolor =this.capturarcodigo(this.vVehiculo.Vehiculo.codigocolor)
          // console.log("codigo " +this.$store.state.vVehiculo.codigomarca)
         if(this.$store.state.vVehiculo.editar_item == false){
            this.$store
        .dispatch("guardarVehiculo", this.token_configuration)
        .then(this.registroExitoso, this.regitroError);
        console.log("soy el mesaje de guardar ")
       // this.$store.state.vCliente.editar_item =false

        console.log(" voy a guardar")
       // this.limpiar();
         }else{
        this.$store
        .dispatch("guardarVehiculo", this.token_configuration)
        .then(this.registroExitoso(), this.regitroError());
       //  this.$store.state.vCliente.editar_item =false
          console.log("voy a modificar")
        // this.limpiar();
         }
      
      }
        
    },
    registroExitoso(result) {
      console.log("La operación fue correcta:", result);
       this.vVehiculo.Vehiculo = this.createFreshProveedor();
      this.notificacion=1
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
  },
  // nuevo codigo
};
</script>