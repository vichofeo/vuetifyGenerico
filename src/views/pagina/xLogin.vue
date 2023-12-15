<template>
  <v-app id="login" class="primary">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="img/logo.svg" alt="Epidemiologia SSCP" width="180" height="180" />
                  <h1 class="flex my-4 primary--text text-center">
                    Area Epidemiologia Bioestadistica
                  </h1>
                </div>
                <v-form>
                  <v-text-field append-icon="mdi-account" name="login" label="Login" type="text" v-model="usuario.login"
                    :error="error" :rules="[rules.required]"></v-text-field>
  
                  <v-text-field :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'" name="password" label="Password" id="password"
                    :rules="[rules.required]" v-model="usuario.password" :error="error"
                    @click:append="hidePassword = !hidePassword"></v-text-field>
                </v-form>
                <p>{{ usuario }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn block color="primary" @click="ingresar()" :loading="loading">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="showResult" :timeout="2000" top>
        {{ result }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import * as srv from "@/services/admin/adminService";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      usuario: {
        login: "aorsc",
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
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
