<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <!-- Fecha registro -->
          <v-col cols="12" md="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="compras.cabecera_compras.Fecha"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="compras.cabecera_compras.Fecha"
                  label="Fecha Desde"
                  v-on="on"
                  outlined
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                locale="Py"
                v-model="compras.cabecera_compras.Fecha"
                no-title
                scrollable
              >
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(compras.cabecera_compras.Fecha)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <!-- Número Factura -->
          <v-col cols="12" md="3">
            <v-text-field
              v-model="compras.cabecera_compras.NroFactura"
              :rules="nameRules"
              label="Número Factura."
              required
              autofocus
              outlined
              clearable
            ></v-text-field>
          </v-col>
          <!-- condicion  de pagos -->
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="compras.cabecera_compras.codigocondicion"
              :items="vCondicion.Condiciones"
              :item-text="
                (item) => `${item.Descripcion} - ${item.CodigoCondicion}`
              "
              item-value="CodigoCondicion"
              label="Seleccione la condición de pago."
              outlined
              clearable
            ></v-autocomplete>
          </v-col>
          <!-- Forma de pago -->
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="compras.cabecera_compras.CodigoFormasPago"
              :items="fpagos.fpagos"
              :item-text="
                (item) => `${item.Descripcion} - ${item.CodigoFormasPago}`
              "
              item-value="CodigoFormasPago"
              label="Selecionar la forma de pago"
              outlined
              clearable
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <!-- Proveedor -->
          <!-- Agregar Proveedor -->
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="indigo"
                  fab
                  dark
                  @click="modal01 = !modal01"
                >
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <span>Agregar nuevo Proveedor</span>
            </v-tooltip>
          </v-col>
          <!-- Seleccionar proveedor -->
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="compras.cabecera_compras.codigoProveedor"
              :items="vProveedor.proveedores"
              :item-text="
                (item) => `${item.RazonSocial} - ${item.CodigoProveedor}`
              "
              item-value="CodigoProveedor"
              label="Seleccionar proveedor"
              outlined
              @change="(id) => obtenerProveedor(id)"
            ></v-autocomplete>
          </v-col>
          <!-- Ruc -->
          <v-col cols="4">
            <v-text-field
              v-model="vProveedor.Proveedor.Ruc"
              :rules="nameRules"
              label="Ruc:"
              required
              autofocus
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <!-- Teléfono -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="vProveedor.Proveedor.Telefono"
              :rules="nameRules"
              label="Teléfono:"
              required
              autofocus
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <!-- Dirección -->
          <v-col cols="12">
            <v-text-field
              v-model="vProveedor.Proveedor.Direccion"
              :rules="nameRules"
              label="Dirección:"
              required
              autofocus
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- Dialogo Proveedor -->
    <v-dialog v-model="modal01" max-width="1000">
      <FormularioProveedor />
    </v-dialog>
  </v-card>
</template>
<script>
import FormularioProveedor from "../../proveedor/FormularioProveedor";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      menu: false,
    };
  },
  components: {
    FormularioProveedor,
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configracion = { headers: header };
    this.$store.dispatch("getCondicion", configracion);
    this.$store.dispatch("setFormaPagos", configracion);
    this.$store.dispatch("getProveedores", configracion);
    this.$store.state.compras.cabecera_compras.codigoUsuario = this.$store.state.usuario.codigo;
  },
  computed: {
    ...mapState(["compras", "vCondicion", "fpagos", "vProveedor", "usuario"]),
    modal01: {
      get() {
        return this.$store.getters.getModal01;
      },
      set(value) {
        this.$store.dispatch("switchDialog01", value);
      },
    },
  },

  methods: {
    obtenerProveedor(id) {
      let proveedor = this.vProveedor.proveedores.filter(
        (pro) => pro.CodigoProveedor === id
      );
      console.log("Proveedor seleccionado: ", proveedor[0].RazonSocial);
      this.vProveedor.Proveedor = proveedor[0];
    },
    close() {
      this.dialog = false;
      console.log("paso");
    },
  },
};
</script>