<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <div
          style="
            height: 91vh;
            width: 100%;
            vertical-align: middle;
            align-items: center;
            position: fixed;
            top: 50px;
          "
        >
          <l-map
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            :bounds="bounds"
            style="height: 100vh; z-index: 0"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
            :key="forceRender"
          >
            <l-tile-layer :url="mapUrl" />

            <!--
              l-geo-json :geojson="primaryCoord" :options-style="primaryStyles()" :key="uuid()" /
              -->
            <l-marker
              v-for="(icon, index) in eess"
              :key="icon.idx"
              :visible="icon.visible"
              :draggable="icon.draggable"
              :lat-lng.sync="icon.coordenadas"
              @dblclick="inner2Click(icon, index)"
              @click.right ="inner1Click(icon, index)"
            >
              <l-icon
                :icon-size="[ICON_SIZE.normal, ICON_SIZE.normal]"
                :icon-anchor="[ICON_SIZE.normal / 2, ICON_SIZE.normal]"
                :icon-url="ICONS[icon.nivel_atencion]"
                :data-id="uuid()"
                :data-status="false"
              />
              <l-tooltip v-if="icon.opPopup" :key="uuid()">
                {{ icon.nombre_institucion }} <br />
                {{ icon.telefono }} {{ icon.direccion_web }} <br />
                {{ icon.nombre_departamento }} {{ icon.zona_barrio }}
                {{ icon.avenida_calle }} <br />
                {{ icon.clase }} - {{ icon.nivel_atencion }}
                <div v-if="!icon.sw">
                  <i>Doble click para editar ubicacion </i>
                </div>
                <div v-else><i>Doble click guardar nuevas coordenadas </i>
                <span>Click derecho para editar</span>
                </div>
              </l-tooltip>
            </l-marker>
          </l-map>
        </div>
      </v-col>
    </v-row>

    <!-- ************ loader ************* -->
    <v-dialog v-model="swLoader" hide-overlay persistent width="300" style="z-index: 10">
      <v-card color="primary" dark>
        <v-card-text>
          Buscando datos
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ************* CRUD FRM -->
    <frmDataGralCRUD v-model="dialog" :idx="idxDialog" :modelo="modelDialog" v-if="dialog"/>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { latLng, latLngBounds } from "leaflet";
import * as srv from "@/services/ssepi/geoRefDataService";

import n1 from "@/assets/1ERNIVEL.png";
import n2 from "@/assets/2DONIVEL.png";
import n3 from "@/assets/3ERNIVEL.png";
import n4 from "@/assets/NBANCOSANGRE.png";
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LMarker,
  LIcon,
  LTooltip,
  LPopup,
} from "vue2-leaflet";
import FrmDataGralCRUD from '@/components/inputs/frmDataGralCRUD.vue';

export default {
  name: "Georeferencia",
  components: { LMap, LTileLayer, LGeoJson, LMarker, LIcon, LTooltip, LPopup, FrmDataGralCRUD },
  data: () => ({
    frm: null,

    zoom: 6,
    centerMap: null,
    center: [-16.290154, -63.588653],
    currentZoom: 6.5,
    currentCenter: latLng(-16.290154, -63.588653),
    mapOptions: {
      zoomSnap: 0.5,
      maxZoom: 17,
      minZoom: 2,
    },
    mapUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    bounds: null,

    forceRender: uuid(),
    latLngEESS: [],
    eess: {},
    ICON_SIZE: {
      small: 16,
      normal: 32,
      large: 64,
    },
    ICONS: {
      ["1ERNIVEL"]: n1,
      ["2DONIVEL"]: n2,
      ["3ERNIVEL"]: n3,
      NBANCOSANGRE: n4,
    },
    swLoader: false,
    ctrlDblClick: {
      delay: 500,
      clicks: 0,
      timer: null,
    },
    dialog: false,
    idxDialog: null,
    modelDialog: "eess"
  }),
  mounted() {
    this.verifyOption();
    this.initial();

    //obtiene datos del mapa
  },
  methods: {
    iconDraggable(obj) {
      this.eess = this.eess.map((o, index) => {
        if (o.idx != obj.idx) {
          return {
            ...o,
            opPopup: false,
            visible: false,
            sw: false,
          };
        } else return { ...obj, draggable: true, opPopup: false, sw: true };
      });
    },
    iconRestoreDraggable() {
      this.eess = this.eess.map((o, index) => {
        return {
          ...o,
          opPopup: false,
          visible: true,
          sw: false,
          draggable: false,
        };
      });
    },
    innerClick(obj, index) {
      this.ctrlDblClick.clicks++;
      if (this.ctrlDblClick.clicks === 1) {
        let self = this
        this.ctrlDblClick.timer = setTimeout(function () {          
          self.ctrlDblClick.clicks = 0;
          self.inner1Click(obj,index)
        }, this.ctrlDblClick.delay);
      } else {
        clearTimeout(this.ctrlDblClick.timer);
        this.ctrlDblClick.clicks = 0;
        this.inner2Click(obj, index)           
      }
    },
    inner2Click(obj, index) {
      
      //oculta iconos
      this.eess[index].sw ? this.iconRestoreDraggable(): this.iconDraggable(obj);
      //reorienta pantalla
      this.zoom = 7;
      this.bounds = latLngBounds([[obj.latitud, obj.longitud]]);
      //verifica estado de sw para edicion
      
      if (!this.eess[index].sw) {
        //envia para grabado
        this.grabaCoordenadas(obj);
      }
    },

    inner1Click(obj, index) {
      
      if (this.eess[index].sw) {        
        this.idxDialog = this.eess[index].idx
        this.dialog = true

        
      } else {
        return;
      }
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    async grabaCoordenadas(obj) {
      try {
        const result = await srv.postDataLatLngEess(obj);
        
        this.obtieneDataLatLgn();
      } catch (error) {
        console.log(error);
      }
    },
    initial() {
      try {
        //centrea mapa
        this.centerMap = latLng(this.center[0], this.center[1]);
        this.obtieneDataLatLgn();        
      } catch (e) {
        console.log("error en la formacion y adquision de datos");
        console.log(e);
      }
    },
    verifyOption() {
      if (this.$route.params.idx) this.frm = this.$route.params.idx;
      else this.frm = "all";
    },

    async obtieneDataLatLgn() {
      try {
        const result = await srv.getDataLatLngEess(this.frm);
        if (result.ok) {
          this.eess = result.data.map((obj, i) => {
            return {
              ...obj,
              coordenadas: latLng(obj.latitud, obj.longitud),
              draggable: false,
              visible: true,
              opPopup: true,
              sw: false,
            };
          });
          this.center = latLng(result.cnf.center[0], result.cnf.center[1]);
          this.zoom = result.cnf.zoom;
          
          this.forceRender = this.uuid();
        } else {
          console.log("sindatos");
        }
      } catch (error) {
        console.log(error);
      }
    },

    uuid() {
      uuid();
    },
    async markerClick(obj, recargar) {
      this.swLoader = true;
      try {
        console.log(obj);
        alert("hizo clic");
      } catch (e) {
        console.log(e);
      }
      this.swLoader = false;
    },
  },
  beforeRouteUpdate(to, from) {
    // just use `this`
    this.frm = to.params.idx;
    this.obtieneDataLatLgn();
  },
  
};
</script>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";

body {
  margin: 0;
  padding: 0;
}

.columns {
  margin: 0 !important;
  padding: 0;
}

.floatInfo {
  position: absolute;
  top: 3%;

  left: 8%;
  width: 17%;
  z-index: 2;
  background: rgba(200, 200, 200, 0.6);
  box-shadow: 0 5px 8px 3px rgb(0 0 0 / 10%);
}

.float {
  position: absolute;
  top: 0;
  right: 0;

  z-index: 1;
  background: rgba(200, 200, 200, 0.6);
  box-shadow: 0 5px 8px 3px rgb(0 0 0 / 20%);
}

button {
  box-shadow: 0 0 4px 2px rgb(0 0 0 / 20%);
}

.tooltip {
  .title {
    font-size: 22px;
    color: #000000;
  }

  .subtitle {
    font-size: 14px;
    color: #000000;
  }
}

.modal {
  z-index: 10;

  img {
    width: 100%;
    height: auto;
  }
}

.points {
  width: 80px;
  text-align: center;
  padding: 1px;
  margin: 4px;
  color: #ffffff;
  border-radius: 5px;
  user-select: none;
}

.success {
  background: rgba(0, 200, 0, 0.4);
}

.fail {
  background: rgba(20, 0, 200, 0.4);
}

.total-prov {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  text-align: center;
  padding: 1px;
  margin: 4px;
}
</style>
