<template>
  <v-card>
    <v-text-field
      class="text-xs-center"
      v-model="search"
      append-icon="search"
      label="Búsqueda"
      color="red"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="fpagos.fpagos"
      :search="search"
      class="elevation-4"
    >
      <template v-slot:[`item.opcion`]="{ item }">
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="pink darken-4"
          @click="editItem(item)"
        >
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:items>
        <td>{{ props.item.CodigoFormasPago }}</td>
        <td>{{ props.item.Descripcion }}</td>
        <td>{{ props.item.Plazo }}</td>
        <td>{{ props.item.Dias }}</td>
        <td>{{ props.item.Estado }}</td>
        <td></td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="listar()">Resetear</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      token_configuration: [],
      headers: [
        { text: "Opcion", value: "opcion", sortable: true, class: "primary " },
        {
          text: "Codigo",
          value: "CodigoFormasPago",
          sortable: true,
          class: "primary",
        },
        {
          text: "Descripción",
          value: "Descripcion",
          sortable: true,
          class: "primary",
        },
        { text: "Plazo", value: "Plazo", sortable: true, class: "primary" },
        { text: "Días", value: "Dias", sortable: false, class: "primary" },
        {
          text: "Estado",
          value: "Estado",
          sortable: false,
          class: "primary",
        },
      ],
    };
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("setFormaPagos", this.token_configuration);
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
  methods: {
    listar() {
      let header = { "auth-token": this.$store.state.token };
      this.token_configuration = { headers: header };
      this.$store.dispatch("getFormaPagos", this.token_configuration);
    },
    editItem(item) {
      this.modal = !this.modal;
      this.$store.state.fpagos.editar_item = true;
      this.$store.dispatch("getFormaPago", item);
    },
  },
};
</script>
<style scoped>
#cabecera {
  background: rgb(8, 29, 48);
  border: rgb(242, 245, 248) 2px solid;
}
</style>