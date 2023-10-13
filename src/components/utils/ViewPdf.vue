<template>
    <v-dialog v-model="showModalPdf" width="70%" persistent transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="text-h5 primary text-white">
                CERTIFICADO <v-spacer />
                <v-btn icon dark @click="onClick">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <object type="application/pdf" :data="certificadoPdf" height="500" width="100%"></object>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="onClick"> CERRAR </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        showModalPdf: { type: Boolean, default: false },
        certificadoPdf: { type: String, default: '' }
    },
    data() {
        return {

        }
    },
    methods: {
        onClick() {
            this.showModalPdf = false
            this.$emit("click", this.showModalPdf)
        }
    },
}
</script>

<style></style>