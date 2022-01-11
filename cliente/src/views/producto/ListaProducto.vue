<template>   
    <v-card>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"  
        ></v-text-field>
        <v-data-table
        :headers="headers"
        :items="vProducto.productos"
        :search="search"
        class="elevation-4"
         >
      <template v-slot:[`item.opcion`]="{ item }">
       <v-btn
                class="mx-2"
                fab  
                dark   
                small
                @click="editItem(item)"
              >
                <v-icon dark>mdi-tools</v-icon>
              </v-btn>
      </template>
        <template v-slot:items >
          <td>{{ props.item.codigoproducto }}</td>
          <td>{{ props.item.codigobarra }}</td>
          <td>{{ props.item.descripcion }}</td>
          <td>{{ props.item.PrecioCompra }}</td>
          <td>{{props.item.PrecioVentaMinorista}}</td>
          <td>{{props.item.PrecioVentaMayorista}}</td>
          <td>{{ props.item.StockActual }}</td>
          <td>{{ props.item.StockMinimo }}</td>
          <td>{{ props.item.Marca}}</td>
          <td>{{ props.item.Categoria}}</td>
          <td>{{ props.item.Impuesto}}</td>
          <td>{{ props.item.Deposito}}</td>
      <td></td>

        </template>
        <template v-slot:no-data>
          <v-btn color="blue" @click="listar()">Resetear</v-btn>
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
         { text: "Opciones", value: "opcion", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase " },
        { text: "Codigo", value: "codigoproducto", sortable: true,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "  },
        { text: "C. de Barra", value: "codigobarra", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "  },
        { text: "Descripcion", value: "descripcion", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase " },
        { text: "Precio Compra", value: "preciocompra", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase " },
        { text: "Precio Venta",value: "precioventaminorista",sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "},
        { text: "Precio Mayorista",value: "precioventamayorista",sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "},
        { text: "Stock Actual", value: "stockactual", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "},
        { text: "Stock Minimo", value: "stockminimo", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "  },
        { text: "Marca", value: "marca", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase " },
        { text: "Categoria", value: "categoria", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "},
        { text: "Impuesto", value: "impuesto", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "},
        { text: "Deposito", value: "deposito", sortable: false,class:" white--text light-blue darken-4 subtitle-1 text-uppercase "}
        
      ],
        }
    },
    mounted(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getProductos", this.token_configuration)

    },
    computed:{
        ...mapState(['vProducto']),
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
        this.$store.dispatch("getProductos", this.token_configuration)

        },
     editItem(item) {
     this.modal = !this.modal;
     this.$store.state.vProducto.editar_item = true;
     this.$store.dispatch("getProducto", item);  
     console.log(item);
    },
  },
}
</script>
<style scoped>
#cabecera{
  background: rgb(8, 29, 48);
  border: rgb(242, 245, 248) 2px solid;
  text-color:"blue";
}
</style>