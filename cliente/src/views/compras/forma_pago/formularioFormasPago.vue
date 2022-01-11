<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title>
        <span class="headline">Registro Formas Pago.</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md12>
              <v-text-field
                v-model="fpagos.fpago.Descripcion"
                :rules="nameRules"
                label="Descripción"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md12>
              <v-text-field
                v-model="fpagos.fpago.Plazo"
                :rules="plazoRules"
                :counter="3"
                label="Plazo"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md12>
              <v-text-field
                v-model="fpagos.fpago.Dias"
                :counter="3"
                :rules="plazoRules"
                label="Días"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-checkbox
                v-model="fpagos.fpago.Estado"
                label="Estado del pago"
              ></v-checkbox>
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
          @click="(modal = !modal), (notificacion=0)"
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
import { mapState } from "vuex";
export default {
  data: () => ({
    valid: false,
    token_configuration: [],
    mensaje: "",
    notificacion: 0,
    plazoRules: [
      (v) => !!v || "Éste campo es necesario",
      (v) =>
        v.length <= 3 ||
        "Éste campo no puede tener más de 3 caracteres y/o números",
    ],
    nameRules: [(v) => !!v || "Éste campo es necesario"],
  }),
  mounted(){
      let header = { "auth-token": this.$store.state.token };
      this.token_configuration = { headers: header };
  },
  computed: {
    ...mapState(["fpagos"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
  },
  methods:{
      guardar(){
          if(this.valid){
              this.$store.dispatch("guardarFormaPago",this.token_configuration)
              .then(() => {
                  this.mensaje = "Registro guardado.";
                  this.notificacion = 1;
              }).catch((err) => {
                  this.mensaje = "Error al guardar registro: ", err;
              });
          }
      }
  }
};
</script>