<template  >
  <v-layout align-start>
    <v-flex>
      <v-toolbar>
        <v-toolbar-title>Orden de Trabajo<v-icon>commute</v-icon></v-toolbar-title>
        <v-divider
            class="mx-2"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-if="verNuevo==0" class="text-xs-center" v-model="search" append-icon="search"
                      label="Búsqueda" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="purple darken-4" v-if="verNuevo==0" @click="mostrarNuevo()" dark class="mb-2">Nuevo<v-icon>create</v-icon></v-btn>
        <!-- dialogo para agregar recepciones -->
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione una Recepcion</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraRecepcion"
                          :items="recepciones"
                          class="elevation-10"
                          :search="texto"
                      >
                        <template v-slot:items="props">
                          <td class="justify-center layout px-0">
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                color="purple darken-4"
                                @click="agregarDetalle(props.item)"
                              >
                                <v-icon dark>
                                  save_alt</v-icon>
                              </v-btn>
                          </td>
                           <td>{{ props.item.numero }}</td>
                          <td>{{ props.item.chapa }}</td>
                          <td>{{ props.item.fechaentrada }}</td>
                          <td>{{ props.item.observaciones }}</td>
                          <td>{{ props.item.RazonSocial }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- fin del dialogo para agregar recepciones -->
        <!-- dialogo para agregar repuestos o mercaderias -->
        <v-dialog v-model="dialogrepuestos" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione una Repuesto</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraRepuesto"
                          :items="repuestos"
                          class="elevation-10"
                          :search="texto"
                      >
                        <template v-slot:items="props">
                          <td class="justify-center layout px-0">
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                color="purple darken-4"
                                @click="agregarDatosRepuesto(props.item)"
                              >
                                <v-icon dark>
                                  save_alt</v-icon>
                              </v-btn>
                          </td>
                           <td>{{ props.item.CodigoProducto }}</td>
                          <td>{{ props.item.Descripcion }}</td>
                          <td>{{ props.item.PrecioVentaMinorista }}</td>
                          <td>{{ props.item.Marca }}</td>
                          <td>{{ props.item.StockActual }}</td>
                           <td>{{ props.item.Deposito }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- fin del dialogo para agregar repuestos -->
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="ventas"
          :search="search"
          class="elevation-24"
          v-if="verNuevo==0"
      >
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
            <v-btn  class="mx-2" 
                dark
                small
                color="purple darken-4"> <v-icon @click="entregado(props.item)">
              add
            </v-icon>Confirmar</v-btn>
            <v-btn  class="mx-2"
                @click="editar(props.item)"
                dark
                small
                color="red darken-4"> <v-icon>
              edit
            </v-icon>Editar</v-btn>
           
          </td>
          <td >{{ props.item.numero }}</td>
          <td>{{ props.item.numerochapa }}</td>
          <td>{{ props.item.RazonSocial }}</td>
          <td>{{ props.item.observacionorden }}</td>
          <td>{{ props.item.observacionrecepcion }}</td>
          <td>{{  props.item.fechaemision= new Date().toJSON().slice(0,10).replace(/-/g,'-') }}</td>
          <td>{{ props.item.fechaentrada= new Date().toJSON().slice(0,10).replace(/-/g,'-')  }}</td>
         <td> {{ props.item.estadorden }} </td>
         
         
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-container grid-list-sm class="pa-4" v-if="verNuevo">
        <v-layout row wrap>

          <v-flex xs12 sm2 md2 lg1 xl1 class=" pr-auto">
            <v-btn small fab dark color="teal" @click="mostrarModalArticulos()">
              <v-icon dark>add</v-icon>
            </v-btn>
            Buscar
          </v-flex>
          <v-flex xs12 sm8 md8 lg10 xl10>
          <v-text-field v-model="observacion" disabled solo  id="resaltar" label="Observaciones de la recepcion ">
            </v-text-field>
          </v-flex>

           <v-flex xs2 sm2 md2 lg2 xl2>
            <v-text-field v-model="codigorecepcion" disabled solo  id="resaltar" label="Codigo Recepcion ">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 lg4 xl4>
            <v-text-field v-model="chapa" disabled   solo  id="resaltar" label="Numero de Chapa ">
            </v-text-field>
          </v-flex>
          <!--  -->

           
           <!--  -->
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
                      solo
                      :items="ordenes"
                      v-model="orden"
                      item-value="value"
                      label="Estado del Orden de Trabajo"
                    ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg6 xl6>
            <v-autocomplete
                solo
                :items="mecanicos"
                v-model="mecanico"
                item-value="descripcion"
                label="Mecanico a Cargo"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm4 md4 lg6 xl6>
            <v-text-field v-model="avisorden"  solo  id="resaltar" label="Observacion del Trabajo Realizado">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm4 md4 lg10 xl10>
            <v-text-field v-model="descripcion"  solo  id="resaltar" label="Repuestos a Utilizar">
            </v-text-field>
          </v-flex>

           <v-flex xs12 sm2 md2 lg2 xl2>
            <v-btn small fab dark color="red" @click="mostrarModalRepuestos()">
              <v-icon dark>add_task</v-icon>
            </v-btn>
          </v-flex>

         <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="stock" disabled solo  id="resaltar" label="Stock Actual">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="cantidad" solo label="Cantidad">
            </v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="precio" id="resaltar"   solo label="Precio">
            </v-text-field>
          </v-flex>

          
          <v-flex xs12 sm2 md2 lg2 xl2>
            <v-btn small fab dark color="pink accent-4" @click="agregarTabla()">
              <v-icon>
                  playlist_add</v-icon>
            </v-btn>
          </v-flex>
         <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="codigoimpuesto" v-if="2==3" label="Impuesto">
            </v-text-field>
          </v-flex>
         <v-flex xs12 sm12 md12 lg2 xl3>
            <v-text-field v-model="codigoproducto" v-if="2==3" label="cd producto">
            </v-text-field>
          </v-flex>
          
        
          <v-flex xs12 sm12 md12 lg12 xl2 v-show="errorArticulo">
            <div class="red--text" v-text="errorArticulo">

            </div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <template>
              <v-data-table
                  :headers="cabeceraDetalles"
                  :items="detalles"
                  class="elevation-1"
              >
                <template slot="items" slot-scope="props">
              <td>
                 
             <v-btn  class="mx-2"
                fab
                dark
                small
                color="purple darken-4"> <v-icon   @click="eliminarDetalle(detalles,props.item)">
              delete
            </v-icon></v-btn>
                  </td>
                  <td class="text-xs-center">{{ props.item.codigoproducto}}</td>
                  <td class="text-xs-center" >{{props.item.mecanico}}</td>
                  <td class="text-xs-center" v-if="2==3" >{{props.item.codigomecanico}}</td>
                  <td class="text-xs-center" v-if="2==3" >{{props.item.codigoimpuesto}}</td>
                  <td class="text-xs-center">{{props.item.descripcion}}</td>
                  <td class="text-xs-center">{{props.item.cantidad}}</td>
                  <td class="text-xs-center" >{{props.item.precio}}</td>
                   <td class="text-xs-center" v-if="2==3" >{{props.item.codigonivel}}</td>
                  <td class="text-xs-right">${{ (props.item.cantidad * props.item.precio)}}</td>
                </template>
                <template slot="no-data">
                  <h3>No hay artículos agregados al detalle.</h3>
                </template>
              </v-data-table>
              <v-flex class="text-xs-right">
                <strong>Total Neto:</strong> <strong>{{fromatodemoneda(subtotal=calcularTotal) }}</strong>
              </v-flex>
            </template>
          </v-flex>
          <v-flex xs12 sm12 md12 v-show="valida">
            <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
            </div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="deep-purple darken-3" dark  @click.native="ocultarNuevo()">Cancelar<v-icon>clear</v-icon></v-btn>
            <v-btn color="red " dark v-if="verDetalle==0"  @click.native="guardar()">Guardar<v-icon>save</v-icon></v-btn>
          </v-flex>
      
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      dialog: false,
      dialogrepuestos:false,
      search:'',
      ventas:[],
      recepcion:'',
      codigorecepcion:'',
      ordenes:[],
      orden:'',
      mecanico:'',
      mecanicos:[],
      repuestos:[],
      codigoproducto:'',
      cantidad:'',
      precio:'',
      stock:'',
      codigoimpuesto:'',
      descripcion:'',
      avisorden:'',
      headers: [
        
        { text: 'Opciones', value: 'opciones', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'Nro', value: 'numero', sortable: true, class: "cabecera colorCabecera--text" },
        { text: 'CHAPA  ', value: 'chapa', sortable: true,class: "cabecera colorCabecera--text",},
        { text: 'CLIENTE', value: 'RazonSocial', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'OBSERVACION ORDEN', value: 'observacionorden', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'OBSERVACION RECEPCION', value: 'observacionrecepcion', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'FECHA ORDEN', value: 'fechaemision', sortable: false,class: "cabecera colorCabecera--text"  },
         { text: 'FECHA RECEPCION', value: 'fechaentrada', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'ESTADO DEL TRABAJO', value: 'estadorden', sortable: false,class: "cabecera colorCabecera--text"  },
        // { text: 'Estado', value: 'estado', sortable: false  }
      ],
      _id:'',
      // codigonivel:'',
       dialogoConfirmacion: false,
      persona:'',
      personas:[],
      CodigoSucursal:'',
      estadorecepciones:[],
      estadorecepcion:'',
      chapa:'',
      nivelcombustible:'',
      km:'',
      observacion:'',
      nivelcombustibles:[],
      tipo_comprobante:'',
      comprobantes: ['BOLETA','FACTURA','TICKET','GUIA'],
      serie_comprobante:'',
      num_comprobante: '',
      impuesto: 0.18,
      codigo:'',
      Codigo:'',
      cliente:'',
      clientes:[],
      bandera:0,
      cabeceraDetalles:[
        { text: 'Borrar', value: 'borrar', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'Codigo Producto', value: 'codigoproducto', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'Mecanico', value: 'mecanico', sortable: false, class: "cabecera colorCabecera--text"},
        { text: 'codigomecanico', value: 'codigomecanico', sortable: false, align: ' d-none'},
        { text: 'codigoimpuesto', value: 'codigoimpuesto', sortable: false, align: ' d-none'},
        { text: 'Descripciones', value: 'descripcion', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'Cantidad', value: 'cantidad', sortable: false ,class: "cabecera colorCabecera--text" },
        { text: 'Precio', value: 'precio', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'Sub-Total', value: 'subtotal', sortable: false,class: "cabecera colorCabecera--text"  },

        // { text: 'Descuento', value: 'descuento', sortable: false },
        // { text: 'Sub Total', value: 'subtotal', sortable: false  }
      ],
      detalles:[],
      verNuevo:0,
      errorArticulo:null,
      total:0,
      totalParcial:0,
      totalImpuesto:0,
      recepciones:[],
      texto:'',
      cabeceraRecepcion: [
        { text: 'Seleccionar', value: 'seleccionar', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'CODIGO',value: 'numero', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'CHAPA',value: 'chapa', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'FECHA ENTRADA',value: 'fechaentrada', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'OBSERVACION',value: 'observaciones', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'CLIENTE',value: 'RazonSocial', sortable: true,class: "cabecera colorCabecera--text" },
        // { text: 'Estado', value: 'estado', sortable: false }
      ],
         cabeceraRepuesto: [
        { text: 'Seleccionar', value: 'seleccionar', sortable: false,class: "cabecera colorCabecera--text"  },
        { text: 'CODIGO',value: 'CodigoProducto', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'DESCRIPCION',value: 'Descripcion', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'PRECIO VENTA',value: 'PrecioVentaMinorista', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'MARCA',value: 'Marca', sortable: false,class: "cabecera colorCabecera--text" },
        { text: 'STOCK ACTUAL',value: 'StockActual', sortable: true,class: "cabecera colorCabecera--text" },
        { text: 'DEPOSITO',value: 'Deposito', sortable: true,class: "cabecera colorCabecera--text" },
        // { text: 'Estado', value: 'estado', sortable: false }
      ],
      verDetalle:0,
      valida:0,
      validaMensaje:[],
      adModal:0,
      adAccion:0,
      adNombre:'',
      adId:''
    }
  },
  computed: {
    calcularTotal: function(){
      let resultado=0.0;
      for(var i=0;i<this.detalles.length;i++){
        resultado=resultado+((this.detalles[i].cantidad*this.detalles[i].precio));
      }
      return resultado;
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogrepuestos(val){
      val || this.close()
    }
  },
  created () {
     this.listar();
     this.selecOrden();
     this.selectMecanico();
     this.selectEstado();
     this.selectNivel();
    //  this.capturarcodigo();
   // this.listarArticulos()
  },
  methods: {

    fromatodemoneda(value) {
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    selecOrden(){
      let me=this;
      let ordenArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('estadotrabajos/',configuracion).then(function (response){
        ordenArray=response.data;
        ordenArray.map(function(x){
          me.ordenes.push({text:x.codigo +" "+x.descripcion, value:x.CodigoCliente});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    selectMecanico(){
      let me=this;
      let mecanicoArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('clientes/mecanico/',configuracion).then(function (response){
        mecanicoArray=response.data;
        console.log(mecanicoArray)
        mecanicoArray.map(function(x){
          me.mecanicos.push({text:x.CodigoUsuario +" "+x.Nombre+" "+x.Apellido, value:x.CodigoUsuario});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
     selectEstado(){
      let me=this;
      let personaArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('estadorecepciones/',configuracion).then(function (response){
        personaArray=response.data;
        personaArray.map(function(x){
          me.estadorecepciones.push({text:x.descripcion,value:x.codigo});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    capturarcodigo(texto){
       const cod = texto.split(' ')[0]
       return cod
    },


    selectNivel(){
      let me=this;
      let personaArray=[];
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('nivelcombustibles/',configuracion).then(function (response){
        personaArray=response.data;
        personaArray.map(function(x){
          me.nivelcombustibles.push({text:x.codigo+" "+x.descripcion,value:x.codigo});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    buscarCodigo(){
      let me=this;
       let header = { "auth-token": this.$store.state.token };
      let configuracion = { headers: header };
      let cliente = this.cliente;
      console.log(cliente)
      axios.get('rvehiculo/'+cliente,configuracion).then(function (response){
        console.log((response.data))
     //   me.agregarDetalle(response.data);
      }).catch(function(error){
        me.errorArticulo='No existe el artículo.';
      });

    },
    // se agrega el datalle a la tabla
    agregarDetalle(data){
      this.errorArticulo=null;
      if (this.encuentra(data.chapa)==true){
        this.errorArticulo='La recepcion ya ha sido agregada.';
      }
      else{
       console.log( data.chapa)
        this.codigorecepcion= data.numero;
        this.chapa=data.chapa;
        this.observacion=data.observaciones
        this.codigo='';
      }
      this.close();
    },
     agregarDatosRepuesto(data){

        this.codigoproducto= data.CodigoProducto;
        this.descripcion=data.Descripcion;
        this.codigoimpuesto=data.CodigImpuesto;
        this.stock=data.StockActual;
        this.precio=data.PrecioVentaMinorista;

        this.close();
    },
    limpiarDatosRepuesto(){
      this.descripcion='';
      this.cantidad='';
      this.precio='';
      this.stock='';
    },
    agregarNuevo(){
        let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      console.log(this.$store.state.usuario)         
      axios.post('orden/insertardetalle',
          {
              'CodigoSucursal':this.$store.state.usuario.CodigoSucursal,
              'PuntoExpedicion':this.$store.state.usuario.PuntoExpedicion,
              'numero':this.codigorecepcion,
              'codigoestadoorden':this.capturarcodigo(this.orden),
              'observacion': this.avisorden,
              'codigoproducto':this.codigoproducto,
              'mecanico':this.mecanico,
              'codigomecanico':this.capturarcodigo(this.mecanico),
              'codigoimpuesto':this.codigoimpuesto,
              'orden': this.orden,
              'descripcion':this.descripcion,
              'cantidad':this.cantidad,
              'precio':this.precio,
          },configuracion)
          .then(function(response){
           // me.limpiarDetalle();
          })
          .catch(function(error){
            console.log(error);
          });
    },
     agregarTabla(){
       this.errorArticulo=null;
       if(this.codigoproducto==''){
         this.errorArticulo='DEBE DE SELECCIONAR UN REPUESTO';
         return;
       }
      if (this.encuentra(this.codigoproducto)==true){
            this.errorArticulo='El artículo ya ha sido agregado.';
       }else{
            if(this.bandera==1){
                this.agregarNuevo()
                this.detalles.push(
            {  
              codigoproducto:this.codigoproducto,
              mecanico:this.mecanico,
              codigomecanico:this.capturarcodigo(this.mecanico),
              codigoimpuesto:this.codigoimpuesto,
              orden: this.orden,
              descripcion:this.descripcion,
              cantidad:this.cantidad,
              precio:this.precio,
            }
        );
            }else{
              {
        this.detalles.push(
            {  
              codigoproducto:this.codigoproducto,
              mecanico:this.mecanico,
              codigomecanico:this.capturarcodigo(this.mecanico),
              codigoimpuesto:this.codigoimpuesto,
              orden: this.orden,
              descripcion:this.descripcion,
              cantidad:this.cantidad,
              precio:this.precio,
            }
        );
        this.limpiarDetalle();
       }
            }
       }
        console.log(this.detalles)
        this.limpiarDatosRepuesto()
    },
    encuentra(codigoproducto){
      let sw=0;
      for (var i=0;i<this.detalles.length;i++){
        if(this.detalles[i].codigoproducto==codigoproducto){
          sw=true;
        }
      }
      return sw;
    },
    eliminarDetalle(arr,item){
      if(this.bandera==1){
      let me=this;
      let header={ "auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.put('orden/eliminar',
      {
       'codigoproducto':item.codigoproducto,
       'cantidad':item.cantidad,
       'codigorecepcion':this.codigorecepcion
      },configuracion,).then(function (response){
    
      }).catch(function(error){
        console.log(error);
      });
      }
      let i=arr.indexOf(item);
      if (i!= -1){
        arr.splice(i,1);
      }
  
    },
    listarRecepcion(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/recepcion',configuracion).then(function (response){
        me.recepciones=response.data;
        console.log(me.recepciones)
      }).catch(function(error){
        console.log(error);
      });
    },
    listarRepuesto(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/repuesto',configuracion).then(function (response){
        me.repuestos=response.data;
        console.log(me.repuestos)
      }).catch(function(error){
        console.log(error);
      });
    },
     editar(item){
      this.bandera=1;
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/update/'+item.numero,configuracion).then(function (response){
        me.detalles=response.data;
        for (let i in me.detalles){
         me.chapa=me.detalles[i].numerochapa
         me.codigorecepcion=me.detalles[i].numero
         me.orden=me.detalles[i].estadorden
         me.mecanico=me.detalles[i].mecanico
         me.avisorden=me.detalles[i].observacion
          me.observacion=me.detalles[i].observaciones
         // console.log(me.cliente)
        }
        me.mostrarNuevo();
      }).catch(function(error){
        console.log(error);
      });
    },
    mostrarModalArticulos(){
      this.dialog=1;
      this.listarRecepcion();
    },
    mostrarModalRepuestos(){
        this.dialogrepuestos=1;
       this.listarRepuesto();
    },
    listarDetalles(){
      console.log("cliente 2")
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      cliente:this.cliente;
      console.log(cliente)
       axios.get('rvehiculo/'+cliente,configuracion).then(function (response){
        me.detalles=response.data.detalles;
      }).catch(function(error){
        console.log(error);
      });
    },
    verIngreso(item){
      this.limpiar();
      this.tipo_comprobante=item.tipo_comprobante;
      this.serie_comprobante=item.serie_comprobante;
      this.num_comprobante=item.num_comprobante;
      this.persona=item.persona._id;
      this.impuesto=item.impuesto;
      this.listarDetalles();
      this.verNuevo=1;
      this.verDetalle=1;
    },
    entregado(item) {
      let me = this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      this.numero = item.numero;
      console.log(this.numero);
      axios
          .put("orden/entregado",{ numero: this.numero},configuracion)
          .then(function(response) {
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
            console.log("error");
          });
    },
    listar(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      axios.get('orden/listar/',configuracion).then(function (response){
        me.ventas=response.data;
      }).catch(function(error){
        console.log(error);
      });

    },
    limpiarDetalle(){
      this.codigoimpuesto='';
      this.codigoproducto='';
      this.stock='';
      this.precio='';
      this.cantidad='';
      this.descripcion='';
      this.validaMensaje=[];
      this.verDetalle=0;
    },
    limpiarTodo(){
      this.recepcion = "";
      this.observacion='';
      this.codigorecepcion = "";
      this.chapa = "";
      this.orden="";
      this.mecanico='';
      this.avisorden='';
      this.codigoimpuesto='';
      this.codigoproducto='';
      this.stock='';
      this.precio='';
      this.cantidad='';
      this.repuesto='';
      this.descripcion='';
      this.detalles=[];
      this.validaMensaje=[];
      this.verDetalle=0;
    },
    validar(){
      this.valida=0;
      this.validaMensaje=[];
      if(!this.persona){
        this.validaMensaje.push('Seleccione un cliente.');
      }
      if(!this.tipo_comprobante){
        this.validaMensaje.push('Seleccione un tipo de comprobante.');
      }
      if(!this.num_comprobante){
        this.validaMensaje.push('Ingrese el número del comprobante.');
      }
      if(!this.impuesto || this.impuesto<0 || this.impuesto>1){
        this.validaMensaje.push('Ingrese un impuesto válido.');
      }
      if(this.detalles.length<=0){
        this.validaMensaje.push('Ingrese al menos un artículo al detalle');
      }
      if (this.validaMensaje.length){
        this.valida=1;
      }
      return this.valida;
    },
    mostrarNuevo(){
      this.verNuevo=1;
    },
    ocultarNuevo(){
      this.verNuevo=0;
      this.bandera=0;
      this.listar()
      this.limpiarTodo()
    },
    guardar(){
     if(this.bandera==0){
        let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
      console.log(this.$store.state.usuario)         
      axios.post('orden/guardar',
          {
            'CodigoSucursal':this.$store.state.usuario.CodigoSucursal,
            'PuntoExpedicion':this.$store.state.usuario.PuntoExpedicion,
            'numero':this.codigorecepcion,
            'codigoestadoorden':this.capturarcodigo(this.orden),
            'observacion': this.avisorden,
            'detalles':this.detalles
          },configuracion)
          .then(function(response){
            me.dialogoConfirmacion = true;
            me.limpiarDetalle();
            me.limpiarTodo();
            me.close();
            me.listar();
            me.ocultarNuevo();
          })
          .catch(function(error){
            console.log(error);
          });
     }else{
       this.ocultarNuevo()
       console.log("es una modificacion")
     }
    },
    activarDesactivarMostrar(accion,item){
      this.adModal=1;
      this.adNombre=item.num_comprobante;
      this.adId=item._id;
      if (accion==1){
        this.adAccion=1;
      } else if(accion==2){
        this.adAccion=2;
      } else{
        this.adModal=0;
      }
    },
    activarDesactivarCerrar(){
      this.adModal=0;
    },

    close () {
      this.dialog = false;
      this.dialogrepuestos=false;
    }
  }
}
</script>

<style>
#resaltar{
  color: brown;
  font-weight: 600;
}
strong{
  color: brown;
  font-weight: 600;
  font-size: 20px;
}
</style>