<template>
    <div v-if="verifica">
        
        <Transition>
            <KeepAlive>
                <component :is="componente"></component>
            </KeepAlive>
        </Transition>
    </div>
    <div v-else>
        Error de disenio opcion no valida, comuniquese con el administrador. {{
            this.$store.state.optionsServiceInterOp.selected.op }}
    </div>
</template>

<script>



import SegipBox from './SegipBox.vue'
import SegipContrastacion from './SegipContrastacion.vue'


export default {
    components: {  SegipBox , SegipContrastacion},
    name: "SegipMaker",


    data() {
        return {
            componente: null
        }
    },
    computed: {
        verifica() {
            const op = this.$store.state.optionsServiceInterOp.selected.op
            let r = false
            this.persona = false
            this.empresa = false
            switch (op) {
                case 'S':
                    this.componente = 'SegipBox'
                    r = true
                    break;
                case 'C':
                this.componente = 'SegipContrastacion'
                    r = true
                    break
                default:
                    r = false
                    break;
            }

            return r
        }
    },
}
</script>

<style></style>