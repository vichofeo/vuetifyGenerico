<template>
<lugar-persona/>
</template>
  
<script>
import Persona from '@/components/generics/Persona.vue';
import CrudLicense from '@/components/pageAdmin/CrudLicense.vue';
import Hospitalizacion from '@/components/generics/Hospitalizacion.vue';
import Laboratorio from '@/components/generics/Laboratorio.vue';
import Vacunas from '@/components/generics/Vacunas.vue';
import LugarPersona from '@/components/generics/LugarPersona.vue';



export default {
  components: { Persona, CrudLicense, Hospitalizacion, Laboratorio, Vacunas, LugarPersona },
    
    data: () => ({
        tab: null,
        
    }),

    computed: {},

    methods: {
        clickTab(op) {            
            this.tab = "t4"
        },
        saveData(data) {            
            this.tab = "t1"

        }
    },
};
</script>
  
<style></style>
  