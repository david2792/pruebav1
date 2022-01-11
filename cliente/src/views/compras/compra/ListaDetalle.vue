<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <v-data-table
      :hide-default-footer="true"
      :headers="headers"
      :items="compras.listaCompras"
    >
      <!-- <v-responsive class="overflow-y-auto" max-height="calc(90vh - 520px)"> -->
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.CodigoProducto }}</td>
          <td>{{ item.Descripcion }}</td>
          <td>{{ item.Cantidad }}</td>
          <td>{{ item.Precio }}</td>
          <td>{{ (item.SubTotal = item.Precio * item.Cantidad) }}</td>
          <td>
            <v-btn
              ><v-btn class="mx-2" fab dark small color="red" @click="removeItem(item)">
                <v-icon dark> mdi-close </v-icon>
              </v-btn></v-btn
            >
          </td>
        </tr>
      </template>
      <!-- </v-responsive> -->
      <template slot="body.append">
        <tr class="pink--text">
          <th class="title">Totals</th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title">{{totalCompras}}</th>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Código",
          align: "left",
          sortable: false,
          value: "CodigoProducto",
        },
        { text: "Descripción", value: "Descripcion" },
        { text: "Cantidad", value: "Cantidad" },
        { text: "Precio", value: "Precio" },
        { text: "Subtotal", value: "SubTotal" },
        { text: "Opciones", value: "opcion" },
      ],
    };
  },
  computed: {
    ...mapState(["compras"]),
    totalCompras() {
      return this.$store.getters.totalCompras;
    },
  },
  methods:{
    removeItem(item) {
      console.log(item);
      this.compras.listaCompras.splice(item, 1);
    }
  }
};
</script>