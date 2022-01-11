<template>
<v-form  v-model="valid" ref="form">
    <v-card
    class="mx-auto"
    max-width="1000"
   >
      <v-card-text>
       <v-container grid-list-md>
        <v-layout align-center justify-center v-if="validar_apertura==0"> 
        <v-row>
        <v-col cols="12" sm="12" md="12">

          <v-alert class="primary">
              <h2><center>APERTURA CAJA<v-icon  style=" font-size: 48px; ">
store_mall_directory</v-icon></center></h2>         
          </v-alert>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            id="separadorMiles"
            outlined
            v-model="vApertura.Apertura.Monto"
            item-value="Monto"
            label="INGRESE MONTO DE LA APERTURA"
            placeholder="0"
            :rules="montoRules"
            @click="separador()"
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="2"  >
         <v-btn color="red " outlined large @click="guardar()" >ABRIR CAJA<v-icon>save</v-icon></v-btn>
        </v-col>
        <v-col cols="6" sm="6" md="2"  >
         <v-btn color="succes " outlined large  >CANCELAR<v-icon>not_interested</v-icon></v-btn>
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
      {{this.$store.state.vApertura.mensaje}}
    </v-alert>
        </v-col>
         </v-row>
        </v-layout>
         <!-- validar apertura -->
        <v-col cols=6 sm="6" md="12" v-if="validar_apertura==1">
            <v-alert 
            dismissible
            color="red"
            elevation="2"
            type="error"
            
           >
     El usuario tiene cierre y arqueo pendiente
    </v-alert>
        </v-col>
        <!--  fin validar apertura -->
       </v-container>
      </v-card-text>
    </v-card>
</v-form>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import axios from 'axios';
export default {
  data() {
    return {
      validar_apertura:0,
      valid: true,
      mensaje:'',
      notificacion:0,
      token_configuration: [],
    montoRules: [(v) => !!v || "Monto requerido"]
    };
  },
  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.validarApertura()
  },
  computed: {
    ...mapState(["vApertura"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setApertura"]),
    },
  },

  methods: {
  
    createFreshProveedor() {
      return {
            Monto:""
      };
    },

    reset () {
        this.$refs.form.reset()
      },
    limpiar() {
     this.vApertura.Apertura = this.createFreshProveedor();
     this.reset ();
      this.notificacion=0;
    },

    guardar() {

      if(this.$refs.form.validate()){
        this.$store.state.vApertura.Apertura.CodigoUsuario=this.$store.state.usuario.codigo
        console.log(this.vApertura.Apertura.Monto.split('.').join(""))
         this.$store
        .dispatch("guardarApertura", this.token_configuration)
        .then(this.registroExitoso, this.regitroError);
        console.log("soy el mesaje de guardar ")
        console.log(" voy a guardar")
      } 
    },
     validarApertura()
     {
        let me=this;
      let valor=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      let usuarioCajero = this.$store.state.usuario.codigo
      console.log(usuarioCajero)
      axios.get(`abrircaja/validar/${usuarioCajero}`,configuracion).then(function (response){
        valor=response.data;
        console.log(valor)
        if (valor.length==0){
          console.log("sin aperturas")
        }else{
            me.validar_apertura= valor[0].estado;
            console.log(me.validar_apertura)
        }
      
      }).catch(function(error){
        console.log(error);
      });
     },
    registroExitoso(result) {
      console.log("La operación fue correcta:", result);
       this.vApertura.Apertura = this.createFreshProveedor();
      this.notificacion=1
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
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