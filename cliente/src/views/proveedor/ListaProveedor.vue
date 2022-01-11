<template>
  <v-card class="mx-auto" max-width="1300">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar Proveedor"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="vProveedor.proveedores"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
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
      dialog: false,
      token_configuration: [],
      headers: [
        { text: "Opciones", value: "actions" },
        { text: "Código Proveedor", value: "CodigoProveedor" },
        { text: "Nombre proveedor", value: "RazonSocial" },
        { text: "Cédula", value: "Cedula" },
        { text: "Ruc", value: "Ruc" },
        { text: "Dirección", value: "Direccion" },
        { text: "Teléfono", value: "Telefono" },
        { text: "Email", value: "Email" },
        { text: "Web", value: "Web" },
        { text: "Ciudad", value: "Ciudad" },
      ],
    };
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };

    this.$store.dispatch("getProveedores", this.token_configuration);
  },
  computed: {
    ...mapState(["vProveedor"]),
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
    editItem(item) {
      this.modal = !this.modal;
      this.$store.state.vProveedor.editar_item = true;
      this.$store.dispatch("getProveedor", item);
    },
  },
};
</script>