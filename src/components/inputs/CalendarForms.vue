<template>
  <v-menu
    ref="comboDate"
    v-model="comboDate"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="fecha_nacimiento"
        :label="label"
        :hint="`Formato dd/mm/aaaa`"
        v-mask="'##/##/####'"
        placeholder="dd/mm/aaaa"
        persistent-hint
        prepend-inner-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
        @blur="
          date = parseDate(fecha_nacimiento);
          fullName = parseDate(fecha_nacimiento);
        "
        background-color="#ffffff"
        required
        dense
        clear-icon="mdi-close-circle"
        clearable
      />
    </template>
    <v-date-picker
      color="#1D62A1"
      v-model="date"
      locale="es-US"
      :max="
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      "
      min="1930-01-01"
      @input="comboDate = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";
/**
 * input d calendario name, label, fechha inicial
 */
export default {
  props: {
    label: { type: String, default: "-Unknow-" },
    value: { type: String, default: "" },
  },

  data: () => ({
    valid: true,
    fecha_nacimiento: null, //(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

    comboDate: false,
  }),
  computed: {
    /*computedDateFormatted() {
      return this.formatDate(this.date);
    },*/
    dataSelected: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    date: {
      // getter
      get: function () {
        return this.value;
      },
      // setter
      set: function (newValue) {
        //this.pipi = newValue
        this.$emit("input", newValue);
      },
    },
  },
  mounted() {
    const data = this.date;
    this.fecha_nacimiento = null;
    if (data) {
      this.fecha_nacimiento = this.formatDate(data);
    } else {
      let d = new Date();
      this.fecha_nacimiento = `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}`; //ref(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
      this.date = this.fecha_nacimiento;
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    onChange() {
      const datos = {};
      datos.fechaNacimiento = null;
      datos.FechaNacimiento = null;
      if (this.fecha_nacimiento != null && this.fecha_nacimiento != "") {
        //if (this.validateDate(this.fecha_nacimiento))
        if (moment(this.fecha_nacimiento, "DD/MM/YYYY", true).isValid()) {
          datos.fecha_nacimiento = moment(
            this.fecha_nacimiento,
            "DD/MM/YYYY"
          ).format("YYYY-MM-DD");
          datos.fechaNacimiento = this.fecha_nacimiento;
          datos.FechaNacimiento = datos.fecha_nacimiento;
        }
      }
    },
    validateDate(fechaIn) {
      const DATE_REGEX = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
      const CURRENT_YEAR = new Date().getFullYear();

      /* Comprobar formato dd/mm/yyyy, que el no sea mayor de 12 y los días mayores de 31 */
      if (!fechaIn.match(DATE_REGEX)) {
        return false;
      }

      /* Comprobar los días del mes */
      const day = parseInt(fechaIn.split("/")[0]);
      const month = parseInt(fechaIn.split("/")[1]);
      const year = parseInt(fechaIn.split("/")[2]);
      const monthDays = new Date(year, month, 0).getDate();
      if (day > monthDays) {
        return false;
      }

      /* Comprobar que el año no sea superior al actual*/
      if (year > CURRENT_YEAR) {
        return false;
      }
      return true;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  watch: {
    date(val) {
      this.fecha_nacimiento = this.formatDate(this.date);
      this.onChange();
    },
  },
};
</script>

<style></style>
