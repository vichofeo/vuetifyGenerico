<template>
  <v-form>
    <v-container fluid>
        {{ dataLgn }}
      <v-row>
       

        <v-col cols="12" sm="6">
          <v-text-field
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Visible"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show2 = !show2"
            v-model="dataLgn.login"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Not visible"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show3 = !show3"
            v-model="dataLgn.hash"
          ></v-text-field>
        </v-col>

       
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import * as srv2 from "@/services/admin/lgnService";
export default {
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      dataLgn: {}
    };
  },
  mounted(){
this.getDataLgn()
  },
  methods: {
    async getDataLgn() {
      try {
        const result = await srv2.getUsrDataLgn();
        //alert("su conexion: " + result.aplicacion.nombre_aplicacion);
        if (result.ok) {
            this.dataLgn= result.data
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
