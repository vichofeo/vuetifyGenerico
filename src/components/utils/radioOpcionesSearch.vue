<template>
    <v-row align="start" align-content="start" justify="center" v-if="valido" dense no-gutters>
        <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12" class="text-center" align-self="center">
            <b-form-group class="text-caption" >
                <b-form-radio-group id="btn-radios-2" 
                    v-model="$store.state.optionsServiceInterOp.selected"
                    :options="labelOptions()"  
                    button-variant="outline-success"  
                    size="sm"
                    name="radio-btn-outline" buttons
                    @input="optionSelect"
                    
                    />
            </b-form-group>
        </v-col>
    </v-row>
</template>

<script>

export default {
    data() {
        return {
            switch1: true,
            opcion: this.$store.state.optionsServiceInterOp.index,
            
        }
    },
    mounted() {


    },
    methods: {
        optionSelect(obj) {
            //console.log("entragdo", obj)
            const tmp = this.$store.state.optionsServiceInterOp
            //const obj = this.$store.state.optionsServiceInterOp.index ? this.$store.state.optionsServiceInterOp.options[1] : this.$store.state.optionsServiceInterOp.options[0]

            this.$store.dispatch('updateOptionsServiceInterOp', { ...tmp, selected: obj })
        },
        labelOptions() {
            return this.$store.state.optionsServiceInterOp.options.map((obj, i) => ({ text: `  ${obj.title}`, value: obj }))
        }
    },
    computed: {
        valido() {
            return this.$store.state.optionsServiceInterOp.options && this.$store.state.optionsServiceInterOp.options.length > 1;
        },
        
    },


}
</script>

<style></style>