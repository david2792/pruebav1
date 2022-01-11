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
        :items="vCliente.clientes"
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
          
          <td>{{ props.item.CodigoCliente}}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.Cedula }}</td>
          <td>{{ props.item.Ruc }}</td>
          <td>{{ props.item.Direccion }}</td>
          <td>{{ props.item.Telefono }}</td>
          <td>{{ props.item.Email }}</td>
          <td>{{ props.item.Ciudad }}</td>
      <td></td>

        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
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
        { text: "Opcion", value: "opcion", sortable: true,class:"primary " },
        { text: "Codigo", value: "CodigoCliente", sortable: true, class:"primary" },
        { text: "Razon Social", value: "RazonSocial", sortable: true ,class:"primary"},
        { text: "Cedula", value: "Cedula", sortable: true,class:"primary" },
        { text: "RUC", value: "Ruc", sortable: false,class:"primary" },
        { text: "Dirección", value: "Direccion", sortable: false,class:"primary" },
        { text: "Teléfono", value: "Telefono", sortable: false,class:"primary" },
        { text: "Email", value: "Email", sortable: false,class:"primary" },
        { text: "Ciudad", value: "Ciudad", sortable: false,class:"primary" },
        
      ],
        }
    },
    mounted(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getClientes", this.token_configuration)

    },
    computed:{
        ...mapState(['vCliente']),
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
        listar(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getClientes", this.token_configuration)

        },
      editItem(item) {
     this.modal = !this.modal;
     this.$store.state.vCliente.editar_item = true;
     this.$store.dispatch("getCliente", item);  
     console.log("Hello wey"+ item);
    },
  },
}
</script>
<style scoped>
#cabecera{
  background: rgb(8, 29, 48);
  border: rgb(242, 245, 248) 2px solid;
}

</style>