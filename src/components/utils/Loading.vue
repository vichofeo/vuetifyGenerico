<template>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
            <v-card-text>
                Buscando informacion.....
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props:{
swLoading : {type:Boolean, default: false }
    },
    data() {
        return {
            dialog: false,
        }
    },

    watch: {
        swLoading(val) {
            this.dialog = val            
        },
    },
}
</script>