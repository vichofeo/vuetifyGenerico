<template>
  <v-app >
    <v-img src="img/fondooscuro.svg" >
      <v-main>

        <v-container fluid fill-height class="mt-10">
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 lg4>
              <v-card class="elevation-20 pa-3">
                <v-card-text>
                  <div>
                    <img src="img/logo.png" alt="Epidemiologia SSCP" width="180" height="180" />
                  </div>
                  <v-form>
                    <v-text-field append-icon="mdi-account" name="login" label="Login" type="text" v-model="usuario.login"
                      :error="error" :rules="[rules.required]"></v-text-field>

                    <v-text-field :type="hidePassword ? 'password' : 'text'"
                      :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'" name="password" label="Password"
                      id="password" :rules="[rules.required]" v-model="usuario.password" :error="error"
                      @click:append="hidePassword = !hidePassword"></v-text-field>
                  </v-form>
                  <p>{{ usuario }}</p>
                </v-card-text>
                <div>
                  <button @click="ingresar()" :loading="loading">Ingresar</button>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-snackbar v-model="showResult" :timeout="2000" top>
          {{ result }}
        </v-snackbar>
      </v-main>
    </v-img>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import * as srv from "@/services/admin/adminService";
// import miColor from "../../colores"

export default {
  props: {
    source: String,
  },
  data() {
    return {
      ancho: screen.width,
      alto: screen.height,
      c_txtA: "blue--text",
      c_txtB: "white--text",
      usuario: {
        login: "aorlp",
        //login: 'chapare'   ,
        password: "sadmin",
      },
      loading: false,
      showResult: false,
      result: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
      hidePassword: true,
      error: false,
    };
  },
  methods: {
    async ingresar() {
      const vm = this;

      if (!vm.usuario.login || !vm.usuario.password) {
        vm.result = "Login & Password no puede ser vacio.";
        vm.showResult = true;

        return;
      }
      try {
        //envia daros
        const result = await srv.login(vm.usuario);



        if (result.ok) {
          const dataSession = {
            access_token: result.access_token,
            usr: result.usuario,
          };
          localStorage.setItem("token", btoa(JSON.stringify(dataSession)));
          /**
           * redireccion en funcion al rol ganado
           */
          vm.$router.push({ name: "ssepi" });

        } else {
          vm.error = true;
          vm.result = "Login o Password incorrecto.";
          vm.showResult = true;
        }
      } catch (error) {
        console.log(error);
        vm.result =
          "Ocurrio un error en el proceso. Comuniquese con el administrador de sistema";
        vm.showResult = true;
      }
    },
  },
};
</script>

<style scoped lang="css">
button{
  background:#1D62A1;
  color:#fff;
  border:none;
  position:relative;
  height:45px;
  font-size:1.6em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
}
button:hover{
  background:#fff;
  color:#1D62A1;
}
button:before,button:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:3px;
  width:0;
  background: #1D62A1;
  transition:1000ms ease all;
}
button:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
button:hover:before,button:hover:after{
  width:100%;
  transition:1000ms ease all;
}

div{
  width:100%;
  text-align: center;
}
</style>
