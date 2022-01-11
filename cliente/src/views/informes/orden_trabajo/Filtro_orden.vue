<template>
  <v-card>
    <v-card-title>Orden de trabajo</v-card-title>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 sm12 md12>
          <v-autocomplete
            autofocus
            v-model="informe_ot.numerochapa"
            :items="informe_ot.orden_done"
            :item-text="(item) => `${item.RazonSocial} - ${item.numerochapa}`"
            item-value="numerochapa"
           
            :rules="clienteRules"
          ></v-autocomplete>
        </v-flex>
        <!-- Opción de filtrado -->
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12>
          <v-radio-group v-model="informe_ot.estadoorden" row>
            <v-radio
              color="red"
              @click="estadoorden"
              label="Pendientes"
              value="1"
            ></v-radio>
            <v-radio
              color="success"
              @click="estadoorden"
              label="Completados"
              value="2"
            ></v-radio>
            <v-radio
              color="primary"
              @click="estadoorden"
              label="Ambos"
              value="3"
            ></v-radio>
          </v-radio-group>
        </v-flex>
        <!-- Fin -->
        <!-- Fecha desde -->
        <v-flex xs12 sm6 md5>
          <v-menu
            :disabled="isEditing"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="informe_ot.fechaDesde"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :disabled="isEditing"
                v-model="informe_ot.fechaDesde"
                label="Fecha Desde"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="Py"
              v-model="informe_ot.fechaDesde"
              no-title
              scrollable
            >
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(informe_ot.fechaDesde)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <!-- fin fecha desde -->
        <v-flex xs2 sm2 md2></v-flex>
        <!-- Fecha Hasta -->
        <v-flex xs12 sm6 md5>
          <v-menu
            :disabled="isEditing"
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="informe_ot.fechaHasta"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :disabled="isEditing"
                v-model="informe_ot.fechaHasta"
                label="Fecha Desde"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="Py"
              v-model="informe_ot.fechaHasta"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu1.save(informe_ot.fechaHasta)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <!-- fin Fecha Hasta -->
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md6>
          <v-btn @click="filtrarDatos">FILTRAR DATOS</v-btn>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-btn @click="mostrartodo">MOSTRAR TODO</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
// import Orden_trabajo from './Orden_Trabajo'
export default {
  data() {
    return {
      menu1: false,
      menu: false,
      modal: false,
      row: null,
      isEditing: false,
      clienteRules: [(v) => !!v || " Éste campo es necesario!!"],
    };
  },
  components: {
    // Orden_trabajo,
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configracion = { headers: header };
    this.$store.dispatch("getCabecera", configracion);
    // this.informe_ot.cabecera = []
  },

  computed: {
    ...mapState(["informe_ot"]),
  },
  methods: {
    filtrarDatos() {
      this.setCabecera();
      console.log("Mostrar todo");
      let header = { "auth-token": this.$store.state.token };
      let configracion = { headers: header };
      console.log(configracion);
      this.$store
        .dispatch("getDetalleOrdenTrabajo", configracion)
        .then(() => {
          this.$router.push({ path: "/informe_orden_trabajo" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mostrartodo() {
      let header = { "auth-token": this.$store.state.token };
      let configracion = { headers: header };
      this.$store.dispatch("getall", configracion).then(() => {
        this.$router.push({ name: "Lista_Orden" });
      }).catch((err) => {
        console.log(err)
      });
    },
    estadoorden() {
      console.log(this.informe_ot.estadoorden);
      if (this.informe_ot.estadoorden == 3) {
        this.isEditing = !this.isEditing;
      } else {
        this.isEditing = false;
      }
    },

    setCabecera() {
      console.log(this.informe_ot.numerochapa);
      this.informe_ot.cabecera = this.informe_ot.orden_done.find(
        (element) => (element.numerochapa = this.informe_ot.numerochapa)
      );
      console.log(this.informe_ot.cabecera);
    },
  },
};
</script>