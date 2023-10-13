<template>
    <v-card class="mx-auto">
        <v-layout>
            <v-app-bar density="compact" :elevation="1">
                <v-tabs v-model="tab" density="compact" bg-color="transparent" color="basil">
                    <v-tab value="t1" color="primary" bg-color="error">Modulos</v-tab>
                    <v-tab value="t2">Controllers</v-tab>
                    <v-tab value="t3">Config Modulos</v-tab>
                    <v-tab value="t4">Roles</v-tab>
                    <v-tab value="t5">Rol-Modulo</v-tab>
                </v-tabs>
                <v-app-bar-title>Config</v-app-bar-title>
            </v-app-bar>

            <v-main>
                <v-container fluid>
                    <v-row dense>
                        <v-col cols="12" xs="12" sm="12" xl="12" md="12" lg="12">
                            <v-window v-model="tab">
                                <v-window-item value="t1"> 
                                    <crud-module/>
                                </v-window-item>

                                <v-window-item value="t2"> <crud-controller/></v-window-item>

                                <v-window-item value="t3"> <crud-configmca/> </v-window-item>
                                <v-window-item value="t4"> <crud-rol/> </v-window-item>
                                <v-window-item value="t5"> <crud-rol-module/> </v-window-item>
                            </v-window>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>
  
<script>
import CrudModule from '@/components/pageAdmin/CrudModule.vue';
import CrudController from '@/components/pageAdmin/CrudController.vue';
import CrudConfigmca from '@/components/pageAdmin/CrudConfigmca.vue';
import CrudRol from '@/components/pageAdmin/CrudRol.vue';
import CrudRolModule from '@/components/pageAdmin/CrudRolModule.vue';


export default {
    components: { CrudModule, CrudController, CrudConfigmca, CrudRol, CrudRolModule},
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
  