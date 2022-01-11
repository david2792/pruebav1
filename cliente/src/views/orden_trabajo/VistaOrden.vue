<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float>
        <v-toolbar-title>Orden de Trabajo</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="red darken-4" class="mb-2" @click="modal=!modal">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
       <v-dialog v-model="modal" max-width="1700px">
          <FormularioOrden/>
        </v-dialog>
      </v-toolbar>
      <ListaOrden/>
    </v-flex>
  </v-layout>
</template>
<script>
import FormularioOrden from "./FormularioOrden";
import ListaOrden from "./ListaOrden";
export default {
  data() {
    return {
    };
  },
  components: {
    ListaOrden,
    FormularioOrden
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