<template>
    <v-menu :key="`menuDIM001`" rounded="LG" offset-y left transition="slide-x-transition">
        <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }" dark>
                    <v-avatar  tile v-bind="attrs" v-on="{ ...tooltip, ...menu }" dark>
                        <v-icon color="blue darken-3" size="25">{{ icon }} </v-icon>
                    </v-avatar>
                </template>
                <span>Servicios {{ $store.state.optionsServiceInterOp.selectedMore.title }}</span>
            </v-tooltip>
        </template>

        <v-list dense class="text-sm-left" light nav>
            <v-subheader class="font-weight-black" style="color: #1d62a1">Servicios {{ $store.state.optionsServiceInterOp.selectedMore.title }}</v-subheader>

            <v-list-item-group color="#1D62A1">
                <v-list-item v-for="(o, j) in $store.state.optionsServiceInterOp.options" 
                :key="o.title" @click="optionSelect(o)">
                    
                    <v-list-item-content>
                        <v-list-item-title>{{ o.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
               
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    props:{
        icon:{type:String, default: "mdi-account-settings"}
    },
data() {
    return {
        
    }
},
methods: {
    optionSelect(obj) {
            const tmp = this.$store.state.optionsServiceInterOp
            this.$store.dispatch('updateOptionsServiceInterOp', { ...tmp, selected: obj })
        },
},
}
</script>

<style></style>