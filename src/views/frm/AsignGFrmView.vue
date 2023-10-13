<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <!--
        <list-box :label="cLabel[i]" 
        :items="obj" 
        :selected="cSelected[i]"
          :onChange="getInfoCombos" 
          v-for="(obj, i) in comboxes"
          /> -->
        <v-combobox v-model="cSelected[ii]" :items="obj" :label="cLabel[ii]" class="ml-auto" density="compact"
          v-for="(obj, ii) in comboxes" @update:model-value="getInfoCombos()" :key="'comboxes_' + ii">
          <template v-slot:selection="data">
            <v-chip variant="text" :key="JSON.stringify(data.item)" v-bind="data.attrs" :model-value="data.selected"
              :disabled="data.disabled" size="small" @click:close="data.parent.selectItem(data.item)">
              <template v-slot:prepend>
                <v-avatar color="primary" class="bg-accent text-uppercase" start>{{
                  data.item.title.slice(0, 1)
                }}</v-avatar>
              </template>
              {{ data.item.title }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col>
        <h4>Entidades de salud</h4>
        <v-list lines="one" density="compact">
          <v-list-item v-for="item in hospitales" :key="item.establecimiento" :title="item.establecimiento"></v-list-item>
        </v-list>
      </v-col>

      <v-col>
        
          <v-row dense>
            <v-col cols="10">
              <list-box
                :label="`Seleccione un Grupo - Formulario`"
                :items="grpItems"
                :selected="grpSelected"
                :onChange="onChangeGrp"
              />
            </v-col>
           
          </v-row>
          <v-row dense>
            <v-col cols="10">
              <list-box
                :label="`Seleccione Formulario`"
                :items="frmItems"
                :selected="frmSelected"
                :onChange="onChangeFrm"
              /> </v-col
            >
          </v-row>
        
        

        <v-btn color="success" @click="saveData">Guardar asignacion</v-btn>
      </v-col>


    </v-row>
  </v-container>

  <!-- ************ loader ************* -->
  <v-dialog v-model="swLoader" hide-overlay persistent width="300" style="z-index: 29990000">
    <v-card color="primary" dark>
      <v-card-text>
        Buscando datos
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import * as poly from "@/service/multiPolygon.service";
import ListBox from "@/components/formsUtils/ListBox.vue";
import * as srv from "@/service/GetData";
import * as sv from "@/service/SaveData";
export default {
  components: { ListBox },
  data: () => ({
    grpSelected: {},
    grpItems: [],
    frmSelected: {},
    frmItems: [],
    cSelected: [
      //{ value: "B - Seguridad Social (CAJAS)", title: "B - Seguridad Social (CAJAS)" },
      { value: "Seguridad Social (CAJAS)", title: "Seguridad Social (CAJAS)" },
      { value: "-1", title: "-Todos-" },
      { value: "-1", title: "-Todos-" },
      { value: "-1", title: "-Todos-" },
      { value: "-1", title: "-Todos-" },
      { value: "-1", title: "-Todos-" },
      { value: "-1", title: "-Todos-" },
      { value: "-1", title: "-Todos-" },
    ],
    comboxes: [],
    swLoader: false,
    cLabel: [],
    hospitales: [],

    indexCSelected: -1,
  }),
  methods: {
   
    async getInfoCombos() {

      this.swLoader = true;
      const res = await poly.getCombox(this.cSelected);


      this.cSelected = res.body.listSelect.map((obj) => ({
        value: obj.value,
        title: obj.text,
      }));


      const aux = res.body.listBox;
      this.comboxes = aux.map((obj) => {
        return obj.map((o) => {
          return {
            value: o.value,
            title: o.text,
          };
        });
      });

      this.cLabel = res.body.listLabel;

      this.hospitales = res.body.hospitales;
      this.indexCSelected = res.body.indexDpto;
      this.swLoader = false;
      console.log(this.hospitales)
    },


    async onChangeGrp(data) {
      this.grpSelected = data;
      const res = await srv.getFormularios(data);

      const frmAux = res.selected;
      this.frmItems = res.items;   

      
      this.onChangeFrm(frmAux)
      
    },
    async onChangeFrm(data) {
      //alamcena en memoria el frmSeleccionado
      this.frmSelected = data;      

    },
    async initData() {
      const res = await srv.getGrupoForms();

      this.grpItems = res.items;
      this.grpSelected = res.selected;

      this.onChangeGrp(this.grpSelected);
    },

    async saveData(){
      const grp = this.grpSelected.value
      const frm = this.frmSelected.value
      const esalud = this.hospitales.map(obj =>(obj.codigo))

      const dato = {frm: frm, esalud: esalud}
      
      await sv.registrarEsaludFrm(dato)
    }

  },
  created() {
    this.getInfoCombos();
    this.initData();
  },
};
</script>

<style></style>
