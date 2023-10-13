<template>
  {{ label }}
  <VueDatePicker
    v-model="dateDefault"
    auto-apply
    model-type="yyyy-MM-dd"
    :start-date="startDatePicker"
    aria-placeholder="Seleccione una Fecha"
    :enable-time-picker="false"
    position="left"
    @update:model-value="onChange"
  ></VueDatePicker>
  {{ dateDefault }}
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  props: {
    name: {type: String, default:"defaultCalendar"},
    label: { type: String, default: "" },
    yyyymmdd: { type: String, default: null },
    //startDatePicker: { type: String, default: () => new Date() },
    setFunction: {
      type: Function,
      default() {
        return "Default function";
      },
      
    },
  },
  components: { VueDatePicker },
  setup(props) {
    const data = props.yyyymmdd;
    let dateDefault = null;
    if (data) 
      dateDefault = ref(data);
    else {
      let d = new Date();

      dateDefault = ref(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    }

    return { dateDefault };
  },
  methods: {
    onChange(data) {
      this.setFunction({[`${this.name}`]: this.dateDefault});
    },
  },
};
</script>

<style></style>
