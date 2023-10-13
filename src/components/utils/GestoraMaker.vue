<template>
    <div v-if="verifica">
        <gestora-people-box v-if="persona"/>
        
        <gestora-box v-if="empresa"/>
    </div>
    <div v-else>
        Error de disenio opcion no valida, comuniquese con el administrador. {{ this.$store.state.optionsServiceInterOp.selected.op }}
    </div>
</template>

<script>
import GestoraBox from './GestoraBox.vue'
import GestoraPeopleBox from './GestoraPeopleBox.vue'



export default {
    name: "OvtMaker",
    components: { GestoraBox, GestoraPeopleBox },
    
    data () {
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
                case 'GR':
                    this.persona = true
                    r = true
                    break;
                case 'GE':
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