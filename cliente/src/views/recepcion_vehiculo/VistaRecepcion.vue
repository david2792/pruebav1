<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float>
        <v-toolbar-title>Recepcion Vehiculo</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="red darken-4"  class="mb-2" @click="modal=!modal">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
       <v-dialog v-model="modal" max-width="1000px">
          <FormularioRecepcion/>
        </v-dialog>
      </v-toolbar>
      <ListaRecepcion/>
    </v-flex>
  </v-layout>
</template>
<script>
import FormularioRecepcion from "./FormularioRecepcion";
import ListaRecepcion from "./ListaRecepcion";
export default {
  data() {
    return {
    };
  },
  components: {
    ListaRecepcion,
    FormularioRecepcion
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