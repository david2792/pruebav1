<template>
  <v-container>
    <div id="print_ticket">
      <v-card flat class="rounded-card" max-width="1300">
        <v-row>
          <v-col>
            <h1 align="center">
              {{ vFacturacion.get_facturacion[0].NombreSucursal }}
            </h1>
            <h1 align="center">
              {{ vFacturacion.get_facturacion[0].RazonSocial }}
            </h1>
            <h1 align="center">
              {{ vFacturacion.get_facturacion[0].DireccionSucursal }}
            </h1>
          </v-col>
          <v-col>
            <h6>Timbrado N°:{{ vFacturacion.Cabecera.NumeroTimbrado }}</h6>
            <h6>
              Fecha Inicio Vigencia:{{
                vFacturacion.get_facturacion[0].FechaInicioVigencia
              }}
            </h6>
            <h6>
              Fecha Fin Vigencia:
              {{ vFacturacion.get_facturacion[0].FechaFinVigencia }}
            </h6>
            <h5>
              <strong
                >R.U.C: {{ vFacturacion.get_facturacion[0].RUCEmpresa }}</strong
              >
            </h5>
            <h5>VENDEDOR:{{ vFacturacion.Cajero }}</h5>
            <h1 align="center">FACTURA</h1>
            <h1>
              {{ vFacturacion.PuntoExpedicion }}-{{
                vFacturacion.PuntoExpedicion
              }}-{{ vFacturacion.get_facturacion[0].NumeroFactura }}
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h5>Fecha Emisión:{{ vFacturacion.get_facturacion[0].Fecha }}</h5>
            <br />
            <h5>R.U.C/C.I:{{ vFacturacion.get_facturacion[0].RUCCLiente }}</h5>
            <br />
            <h5>
              Dirección: {{ vFacturacion.get_facturacion[0].DireccionCliente }}
            </h5>
            <br />
            <h5>
              Nombre o Razón Social:{{
                vFacturacion.get_facturacion[0].Cliente
              }}
            </h5>
          </v-col>

          <v-col>
            <h5>Cond. de Venta: &nbsp;&nbsp;Contado:</h5>
            <br />
            <h5>Nota de Resmisión:</h5>
            <br />
            <br />
            <br />
            <h5>
              Teléfono: {{ vFacturacion.get_facturacion[0].TelefonoCliente }}
            </h5>
          </v-col>
          <v-col>
            <h5>Credito:</h5>
          </v-col>
        </v-row>
      </v-card>
      <v-data-table
        :hide-default-footer="true"
        :headers="headers"
        :items="vFacturacion.DetalleCabecera.datosDetalle"
      >
        <!-- <v-responsive class="overflow-y-auto" max-height="calc(90vh - 520px)"> -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.cantidad }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.precio }}</td>
            <td>{{ item.excentas }}</td>
            <td>{{ item.iva5 }}</td>
            <td>{{ item.subtotal }}</td>
          </tr>
        </template>
        <!-- </v-responsive> -->
        <template slot="body.append">
          <tr class="pink--text">
            <th class="title">SubTotales</th>
            <th class="title"></th>
            <th class="title"></th>
            <th class="title"></th>
            <th class="title"></th>
            <th class="title">{{ vFacturacion.DetalleCabecera.total }}</th>
          </tr>
        </template>
        <template slot="body.append">
          <tr class="pink--text">
            <th>Total en letras:</th>
            <th class="title"></th>
            <th class="title"></th>
            <th class="title"></th>
            <th class="title"></th>
            <th class="title">{{ vFacturacion.DetalleCabecera.total }}</th>
          </tr>
        </template>
        <template slot="body.append">
          <tr class="pink--text">
            <th>LIQUIDACIÓN DEL IVA: 5%</th>
            <th>
              10%: {{ (vFacturacion.DetalleCabecera.total / 11).toFixed(2) }}
            </th>
            <th>
              TOTAL IVA:
              {{ (vFacturacion.DetalleCabecera.total / 11).toFixed(2) }}
            </th>
            <th class="title"></th>
            <th class="title"></th>
          </tr>
        </template>
      </v-data-table>
    </div>
    <br>
    <div>
      <v-btn @click="printTicket">Imprimir Factura</v-btn>
    </div>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import numero_a_letra from "./numero_a_letra";
export default {
  data() {
    return {
      headers: [
        { text: "Cantidad", value: "cantidad" },
        { text: "Descripción", value: "descripcion" },
        { text: "Precio", value: "precio" },
        { text: "Exentas", value: "exentas" },
        { text: "Iva 5%", value: "iva5" },
        { text: "Iva 10%", value: "subtotal" },
      ],
    };
  },
  computed: {
    ...mapState(["vFacturacion"]),
  },
  methods: {
    printTicket() {
      this.$htmlToPaper("print_ticket");
    },
  }
};
</script>