<template>
    <div v-if="datosBenefio" class="text-caption text--primary">  
        <v-responsive>
        <v-treeview open-all :items="items" activatable color="warning">
            <template v-slot:prepend="{ item }">                
                <v-icon v-if="!item.children" :color="item.ci.indexOf(selectPersona.ci.trim())>0 ? 'red':'teal '">
                    mdi-human-male-female-child
                </v-icon>
                <v-icon v-else :color="'green darken-3'">
                    mdi-account
                </v-icon>

            </template>
            <template v-slot:label="{ item }">
                <div :class="item.children ? 'teal lighten-1 white--text': 'teal lighten-4 '">  {{ item.parentesco }} </div>
               <div>   {{item.nombre}}  </div>
                <div color="primary">  {{item.ci}}  ( {{item.fn}} )   <c-chip-color-estado :datos="item.estado" v-if="item.estado"/> </div>                
            </template>            
        </v-treeview>
    </v-responsive>              
    </div>
</template>

<script>
import CChipColorEstado from '../asegurado/utils/CChipColorEstado.vue'



export default {
  components: { CChipColorEstado },

    props: {
        datosBenefio: { type: Object, default: {} },
        selectPersona: {type: Object, default: {}}
    },

    data: () => ({


    }),

    computed: {
        items() {
            const datos = [{
                ...this.datosBenefio.titular,
                id: 0,                
                name: this.datosBenefio.titular.nombres,
                children: Array.isArray(this.datosBenefio.beneficiarios) ? this.datosBenefio.beneficiarios.map((obj, i) => ({
                    id: i + 1,
                    name: obj.nombres,
                    ...obj
                })) : []
            }
            ]
            return datos
        },

    },

    watch: {

    },

    methods: {


    },
}
</script>

