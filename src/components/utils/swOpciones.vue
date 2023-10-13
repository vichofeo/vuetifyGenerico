<template>
    
        <v-switch v-if="valido" color="primary"
            :label="label"
            v-model="$store.state.optionsServiceInterOp.index" 
            value="1"             
            hide-details
            @click="optionSelect()"
            :success="$store.state.optionsServiceInterOp.index?true:false"
            :error="$store.state.optionsServiceInterOp.index?false:true"
            >
        </v-switch>
        
    
</template>

<script>
export default {
    data() {
        return {
            switch1: true,
            opcion: this.$store.state.optionsServiceInterOp.index
        }
    },
    mounted() {

        
    },
    methods: {
        optionSelect() {
            const tmp = this.$store.state.optionsServiceInterOp
            const obj = this.$store.state.optionsServiceInterOp.index ? this.$store.state.optionsServiceInterOp.options[1] : this.$store.state.optionsServiceInterOp.options[0]

            this.$store.dispatch('updateOptionsServiceInterOp', { ...tmp, selected: obj  })
        },
    },
    computed: {
        valido() {                        
            return this.$store.state.optionsServiceInterOp.options && this.$store.state.optionsServiceInterOp.options.length > 1;
        },
        label() {            
            //this.optionSelect()
            return this.$store.state.optionsServiceInterOp.index ? this.$store.state.optionsServiceInterOp.options[1].title : this.$store.state.optionsServiceInterOp.options[0].title
        }
    },
    
}
</script>

<style></style>