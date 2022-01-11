<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card>
      <v-card-title>
        <span class="headline">Registro Cliente</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field
                outlined
                v-model="vCliente.Cliente.RazonSocial"
                autofocus
                :rules="RazonRules"
                required
                label="Razon Social"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                outlined
                v-model="vCliente.Cliente.Ruc"
                :rules="RucRules"
                label="RUC"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                outlined
                v-model="vCliente.Cliente.Cedula"
                :rules="CedulaRules"
                required
                label="Número Documento"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                outlined
                v-model="vCliente.Cliente.Direccion"
                :rules="DireccionRules"
                required
                label="Dirección"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                outlined
                v-model="vCliente.Cliente.Telefono"
                :rules="TelefonoRules"
                required
                label="Teléfono"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                outlined
                v-model="vCliente.Cliente.Email"
                :rules="EmailRules"
                required
                label="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-autocomplete
                outlined
                :rules="CiudadRules"
                required
                :items="ciudad.Ciudades"
                :item-text="(item) => `${item.CodigoCiudad} ${item.Ciudad}`"
                item-value="CodigoCiudad"
                label="Ciudad"
                v-model="vCliente.Cliente.CodigoCiudad"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn
          class="mb-2"
          dark
          color="red accent-3"
          @click="(modal = !modal), limpiar()"
        >
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
        <v-btn class="mb-2" color="blue darken-1" @click="guardar()">
          Guardar
          <v-icon>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-card-actions>
      <v-flex xs12 sm12 md12 xl12 v-if="notificacion == 1">
        <v-alert
          dismissible
          close-icon="mdi-delete"
          color="light-blue accent-4"
          elevation="2"
          type="info"
          outlined
        >
          {{ mensaje }}
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
      mensaje: "",
      notificacion: 0,
      token_configuration: [],
      RazonRules: [(v) => !!v || "Razon Social requerido"],
      RucRules: [(v) => !!v || "Razon Social requerido"],
      CedulaRules: [(v) => !!v || "Ruc requerido"],
      DireccionRules: [(v) => !!v || "Direccion requerido"],
      TelefonoRules: [(v) => !!v || "Telefono requerido"],
      EmailRules: [(v) => !!v || "Email requerido"],
      CiudadRules: [(v) => !!v || "Ciudad requerido"],
    };
  },
  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getCiudades", this.token_configuration);
  },
  computed: {
    ...mapState(["ciudad", "vCliente"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setCliente"]),
    },
  },

  methods: {
    createFreshProveedor() {
      return {
        RazonSocial: "",
        CodigoCliente: "",
        Cedula: "",
        Ruc: "",
        Direccion: "",
        Telefono: "",
        CodigoCiudad: "",
        Email: "",
      };
    },
    capturarcodigo(texto) {
      const cod = texto.split(" ")[0];
      return cod;
    },
    reset() {
      this.$refs.form.reset();
    },
    limpiar() {
      this.vCliente.Cliente = this.createFreshProveedor();
      this.reset();
      this.notificacion = 0;
    },

    guardar() {
      if (this.$refs.form.validate()) {
        console.log(this.$store.state.vCliente.editar_item);
        if (this.$store.state.vCliente.editar_item == false) {
          this.$store
            .dispatch("guardarCliente", this.token_configuration)
            .then(this.registroExitoso, this.regitroError);
          console.log("soy el mesaje de guardar ");
          // this.$store.state.vCliente.editar_item =false
          this.mensaje = "Registro Guardado";
          console.log(" voy a guardar");
          // this.limpiar();
        } else {
          this.$store
            .dispatch("guardarCliente", this.token_configuration)
            .then(this.registroExitoso, this.regitroError);
          this.mensaje = "Registro Modificado";
          //  this.$store.state.vCliente.editar_item =false
          console.log("voy a modificar");
          // this.limpiar();
        }
      }
    },
    registroExitoso(result) {
      console.log("La operación fue correcta:", result);
      this.vCliente.Cliente = this.createFreshProveedor();
      this.notificacion = 1;
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
  },
  // nuevo codigo
};
</script>