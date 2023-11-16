<template>
    <v-container >
        
        <v-row>
            <v-card>
                <v-card-title>
                    <v-img
  max-width="50"
  :src="hosp"
></v-img>
<v-divider></v-divider>
<v-img
  max-width="50" 
  :src="asu"
></v-img>
                </v-card-title>
                
    <div v-for="(obj, i) in data" :key="'aku'+i" class="font-weight-regular">
        
    <div><strong> laboratorio:</strong>  {{ obj.hl7.ORU_R01.MSH['MSH.3']['HD.1'] }}</div>
    <div><strong>Nombre y Apellidos:</strong>  {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.5']['XPN.1']['FN.1'] }} 
      {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.5']['XPN.1']['FN.2'] ? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.5']['XPN.1']['FN.2'] : '' }}
      {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.5']['XPN.2'] }}
    </div>
    <div><strong>Genero:</strong>  {{ JSON.stringify(obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.8']) }}</div>
    <div v-if="obj.hl7.ORU_R01.MSH['MSH.7']"><strong>fecha de laboratorio:</strong> {{ obj.hl7.ORU_R01.MSH['MSH.7']['TS.1'] }}</div>
    <div><strong>Procedencia:</strong> {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.11']? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.11']['XAD.3']: ''}}  - 
      {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.11']? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.11']['XAD.4']: ''}}  - 
      {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.11']? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.PATIENT'].PID['PID.11']['XAD.5']: ''}}  - 
      

    </div>
    
    <div><strong>Establecimiento:</strong> {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].ORC['ORC.21']? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].ORC['ORC.21']['XON.1']:'' }}</div>
    <div><strong>Codigo rues hospital:</strong> {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].ORC['ORC.26'] }}</div>
    <div><strong>Medico solicitante:</strong> {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].ORC['ORC.8'] ? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].ORC['ORC.8']['EIP.1']['EI.1']:'' }}</div>
    <div><strong>Codigo:</strong> {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].ORC['ORC.2']? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].ORC['ORC.2']['EI.1']:'' }}</div>
    <div><strong>Trabajo:</strong> {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].OBR['OBR.4'] ? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].OBR['OBR.4']['CE.2'] : '' }}  
      {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].OBR['OBR.3'] ? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].OBR['OBR.3']['EI.2'] : '' }} 
      {{ obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].OBR['OBR.44']? obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION'].OBR['OBR.44']['CE.2']:'' }}
    </div>

    <v-container class="grey lighten-5">
        <v-row no-gutters v-for="(o,j) in obj.hl7.ORU_R01['ORU_R01.PATIENT_RESULT']['ORU_R01.ORDER_OBSERVATION']['ORU_R01.OBSERVATION']" :key="'obss'+j">
          
      <v-col
      v-for="(oo, ii) in o.OBX" :key="'tdss'+ii" 
      >      
        <v-card
          class="pa-2"
          outlined
          tile
        >
        
          {{ii=='OBX.3' ? `${oo['CE.1']}  ${oo['CE.2']}  ${oo['CE.3']? '('+oo['CE.3']+')':'' }`  : (ii=='OBX.12'? oo['TS.1']: (ii=='OBX.6'? oo['CE.1']: oo)) }}
        </v-card>
      </v-col>
    </v-row>
    </v-container>


    </div>
    
</v-card>
        </v-row>
        
    </v-container>
 
</template>

<script>
import * as srv from "@/services/hl7Service";
import hospital from "@/assets/hospital.png"
import asuss from "@/assets/logo_asuss.png"
export default {
  data() {
    return {
      data: [],
      hosp: hospital,
      asu : asuss
    };
  },

  created() {
    this.initial();
  },

  methods: {
    async initial() {
      const result = await srv.getData();
      this.data = result.message;
    },
  },
};
</script>
