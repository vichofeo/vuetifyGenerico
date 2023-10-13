<template>
    <contenedor-alert dismissible outlined :type="typeAlert" prominent border="left" v-model="swAlert">
        {{ mensaje }}
    </contenedor-alert>
</template>

<script>
import ContenedorAlert from './ContenedorAlert.vue'
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
    components: { ContenedorAlert },
    props: {
        mensaje: { type: String, default: '-Sin Mensaje. Error de disenio-' },
        typeAlert: { type: String, default: 'info' }
    },
    data() {
        return {
            swAlert: false,
        }
    },
    methods: {
        async pauseMessage() {
            this.swAlert = true
            if (this.typeAlert != "error") {
                await pause(7000)
                this.swAlert = false
            }
        },
    },
    watch: {
        mensaje(newVal, OldVal) {
            this.swAlert = false
            if (newVal) {
                this.pauseMessage()
            }
        }
    }
}
</script>

<style></style>