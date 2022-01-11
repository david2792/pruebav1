<template>
  <div class="auth-wrapper auth-v1 justify-space-between">
    <v-img
              :src="require('@/assets/images/3d-characters/pose-m-1.jpg')"
              max-height="800px"
              max-width="800px"
              alt="logo"
              contain
              class=" hidden-xs-only hidden-sm-only"
            ></v-img>

    <div fluid class="auth-inner d-block" align="center" id="logi" >
      <v-card class="auth-card " >
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-8">
       
            <v-img
              :src="require('@/assets/inicio.jpeg')"
              max-height="100px"
              max-width="100px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Zorulla Regalos
            </h2>
         
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Bienvenido al Sistema! 👋🏻
          </p>
          <p class="mb-2">
            Por favor iniciar sesion para ingresar al Sistema
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="usuario"
              outlined
              label="USUARIO"
              placeholder="AMINISTRADOR"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="hidePassword ? 'password' : 'text'"
              label="Password"
              placeholder="············"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <v-btn
              block
              color="blue"
              class="mt-6"
              dark
              id="bt"
              @click="ingresar()" :loading="loading"
            >
              Acceder
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Tienes problema con el acceso?
          </span>
          <router-link>
          
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social links -->
        <v-card-actions class="d-flex justify-center">
        
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
 
    <!-- tree  -->
   
  </div>
</template>
<style>
#bt{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  border-radius: 10px;
}
#logi{
  
  padding:0;
  
}
</style>
<script>
// estilos 
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import axios from 'axios';
export default {

  data() {
    return {
      loading: false,
      datosUsuario:'',
      rol:'',
      users:'',
      usuario: '',
      password: '',
      errorM:null,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      step: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  props: {
    source: String
  },
   methods: {
    ingresar(){
            let me =this;
            axios.post('usuario/login',{usuario: this.usuario, password: this.password})
            .then(respuesta =>{
            console.log(respuesta)
            console.log(respuesta.data.tokenData)
            return respuesta.data;
            }).then(data=>{
           
             this.$store.dispatch("guardarToken",data.token);
              this.$router.push({name:'Bienvenida'})
            })
            .catch(error =>{
              
              
                    this.errorM='No existe el usuario o las credenciales son   incorrectas.';
               
            });
    },
  }
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>