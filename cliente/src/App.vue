
<template>
   <div id="app"></div>
</template>

<template>
  <v-app id="app">
   <template v-if="!$route.path.includes('login')">
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.mdAndUp"
      v-if="logueado" 
    >
      <v-list dense>
         <template v-if="esAdministrador">

        </template>
        <!-- nuevo menu -->
          <v-list-item link :to="{name:'Bienvenida'}">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title><h3>Inicio</h3></v-list-item-title>
      </v-list-item>

      <v-list-group
        prepend-icon="account_circle" 
      >
        <template v-slot:activator>
          <v-list-item-title><h3>Referenciales</h3></v-list-item-title>
        </template>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content >
              <v-list-item-title ><h3>Personas</h3></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="{name:'cliente'}">
            <v-list-item-title><h3>Cliente</h3></v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title><h3>Usuarios</h3></v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <!-- otro menu -->
          <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title><h3>Productos</h3></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="{name:'producto'}">
            <v-list-item-title>Repuestos</v-list-item-title>
            <v-list-item-icon>
              <v-icon>add</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Usuario</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
          <!-- fin -->
          <!--  menu localidades -->
          <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title><h3>Localidades</h3></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>Cliente</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Usuario</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
          <!-- fin -->
           <!--  menu Taller -->
          <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title><h3>Taller</h3></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link>
            <v-list-item-title>Cliente</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Usuario</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
          <!-- fin -->

          <!--  menu Compras -->
          <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title><h3>Compras</h3></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="{name: 'vistacompras'}">
            <v-list-item-title>Compras</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{name: 'VistaProveedor'}">
            <v-list-item-title>Proveedor</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{name: 'formaspago'}">
            <v-list-item-title>Formas de Pago</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
          <!-- fin menu Compras -->
          <!-- Informes -->
          <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title><h3>Informes</h3></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="{name: 'Filtro_orden'}">
            <v-list-item-title>Orden Compras</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Recepciones</v-list-item-title>
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
          <!-- fin Informes -->
      </v-list-group>
            <!--fin menu-->
      <!-- otro menu -->
       <v-list-group
        prepend-icon="account_circle" 
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title><h3>Stock</h3></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item link :to="{name:'producto'}">
          <v-list-item-content>
            <v-list-item-title><h3>Repuestos</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link :to="{name:'servicio'}">
          <v-list-item-content>
            <v-list-item-title><h3>Servicios</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list-group>
      <!-- fin -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      color="light-blue darken-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>Sistema Comercial</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="m-8" @click="salir()" icon v-if="logueado">
        <v-icon>logout</v-icon>
      </v-btn>
      <v-btn :to="{name: 'login'}" icon v-else>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-app-bar>
    </template>
    
    <!-- aqui va el contenido -->
      <v-content>
         <keep-alive :include="['Login']">
            <router-view></router-view>
         </keep-alive>
      </v-content>
    <!-- fin -->
   
    <!-- aqui termina el contenido -->
  
  </v-app>
  
</template>

<script>
  export default {
    name: "App",
    data() {
      
      return{
        drawer: true,
        background: false,
      };
     
    }, 
  computed: {
    
    bg () {
        return 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
      },
    logueado() {
   return this.$store.state.usuario;
    },
    esAdministrador() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.descripcion == "ADMINISTRADOR"
      );
       
    },
    esAlmacenero() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol == "Almacenero"
      );
    },
    esVendedor() {
      return (
        this.$store.state.usuario && this.$store.state.usuario.NivelUsuario == "Vendedor"
      );
    }
  },    
    created () {
      this.$vuetify.theme.dark = false
       this.$store.dispatch("autoLogin");
    },
     methods: {
    salir() {
      this.$store.dispatch("salir");
      console.log("limpiar")
      localStorage.clear();
    }
  }
  }
</script>
<style>
h3{
  font-size: 17px;
}
</style>