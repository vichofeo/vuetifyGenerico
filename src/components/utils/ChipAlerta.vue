<template>
    <span>
        <v-chip class="ma-2"  color="red" text-color="white" v-if="mensaje=='Vencido'">
            <v-avatar left>
                <v-icon>mdi-close-octagon</v-icon>
            </v-avatar>
            {{ mensaje }}
        </v-chip>
        <v-chip class="ma-2"  color="orange" text-color="white" v-else-if="mensaje=='Vencimiento proximo'">
            <v-avatar left>
                <v-icon>mdi-alert-circle</v-icon>
            </v-avatar>
            {{ mensaje }}
        </v-chip>
        <v-chip class="ma-2"  color="teal" text-color="white" v-else-if="mensaje=='Vigente'">
            <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            {{ mensaje }}
        </v-chip>
        <span v-else-if="mensaje=='N/A'">
&nbsp;
        </span>
        <span v-else>{{ mensaje }}</span>

    </span>
</template>

<script>
export default {
    name: "chipAert",
    props: {
        mensaje: { type: String, default: '-1', },
    },
    data() {
        return {

        }
    },
}
</script>

<style></style>