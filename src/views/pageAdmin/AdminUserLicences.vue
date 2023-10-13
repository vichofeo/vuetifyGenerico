<template>
    <v-card class="mx-auto">
        <v-layout>
            <v-app-bar density="compact" :elevation="1">
                <v-tabs v-model="tab" density="compact" bg-color="transparent" color="basil">
                    <v-tab value="t1" color="primary" bg-color="error">Credenciales</v-tab>
                    
                </v-tabs>
                <v-app-bar-title>Login Password</v-app-bar-title>
            </v-app-bar>

            <v-main>
                <v-container fluid>
                    <v-row dense>
                        <v-col cols="12" xs="12" sm="12" xl="12" md="12" lg="12">
                            <v-window v-model="tab">
                                <v-window-item value="t1"> 
                                <crud-license/>
                                </v-window-item>

                                
                            </v-window>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>
  
<script>
import Persona from '@/components/generics/Persona.vue';
import CrudLicense from '@/components/pageAdmin/CrudLicense.vue';



export default {
  components: { Persona, CrudLicense },
    
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
  