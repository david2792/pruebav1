<template>
  <v-card>
    <div id="print-data">
      <v-card-title>
        Orden de trabajo
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="informe_ot.listall"
        :search="search"
        hide-default-footer
      >
        <template v-slot:[`item.history`]="{ item }">
          <v-icon @click="showHistory(item)" dark class="mb-2">gavel</v-icon>
        </template>
      </v-data-table>
    </div>
    <v-spacer></v-spacer>
    <br>
    <br>
    <v-card>
      <v-btn @click="printData">Pint data</v-btn>
    </v-card>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Cliente",
          value: "RazonSocial",
        },
        {
          text: "N° de chapa",
          value: "numerochapa",
        },

        {
          text: "Km recepción",
          value: "kmrecepcion",
        },

        {
          text: "Fecha",
          value: "fechaemision",
        },
        {
          text: "Ver detalle",
          value: "history",
        },
      ],
    };
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configracion = { headers: header };
    this.$store.dispatch("getall", configracion);
  },
  computed: {
    ...mapState(["informe_ot"]),
  },

  methods: {
    showHistory(item) {
      this.informe_ot.isdetalle = true;
      this.informe_ot.estadoorden = "3";
      this.informe_ot.numerochapa = item.numerochapa;
      this.informe_ot.numero = item.numero;
      this.informe_ot.cabecera = item;
      console.log("Realizar consultas: ", item);
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
    printData() {
      this.$htmlToPaper("print-data");
    },
  },
};
</script>