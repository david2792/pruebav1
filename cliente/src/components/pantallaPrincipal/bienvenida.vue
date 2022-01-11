
<template>
    <v-layout align-start justify-center wrap >
      <v-flex  xs12 sm12 md12 lg12 xl12 fluid>
     <h4 class="display-1 font-weight-bold mb-3" align="center">BIENVENIDO AL SISTEMA</h4>
    </v-flex>   
      <!--  -->
    <v-row
     :align="align"
        no-gutters
        style="height: 150px;">
       <v-col cols="4">
          <v-card
            color="light-blue darken-2"
            dark
            elevation="20"
            
            outlined
            shaped
          >
            <v-card-title class="text-h5">
              Gestionar Productos
            </v-card-title>

            <v-card-subtitle>Los productos se pueden agregar y modificar.</v-card-subtitle>

            <v-card-actions>
              <v-btn text link :to="{name:'producto'}">
                Nuevo
              </v-btn>
                <v-btn text>
                Listar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card
            color="#947296"
            dark
            elevation="20"
            loading
            outlined
            shaped
          >
            <v-card-title class="text-h5">
              Gestionar Productos
            </v-card-title>

            <v-card-subtitle>Los productos se pueden agregar y modificar.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>
                Nuevo
              </v-btn>
                <v-btn text>
                Listar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card
            color="#947296"
            dark
            elevation="20"
            loading
            outlined
            shaped
          >
            <v-card-title class="text-h5">
              Gestionar Productos
            </v-card-title>

            <v-card-subtitle>Los productos se pueden agregar y modificar.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>
                Nuevo
              </v-btn>
                <v-btn text>
                Listar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

    </v-row>
          
    </v-layout>

    
 
</template>
<script>
export default {
  data: () => ({
  
  }),

  computed: {
      listar() {
          let rol =this.$store.state.usuario.Nombre;
         return rol
         // console.log(idproducto)
        },
  },
    methods: {
        // listar() {
        //   let rol =this.$route.params.rol;
        //  return rol
        //  // console.log(idproducto)
        // },
}
}
</script>

<style>
h4{
 padding-top: 1em; 
}

.v-card{
 padding-top: 1em; 
 margin: 1em;
}
</style>
