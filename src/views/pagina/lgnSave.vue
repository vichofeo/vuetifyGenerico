<template>
  <div>
    <form name="formulario">
      <v-container >
        <v-card class="pa-2 text-center">
          <h1 class="text-h5 font-weight-black">INFORMACION</h1>
        </v-card>

        <v-row>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card elevation="5" class="mt-2 mr-2 pa-2" width="100%">
              <h5 class="blue--text pa-3">INSTITUCION</h5>
              <v-card-text>
                <div>Institucion</div>
                <v-text-field
                  :label="getInfIns.nombre_institucion"
                  :disabled="true"
                ></v-text-field>

                <div>Cuidad</div>
                <v-text-field
                  :label="getInfIns.ciudad"
                  :disabled="true"
                ></v-text-field>

                <div>Direccion</div>
                <v-text-field
                  :label="
                    'Z/ ' +
                    getInfIns.zona_barrio +
                    ' Av/ ' +
                    getInfIns.avenida_calle
                  "
                  :disabled="true"
                ></v-text-field>

                <div>Telefono</div>
                <v-text-field
                  :label="getInfIns.telefono"
                  :disabled="true"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card elevation="16" class="mt-2 mr-2 pa-2" width="100%">
              <h5 class="blue--text pa-3">USUARIO</h5>
              <v-card-text>
                <div>Nombre</div>
                <v-text-field
                  :label="
                    getInfUser.nombres +
                    ' ' +
                    getInfUser.primer_apellido +
                    ' ' +
                    getInfUser.segundo_apellido
                  "
                  :disabled="true"
                ></v-text-field>

                <div>DNI</div>
                <v-text-field
                  :label="getInfUser.dni_persona"
                  :disabled="true"
                ></v-text-field>

                <div>Fecha Nacimiento</div>
                <v-text-field
                  :label="getInfUser.fecha_nacimiento"
                  :disabled="true"
                ></v-text-field>

                <div>Correo Electronico</div>
                <v-text-field
                  :label="getInfUser.mail"
                  :disabled="true"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card elevation="16" class="mt-2 pa-2" width="100%">
              <h5 class="blue--text pa-3">CONTRASEÑA</h5>
              <v-card-text>
                <div>Usuario</div>
                <v-text-field
                  :label="getInfLgn.login"
                  :disabled="true"
                ></v-text-field>

                <div>Nueva contraseña</div>
                <v-text-field
                  v-model="info.pass"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="mas de 8 caracteres"
                  :counter="30"
                  @click:append="show1 = !show1"
                ></v-text-field>

                <div>Confirmar Contraseña</div>
                <v-text-field
                  v-model="info.pass2"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  hint="mas de 8 caracteres"
                  :counter="30"
                  @click:append="show2 = !show2"
                ></v-text-field>

                <v-btn class="mr-4 white--text" @click="submit" color="blue">
                  Guardar
                </v-btn>
                <v-btn class="mr-4 white--text" @click="clear" color="blue">
                  Borrar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

import * as srv from "@/services/ssepi/lgnService";

import MensajeriaUtils from "@/components/utils/MensajeriaUtils";

export default {
  mixins: [validationMixin],

  data: () => ({
    getInfUser: [],
    getInfLgn: [],
    getInfIns: [],
    info: {
      pass: "",
      pass2: "",
    },
    show1: false,
    show2: false,
    rules: {
      required: (value) => !!value || "Es requerido",
      min: (v) => v.length >= 8 || "mas de 8 caracteres",
    },
  }),

  computed: {
    // passError() {
    //   const errors = []
    //   if (!this.$v.pass.$dirty) return errors
    //   !this.$v.pass.maxLength && errors.push('Maximo 30 caracteres')
    //   !this.$v.pass.required && errors.push('es requerido')
    //   return errors
    // },
  },

  validations: {
    info: {
      pass: { required, minLength: minLength(8) },
      pass2: { required, minLength: minLength(8) },
      // pass2: { required, sameAs: sameAs(this.info.pass) },
    },
  },

  methods: {
    //async
    async submit() {
      const mensajeria = new MensajeriaUtils(this.$toast);
      try {
        if (this.$v.$invalid) {
          mensajeria.setMensaje("No cumplen con los requisitos");
          mensajeria.advertencia();
          return false;
        }
        if (this.info.pass != this.info.pass2) {
          mensajeria.setMensaje("No igualan las contraseña");
          mensajeria.advertencia();
          return false;
        } else {
          //construyendo el json
          const datos = {
            pass: this.info.pass,
          };
          //enviando la nueva contraseña
          const result = await srv.saveContrasena(datos);
          mensajeria.setMensaje("se cambio la contraseña");
          mensajeria.exito();
          this.$router.push("/");
        }
      } catch (error) {
        mensajeria.setMensaje("un error");
        mensajeria.error();
        console.log(error);
      }
    },

    clear() {
      this.$v.$reset();
      this.info.pass = "";
      this.info.pass2 = "";
    },

    async getInfUserj() {
      try {
        const result = await srv.getLgnUser();
        if (result.ok) {
          this.getInfLgn = result.data;
          this.getInfUser = result.usr;
          this.getInfIns = result.institucion;

          console.log(result.message);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(result.message);
      }
    },
  },

  mounted() {
    this.getInfUserj();
  },
};
</script>

<style></style>
