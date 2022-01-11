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
        :items="vRecepcion.recepciones"
        :search="search"
        id="cabecera"
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
           <td>{{ props.item.numero }}</td>
          <td>{{ props.item.chapa }}</td>
          <td>{{ props.item.RazonSocial }}
          <td>{{ props.item.observaciones }}</td>
          <td>{{ props.item.km }}</td>
          <td>{{ props.item.nivel }}</td>
          <td>{{ props.item.fechaentrada}}</td>
           <td>{{ props.item.estadorecepcion }}</td>
      <td></td>

        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn color="light-green darken-4" @click="orden()">Ir a Orden de Trabajo <v-icon>touch_app</v-icon></v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
import {mapState} from 'vuex';
export default {
    data(){
        return{
            search: "",
            token_configuration: [],
           
      headers: [
         { text: "Opciones", value: "opcion", sortable: false,class:"primary " },
          { text: "NUMERO ", value: "numero", sortable: true,class:"primary " },
        { text: "CHAPA ", value: "chapa", sortable: true,class:"primary " },
        { text: "CLIENTE ", value: "RazonSocial", sortable: true,class:"primary " },
        { text: "OBSERVACION", value: "observaciones", sortable: false,class:"primary " },
        { text: "KM ENTRADA", value: "km", sortable: true,class:"primary " },
        { text: "NIVEL COMBUSTIBLE", value: "nivel", sortable: true,class:"primary " },
        { text: "FECHA ENTRADA", value: "fechaentrada", sortable: true,class:"primary " },
        { text: "ESTADO", value: "estadorecepcion", sortable: false,class:"primary " },
       
        
      ],
        }
    },
    mounted(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getRecepciones", this.token_configuration)

    },
    computed:{
        ...mapState(['vRecepcion']),
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
    formatDate(value) {
      return moment(value).format("MMMM DD YYYY")
  },
        listar(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getRecepciones", this.token_configuration)

        },
     editItem(item) {
     this.modal = !this.modal;
     this.$store.state.vRecepcion.editar_item = true;
     this.$store.dispatch("getRecepcion", item);  
     console.log("Hello wey"+ item);
    },
    orden()
    {
       this.$router.push({
       name: "orden"});
    }
  },
}
</script>
<style scoped>
#cabecera{
  background: rgb(8, 29, 48);
  border: rgb(242, 245, 248) 2px solid;
}
</style>