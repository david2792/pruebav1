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
        :items="vVehiculo.vehiculos"
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
           <td>{{ props.item.codigo }}</td>
          <td>{{ props.item.CodigoCliente }}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.chapa }}</td>
          <td>{{ props.item.chasis }}</td>
           <td>{{ props.item.observacion }}</td>
          <td>{{ props.item.transmicion }}</td>
          <td>{{ props.item.modelo }}</td>
          <td>{{ props.item.marca }}</td>
          <td>{{ props.item.color }}</td>
      <td></td>

        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn color="light-green darken-4" @click="recepcion()">Ir a Recepcion Vehiculo <v-icon>touch_app</v-icon></v-btn>
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
          { text: "CODIGO ", value: "codigovehiculo", sortable: true,class:"primary " },
        { text: "CODIGO CLIENTE ", value: "CodigoCliente", sortable: true,class:"primary " },
        { text: "RAZON SOCIAL", value: "RazonSocial", sortable: true,class:"primary " },
        { text: "CHAPA", value: "chapa", sortable: true,class:"primary " },
        { text: "CHASIS", value: "chasis", sortable: true,class:"primary " },
        { text: "OBSERVACION", value: "observacion", sortable: false,class:"primary " },
        { text: "TRANSMICION", value: "transmicion", sortable: false,class:"primary " },
        { text: "MODELO", value: "modelo", sortable: false,class:"primary " },
        { text: "MARCA", value: "marca", sortable: false,class:"primary " },
        { text: "COLOR", value: "color", sortable: false,class:"primary " },
        
      ],
        }
    },
    mounted(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getVehiculos", this.token_configuration)

    },
    computed:{
        ...mapState(['vVehiculo']),
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
        this.$store.dispatch("getVehiculos", this.token_configuration)

        },
     editItem(item) {
     this.modal = !this.modal;
     this.$store.state.vVehiculo.editar_item = true;
     this.$store.dispatch("getVehiculo", item);  
     console.log("Hello wey"+ item);
    },
    recepcion()
    {
       this.$router.push({
            name: "recepcion"});
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