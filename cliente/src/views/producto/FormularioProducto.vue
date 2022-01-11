<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card>
      <v-card-title>
        <span class="headline">Registro de Productos</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <v-text-field
                autofocus
                outlined
                v-model="vProducto.Producto.codigobarra"
                :rules="CodigoRules"
                label="Codigo de Barra"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md8>
              <v-text-field
                outlined
                :rules="DescripcionRules"
                v-model="vProducto.Producto.descripcion"

                label="Descripcion"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!--  -->
          <v-layout wrap>
            
            <v-flex xs12 sm12 md4>
              <v-text-field
                outlined
                v-model="vProducto.Producto.preciocompra"
                label="Precio de Compra"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                :rules="PreciiovRules"
                outlined
                v-model="vProducto.Producto.precioventaminorista"
                label="Precio Minorista"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                :rules="PreciiovRules"
                outlined
                v-model="vProducto.Producto.precioventamayorista"
                label="Precio de Mayorista"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-autocomplete
                outlined
                :rules="DepositoRules"
                :items="vDeposito.Depositos"
                :item-text="(item) => `${item.codigoDeposito} ${item.Nombre}`"
                v-model="vProducto.Producto.codigodeposito"
                item-value="codigoDeposito"
                label="Deposito"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                :rules="StockRules"
                outlined
                v-model="vProducto.Producto.stockactual"
                label="Stock Actual"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                :rules="StockmRules"
                outlined
                v-model="vProducto.Producto.stockminimo"
                label="Stock Minimo"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                outlined
                :rules="MarcaRules"
                :items="vMarca.Marcas"
                :item-text="(item) => `${item.CodigoMarca} ${item.Descripcion}`"
                v-model="vProducto.Producto.codigomarca"
                item-value="CodigoMarca"
                label="Marca"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                :rules="CategoriaRules"
                outlined
                :items="vCategoria.Categorias"
                :item-text="
                  (item) => `${item.CodigoCategoria} ${item.Descripcion}`
                "
                v-model="vProducto.Producto.codigocategoria"
                item-value="CodigoCategoria"
                label="Categoria"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                outlined
                :rules="ImpuestoRules"
                :items="vImpuesto.Impuestos"
                :item-text="
                  (item) => `${item.CodigImpuesto} ${item.Descripcion}`
                "
                v-model="vProducto.Producto.codigimpuesto"
                item-value="CodigImpuesto"
                label="Impuesto"
                clearable
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <!-- <v-flex xs12 sm12 md12 v-show="valida">
                  <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                </v-flex> -->
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn
          class="mb-2"
          dark
          x-large 
          color="red accent-3"
          @click="(modal = !modal), limpiar()"
        >
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
        <v-btn class="mb-2" 
        x-large
        color="success"
        dark
        @click="guardar()">
          Guardar
          <v-icon>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-card-actions>
      <v-flex xs12 sm12 md12 xl12 v-if="notificacion == 1">
        <v-alert
         <v-alert
      
      dark
      color="info">
          {{ this.$store.state.vProducto.mensaje }}
        </v-alert>
      </v-flex>
    </v-card>
  </v-form>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      alerta: false,
      valid: true,
      //  mensaje:'',
      notificacion: 0,
      token_configuration: [],
      CodigoRules: [(v) => !!v || "Codigo Barra requerido"],
      DescripcionRules: [(v) => !!v || "Descripcion requerido"],
      DepositoRules: [(v) => !!v || "Deposito requerido"],
      PreciocRules: [(v) => !!v || "Precio Compra requerido"],
      PreciiovRules: [(v) => !!v || "Precio Venta requerido"],
      StockRules: [(v) => !!v || "Stock requerido"],
      StockmRules: [(v) => !!v || "Stock requerido"],
      MarcaRules: [(v) => !!v || "Marca requerido"],
      CategoriaRules: [(v) => !!v || "Categoria requerido"],
      ImpuestoRules: [(v) => !!v || "Impuesto requerido"],
    };
  },
  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getDepositos", this.token_configuration);
    this.$store.dispatch("getMarcasProductos", this.token_configuration);
    this.$store.dispatch("getImpuestos", this.token_configuration);
    this.$store.dispatch("getCategorias", this.token_configuration);
  },
  computed: {
   
    ...mapState([
      "vDeposito",
      "vMarca",
      "vCategoria",
      "vImpuesto",
      "vProducto",
      
    ]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setProducto"]),

    },
  },

  methods: {

    createFreshProveedor() {
      return {
        codigoproducto: "",
        codigobarra: "",
        descripcion: "",
        precioCompra: 0,
        precioventaminorista: "",
        stockminimo: "",
        stockactual: "",
        codigomarca: "",
        codigocategoria: "",
        codigimpuesto: "",
        codigodeposito: "",
      };
    },
    capturarcodigo(texto) {
      const cod = texto.split(" ")[0];
      return cod;
    },
    reset() {
      this.$refs.form.reset();
    },
    limpiar() {
      this.vProducto.Producto = this.createFreshProveedor();
      this.vProducto.show_alert =false
      this.notificacion = 0;
      this.reset();
    },

    guardar() {
      if (this.$refs.form.validate()) {
        console.log(this.$store.state.vProducto.editar_item);
        if (this.$store.state.vProducto.editar_item == false) {
          this.$store
            .dispatch("guardarProducto", this.token_configuration)
            .then(this.registroExitoso, this.regitroError);
          this.limpiar();
        } else {
          this.$store
            .dispatch("modificarProducto", this.token_configuration)
            .then(this.registroExitoso, this.regitroError);
          console.log("voy a modificar");
          this.limpiar();
           
        }
      }
    },
    registroExitoso(result) {
     
      console.log("La operación fue correcta:", result);
      this.vProducto.Producto = this.createFreshProveedor();
      this.notificacion = 1;
      this.alerta=true
  
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
    validarCodigoBarra() {
      this.$store.dispatch("buscarCodigoBarraProducto");
    },
  },
  // nuevo codigo
};
</script>