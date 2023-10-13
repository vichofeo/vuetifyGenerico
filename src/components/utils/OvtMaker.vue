<template>
    <div v-if="verifica">
        <ovt-box v-if="persona"/>
        <ovt-emp-box v-if="empresa"></ovt-emp-box>
    </div>
    <div v-else>
        Error de disenio opcion no valida, comuniquese con el administrador. {{ this.$store.state.optionsServiceInterOp.selected.op }}
    </div>
</template>

<script>
import OvtBox from './OvtBox.vue'
import OvtEmpBox from './OvtEmpBox.vue'

export default {
    name: "OvtMaker",
    components: { OvtBox, OvtEmpBox },
    
    data() {
        return {
            persona: false,
            empresa: false
        }
    },
    computed: {
        verifica() {
            const op = this.$store.state.optionsServiceInterOp.selected.op
            let r = false
            this.persona = false
            this.empresa = false
            switch (op) {
                case 'P':
                    this.persona = true
                    r = true
                    break;
                case 'E':
                    this.empresa = true
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