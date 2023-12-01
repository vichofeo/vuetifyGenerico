<template>
    <div v-if="items && headers">
        <v-data-table :headers="datosHeaders" :items="datos" v-model="itemSelected"
        item-key="idl" 
        :item-class="row_classes" 
        :page.sync="page"
        :items-per-page="itemsPerPage" 
            :single-select="true"
            show-select
            >
            <template v-slot:item.data-table-select="{ isSelected, select, item }">
                    <v-simple-checkbox :color="opColor" :value="isSelected"
                        @input="select($event); ">
                    </v-simple-checkbox>
                </template>   
        </v-data-table>
      
        
    </div>
</template>
<script>
export default {
    name: "tableData",
    props: {
        headers: { type: Array, default: [] },
        items: { type: Array, default: [] },
        opColor: { type: String, default: 'teal' },        
        itemsPerPage: {type:Number, default: 5},
        value: { type: Array, default: [] },
    },
    data() {
        return {
            //itemSelected: [],
            expanded: [],
            page: 1,
            pageCount: 0,
            //itemsPerPage: 5,
            grillaColor: ['blue', 'teal', 'green', 'amber', 'orange', 'red']
        }
    },
    methods: {
        row_classes(item) {
            return (item.idl % 2) ? "white" : this.opColor + " lighten-5"
        },
        row_classesExpand(item) {
            return (item.idl % 2) ? "white manito" : this.opColor + " lighten-5 manito"
        },
        viewExpand(item, event) {
            if (event.isExpanded) {
                const indexExpanded = this.expanded.findIndex(i => i === item);
                this.expanded.splice(indexExpanded, 1)
            } else {
                this.expanded.push(item);
            }
        }

    },
    computed: {
        datos() {
            return this.items.map((obj, i) => ({ ...obj, idl: i }))
        },
        datosHeaders() {
            return this.headers.map(o => ({ ...o, class: `${this.opColor} darken-2 font-weight-light white--text` }))
        },

  
    itemSelected: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  
    }
}
</script>