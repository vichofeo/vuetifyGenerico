<template>
    <v-card class="mx-auto">
        
            
                <v-tabs v-model="tab"  background-color="transparent" color="basil" grow>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab  color="primary">Modulos</v-tab>
                    <v-tab >Controllers</v-tab>
                    <v-tab >Config Modulos</v-tab>
                    <v-tab >Roles</v-tab>
                    <v-tab >Rol-Modulo</v-tab>
                </v-tabs>
            
                <v-main>
                <v-container >
                    <v-row dense>
                        <v-col cols="12" xs="12" sm="12" xl="12" md="12" lg="12">
                            <v-tabs-items v-model="tab">
                                <v-tab-item > <crud-module/>         </v-tab-item>
                                <v-tab-item > <crud-controller/></v-tab-item>
                                <v-tab-item > <crud-configmca/> </v-tab-item>
                                <v-tab-item > <crud-rol/> </v-tab-item>
                                <v-tab-item > <crud-rol-module/> </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>

        
        
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
  