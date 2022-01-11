<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <div>
      <v-alert
      dismissible
      :value="alert"
      dense
      text
      type="success"
    >
      {{compras.mensaje}}
    </v-alert>
    </div>
    <div>
      <Cabecera />
    </div>
    <div>
      <Detalle />
    </div>
    <div>
      <ListaDetalle />
    </div>
    <br>
    <div>
      <v-btn @click="insertCompras()">Guardar Datos</v-btn>
    </div>
  </v-card>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Cabecera from "../../../views/compras/compra/Cabecera";
import Detalle from "../../../views/compras/compra/Detalle";
import ListaDetalle from "../../../views/compras/compra/ListaDetalle";
export default {
  data(){
    return{
      alert: false,
    }
  },
  components: {
    Cabecera,
    Detalle,
    ListaDetalle,
  },
  computed: {
    ...mapState(["compras"]),
    ...mapGetters(["totalCompras"]),
  },
  methods: {
    insertCompras() {
      console.log("Hola fronted");
      let header = { "auth-token": this.$store.state.token };
      let token_configuration = { headers: header };
      this.$store.dispatch("insertCompras", token_configuration);
      this.alert = !this.alert;
    },
  },
};
</script>