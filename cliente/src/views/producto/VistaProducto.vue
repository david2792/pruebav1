<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float>
        <v-toolbar-title>Productos</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="blue darken-4" dark  class="mb-2" @click="modal=!modal">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
       <v-dialog v-model="modal" max-width="1000px">
          <FormularioProducto/>
        </v-dialog>
      </v-toolbar>
      <ListaProducto/>
    </v-flex>
  </v-layout>
</template>
<script>
import FormularioProducto from "./FormularioProducto";
import ListaProducto from "./ListaProducto";
export default {
  data() {
    return {
    };
  },
  components: {
    FormularioProducto,
    ListaProducto
  },
  computed: {
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
    
      close(){
      this.dialog=false;
      console.log("paso")
    }
  }
};
</script>