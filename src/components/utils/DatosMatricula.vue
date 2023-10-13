<template>
    <v-card>
        <v-card-text>
            <div class="font-weight-black">
                <v-avatar size="50">
                    <v-img src="@/assets/logoSeprec.png" class="mb-6"></v-img>
                </v-avatar>
                Informacion de matricula
            </div>
            <div class="text-h6 text-center" >
                {{ RazonSocial }}
            </div>
            <!-- div class="text-center blue--text">
                <span class="text-right" tag="strong">
                    Matricula:
                </span>
                <span>{{ obj.IdMatricula }}</span>
            </div>
            <div class="text-center blue--text ">
                <span class="text-right" tag="strong">NIT: </span>
                <span>{{ obj.Nit }}</span>
            </div -->
        </v-card-text>
        <v-row class="text-left blue--text ">
            <v-col class="text-right " tag="strong" cols="6">
                Matricula :
            </v-col>
            <v-col>{{ obj.IdMatricula }}</v-col>
            <v-col class="text-right " tag="strong" cols="6">
                NIT:
            </v-col>
            <v-col class="text-left">
                {{ obj.Nit }}
            </v-col>

        </v-row>
        <v-card-actions v-if="indexControl >= 0">
            <v-btn text @click="clickHere(indexControl)" rounded color="success">
                Click para seleccionar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        matricula: { type: Object, default: {} },
        indexControl: { type: Number, default: -1 },
        clickIndex: { type: Function, default: null }
    },
    data() {
        return {
            obj: null
        }
    },
    computed: {
        RazonSocial() {
            this.obj = this.matricula
            return this.obj.RazonSocial
        }
    },
    methods: {
        clickHere(value) {
            this.clickIndex(value)
        }
    },

}
</script>

<style></style>