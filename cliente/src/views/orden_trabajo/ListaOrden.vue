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
        :items="vOrden.ordenes"
        :search="search"
        id="cabecera"
        class="elevation-4"
      >
      <template v-slot:[`item.opcion`]="{ item }">
       <v-btn
        class="mx-2"
        small
        color="purple darken-4"
         @click="editItem(item)"
              >
           
        Facturar
        </v-btn>
       <v-btn
        class="mx-2 mr"
        small
        color="pink darken-4"
         @click="editItem(item)"
              >
              Anular
        </v-btn>
      </template>
        <template v-slot:items>
            <td >{{ props.item.numero }}</td>
          <td>{{ props.item.numerochapa }}</td>
           <td>{{ props.item.CodigoCliente }}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.observacionorden }}</td>
          <td>{{ props.item.observacionrecepcion }}</td>
          <td>{{  props.item.fechaemision}}</td>
          <td>{{ props.item.fechaentrada}}</td>
         <td> {{ props.item.estadorden }} </td>
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
          { text: 'Opciones', value: 'opcion', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'Nro', value: 'numero', sortable: true, class: "cabecera colorCabecera--text" },
        { text: 'CHAPA  ', value: 'numerochapa', sortable: true,class: "cabecera colorCabecera--text",},
          { text: 'CodigoCliente  ', value: 'CodigoCliente', sortable: true, align: ' d-none'},
        { text: 'CLIENTE', value: 'RazonSocial', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'OBSERVACION ORDEN', value: 'observacionorden', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'OBSERVACION RECEPCION', value: 'observacionrecepcion', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'FECHA ORDEN', value: 'fechaemision', sortable: false,class: "cabecera colorCabecera--text"  },
         { text: 'FECHA RECEPCION', value: 'fechaentrada', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'ESTADO DEL TRABAJO', value: 'estadorden', sortable: false,class: "cabecera colorCabecera--text"  },
        
      ],
        }
    },
    mounted(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getOrdenes", this.token_configuration)

    },
    computed:{
        ...mapState(['vRecepcion','vOrden']),
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
        this.$store.dispatch("getOrdenes", this.token_configuration)

        },
     editItem(item) {
 
    this.$router.push({
            name: "facturacion",
            params: {
              numero: item.numero,
              RazonSocial:item.RazonSocial,
              CodigoCliente:item.CodigoCliente

            }
          });
    },
    }
}
</script>
<style scoped>
#cabecera{
  background: rgb(8, 29, 48);
  border: rgb(242, 245, 248) 2px solid;
}
</style>