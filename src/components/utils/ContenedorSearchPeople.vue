<template>
    <!--    <div class="grey lighten-5 " > -->
    <div class="pa-2">
        <search-people-box :onClick="onClick" :requeridos="requeridos" :extension="extension" />
        <div class="pa-2">
            <v-card-text>
                <v-row dense no-gutters>
                    <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12">
                        <alert-box :mensaje="mensaje" :typeAlert="typeAlert" />
                        <slot />
                    </v-col>
                </v-row>
                <br/>
            </v-card-text>
            <loading :swLoading="swLoader" />

        </div>
        
    </div>
</template>

<script>
import SearchPeopleBox from './SearchPeopleBox.vue'


import Loading from './Loading.vue'
import AlertBox from './AlertBox.vue';





export default {
    components: {
        SearchPeopleBox,
        Loading,
        AlertBox,

    },
    props: {
        onClick: { type: Function, default() { return null; } },
        typeAlert: { type: String, default: 'success' },

        mensaje: { type: String, default: null },
        swLoader: { type: Boolean, default: false },
        requeridos: { type: Array, default: () => ([1, 0, 0]) },
        extension: { type: Boolean, default: false }
    },
    data() {
        return {
            //swLoader: false,
            //    mensaje: null,
            swAlert: false,
            //typeAlert: 'success'
        }
    },
    methods: {

    },
    watch: {

    }

}
</script>
<style scoped>
.paddingBody2 {
    padding: 1em;
}
</style>