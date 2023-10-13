<template>
    <div class="pa-2">
        <search-empresa-box :onClick="onClick" :type="typeSearch" />
        <v-card-text class="pa-2">
            
                <v-row dense no-gutters class="pa-2">                    
                    <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12" class="pa-2">
                        
                        <alert-box :mensaje="mensaje" :typeAlert="typeAlert"/>
                        <slot />
                        <br/>
                    </v-col>
                </v-row>
            
            <loading :swLoading="swLoader" />
            
        </v-card-text>
        
    </div>
</template>
<script>

import { optionsToast } from './toastOptions.js'


import Loading from './Loading.vue'
import SearchEmpresaBox from './SearchEmpresaBox.vue';
import AlertBox from './AlertBox.vue';





export default {
    components: {
        Loading,
        SearchEmpresaBox,
        
        AlertBox
    },
    props: {
        onClick: { type: Function, default() { return null; } },
        typeAlert: { type: String, default: 'success' },
        mensaje: { type: String, default: null },
        swLoader: { type: Boolean, default: false }
    },
    data() {
        return {
            //swLoader: false,
            //mensaje: null,
            swAlert: false,
            //typeAlert: 'success'
        }
    },
    methods: {
        
       

        showAdvertencia(mensaje) {
            this.$toast.warning(mensaje, optionsToast)
        },
        showInfo(mensaje) {
            this.$toast.info(mensaje, optionsToast)
        },
        showError(mensaje) {
            this.$toast.error(mensaje, optionsToast)
        },

    },
    computed: {
        typeSearch() {
            return this.$store.state.optionsServiceInterOp.selected.op
        }
    },

    watch: {
        
    }


}
</script>
