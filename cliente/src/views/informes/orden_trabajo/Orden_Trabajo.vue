<template>
  <v-card>
    <div id="print-data">
      <div>
        <h2 align-center>INFORME ORDEN DE TRABAJO</h2>
      </div>
      <v-layout>
        <v-flex xs12 sm12 md4>
          <div><v-card- class="pa-2" outline tile>Nombre</v-card-></div>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <v-card-text class="pa-2" tile>Número de chapa</v-card-text>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <div><v-card-text class="pa-2" tile>Fecha</v-card-text></div>
        </v-flex>
      </v-layout>
      <div>
        <v-layout wrap>
          <v-flex xs12 sm12 md4>
            <div>
              <v-card-text class="pa-2" tile>
                {{ informe_ot.cabecera.RazonSocial }}
              </v-card-text>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div>
              <v-card-text class="pa-2" tile>
                {{ informe_ot.cabecera.numerochapa }}
              </v-card-text>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <div>
              <v-card-text class="pa-2" tile>
                {{ informe_ot.cabecera.fechaemision }}
              </v-card-text>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <div>
              <v-card-text class="pa-2 font-weight-medium" tile>
                <p
                  class="pa-2 text-no-wrap secondary text-decoration-underline font-weight-medium"
                  tile
                >
                  Km recepción:
                  {{ informe_ot.cabecera.kmrecepcion }}
                </p>
              </v-card-text>
            </div>
          </v-flex>
          <h1>Detalle del cliente:</h1>
          <v-flex xs12 sm12 md12>
            <!-- <v-card-text> -->
            <v-data-table
              :headers="headers"
              :items="informe_ot.detalleOrdenTrabajo"
              hide-default-footer
              class="elevation-1"
              :expanded.sync="expanded"
              show-expand
              single-expand
            >
              <template v-slot:[`item.data-table-expand`]="{ expand, isExpanded }">
                <v-icon @click="expand(!isExpanded)">gavel</v-icon>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <div class="row sp-details">
                    <div tile>
                      OBSERVACIÓN: &nbsp;&nbsp;&nbsp; {{ item.observacion }}
                    </div>
                  </div>
                </td>
              </template>
            </v-data-table>
            <!-- </v-card-text> -->
          </v-flex>
        </v-layout>
      </div>
    </div>
    <br>
    <br>
    <v-btn @click="printData">Pint data</v-btn>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    expanded: [],
    headers: [
      {
        text: "N° Recepción",
        value: "numero",
      },
      {
        text: "Fecha",
        value: "fechaemision",
      },
      {
        text: "Código Producto",
        value: "codigoproducto",
        // sortable: true,
        // class: "primary",
      },
      {
        text: "Descripción",
        value: "descripcion",
        // sortable: true,
        // class: "primary",
      },
      {
        text: "Precio",
        value: "precio",
        // sortable: true,
        // class: "primary",
      },
      {
        text: "Cantidad",
        value: "cantidad",
        // sortable: true,
        // class: "primary",
      },
    ],
  }),
  name: "Informe_ot",
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configracion = { headers: header };
    this.$store.dispatch("getDetalleOrdenTrabajo", configracion);
    // this.verificarDatos();
  },
  computed: {
    ...mapState(["informe_ot"]),
  },
  methods: {
    printData() {
      this.$htmlToPaper("print-data");
    },

    verificarDatos() {
      console.log("iniciando:", this.informe_ot.cabecera.o_cabecera[0]);
      if (this.informe_ot.cabecera.o_cabecera) {
        console.log("Ooooh boy, Welcome");
      } else {
        this.$router.push({ path: "/filtro_orden" });
      }
    },
  },
};
</script>