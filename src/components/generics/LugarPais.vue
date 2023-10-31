<template>
  <div>
    <div class="form-group">
    <label>Pais</label>
    <select v-model="paisSelected.value" class="form-control" @change="getDptos">
      <option v-for="option in paisItems" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>

  <div class="form-group">
    <label>Departamento</label>
    <select v-model="dptoSelected.value" class="form-select" @change="getMuni">
      <option v-for="option in dptoItems" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>

  <div class="form-group">
    <label>Localidad/Municipio</label>
    <select v-model="muniSelected.value" class="form-select" @change="setMuni">
      <option v-for="option in muniItems" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
  </div>
</template>

<script>
import * as srv from "@/services/admin/PdplService";

export default {
  props: {
    selected: { type: Object, default: () => ({ p: "", d: "", m: "" }) },
    name: { type: String, default: "lugar" },
    setLugar: {
      type: Function,
      default() {
        return "Default function";
      },
    },
  },

  data: () => ({
    paisSelected: {},
    paisItems: [],
    dptoSelected: {},
    dptoItems: [],
    muniSelected: {},
    muniItems: [],
  }),
  methods: {
    async getPais(data) {
      //obtiene lsta de paises, pais por defecto
      const result = await srv.getPais([this.paisSelected]);
      const results = result.data
      this.paisSelected = results.selected;
      this.paisItems = results.items;

      this.getDptos(this.paisSelected);
    },
    async getDptos() {
      //obtiene lista de municipios con select de Dpto y mun por defecto      
      const result = await srv.getDpto([this.paisSelected, this.dptoSelected]);
      const results = result.data
      this.dptoSelected = results.selected;
      this.dptoItems = results.items;

      this.getMuni(this.dptoSelected);
    },
    async getMuni() {
      //setea municipio defecto
      const result = await srv.getMuni([this.paisSelected, this.dptoSelected, this.muniSelected]);
      const results = result.data
      this.muniSelected = results.selected;
      this.muniItems = results.items;
      this.setMuni(this.muniSelected);
    },

    setMuni(dato) {
      //dato: municipio seleccionado
      this.setLugar({
        [`${this.name}`]: {
          pais: this.paisSelected.value,
          dpto: this.dptoSelected.value,
          muni: this.muniSelected.value,
        },
      });
    },
    setVarsLocal(selected){
        this.paisSelected =  {value: selected.p}
        this.dptoSelected =  {value: selected.d}
        this.muniSelected =  {value: selected.m}
    }
  },

  mounted() {   
    this.setVarsLocal(this.selected)     
    this.getPais();
  },
  watch: {
    selected: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.setVarsLocal(newValue)
        this.getPais();
      },
    },
  },
};
</script>

<style></style>
