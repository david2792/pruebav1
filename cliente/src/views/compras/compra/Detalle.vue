<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <!-- Productos -->
          <!-- Agregar Productos -->
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  @click="modal = !modal"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </template>
              <span>Agregar nuevo Producto</span>
            </v-tooltip>
          </v-col>
          <!-- Seleccionar Productos -->
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="add_Compras.CodigoProducto"
              :items="vProducto.productos"
              :item-text="
                (item) => `[${item.CodigoProducto}] - ${item.Descripcion}`
              "
              item-value="CodigoProducto"
              label="Seleccionar producto"
              outlined
              @change="(id) => obtenerProducto(id)"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="add_Compras.Cantidad"
              label="Cantidad"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="add_Compras.Precio"
              label="Precio"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  fab
                  dark
                  color="green"
                  @click="agregarCompras"
                >
                  <v-icon dark> mdi-cart-check </v-icon>
                </v-btn>
              </template>
              <span>Agregar Compra</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- Dialogo Producto -->
    <v-dialog v-model="modal" max-width="1000px">
      <FormularioProducto />
    </v-dialog>
  </v-card>
</template>

<script>
import FormularioProducto from "../../producto/FormularioProducto";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      add_Compras: this.detalle_compras(),
    };
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configuracion = { headers: header };
    this.$store.dispatch("getProductos", configuracion);
  },
  components: {
    FormularioProducto,
  },
  computed: {
    ...mapState(["vProducto", "compras"]),
    ...mapGetters(["addItemToCompras"]),

    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
  },

  methods: {
    detalle_compras() {
      return {
        NroFactura: "",
        CodigoProducto: "",
        Descripcion: "",
        Cantidad: 1,
        Precio: 0,
        SubtTotal: 0,
      };
    },
    obtenerProducto(id) {
      let producto = this.vProducto.productos.filter(
        (pro) => pro.CodigoProducto === id
      );
      this.$store.dispatch("getProducto", producto[0]);
      this.add_Compras.Descripcion = this.vProducto.Producto.Descripcion;
      console.log(
        "Producto seleccionado: ",
        this.vProducto.Producto.Descripcion
      );
    },
    agregarCompras() {
      const NroFactura = this.compras.cabecera_compras.NroFactura;
      const CodigoProducto = this.add_Compras.CodigoProducto;
      const Descripcion = this.add_Compras.Descripcion;
      const Cantidad = parseInt(this.add_Compras.Cantidad, 10);
      const Precio = parseInt(this.add_Compras.Precio, 10);
      const SubTotal = 0;
      this.$store.dispatch("addItemToCompras", {
        NroFactura,
        CodigoProducto,
        Descripcion,
        Cantidad,
        Precio,
      });
    },

    close() {
      this.dialog = false;
      console.log("paso");
    },
  },
};
</script>>