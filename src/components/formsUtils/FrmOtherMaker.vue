<template>
    <persona v-if="type == '1'" />
    <hospitalizacion v-if="type == '2'" />
    <vacunas v-if="type == '3'" />
    <laboratorio v-if="type == '4'" />
    <lugar-persona v-if="type == '5'" :label="`Lugar probable de Infeccion`"/>
    <contactos v-if="type == '6'" />
</template>

<script>
import Contactos from '../generics/Contactos.vue'
import Hospitalizacion from '../generics/Hospitalizacion.vue'
import Laboratorio from '../generics/Laboratorio.vue'

import Persona from '../generics/Persona.vue'
import Vacunas from '../generics/Vacunas.vue'
import LugarPersona from '../generics/LugarPersona.vue'
export default {
    components: { Persona, Hospitalizacion, Vacunas, Laboratorio, Contactos, LugarPersona },
    name: "FrmsOthers",
    props: {
        type: { type: String, default: null }
    }
}
</script>

<style></style>