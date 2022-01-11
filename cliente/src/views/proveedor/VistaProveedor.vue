<template>
  <v-card class="mx-auto" max-width="1300">
      <v-layout align-start>
    <v-flex>
      <v-toolbar>
        <v-toolbar-title>Proveedor</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
        <v-spacer></v-spacer>
        <template>
          <v-btn color="amber darken-4" dark class="mb-2" @click="modal=!modal">
            Nuevo
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </template>
        <v-dialog v-model="modal" max-width="1200px">
          <FormularioProveedor />
        </v-dialog>
      </v-toolbar>
      <ListaProveedor />
    </v-flex>
  </v-layout>
  </v-card>
</template>
<script>
import FormularioProveedor from "./FormularioProveedor";
import ListaProveedor from "./ListaProveedor";
export default {
  data() {
    return {
    };
  },
  components: {
    FormularioProveedor,
    ListaProveedor,
  },
  computed: {
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        console.log("hola mundo");
        this.$store.dispatch("switchDialog", value);
      },
    },
  },
  methods: {},
};
</script>