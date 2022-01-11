<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float>
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="red darken-4"  class="mb-2" @click="modal=!modal">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
       <v-dialog v-model="modal" max-width="600px">
          <FormularioCliente/>
        </v-dialog>
      </v-toolbar>
      <ListaCliente/>
    </v-flex>
  </v-layout>
</template>
<script>
import FormularioCliente from "./FormularioCliente";
import ListaCliente from "./ListaCliente";
export default {
  data() {
    return {
    };
  },
  components: {
    FormularioCliente,
    ListaCliente
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
  methods:{
      close(){
      this.dialog=false;
      console.log("paso")
    }
  }
};
</script>