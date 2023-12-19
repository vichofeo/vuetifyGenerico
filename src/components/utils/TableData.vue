<template>
    <div v-if="items && headers">
        <v-data-table :headers="datosHeaders" :items="datos" item-key="idx" :item-class="row_classes" :page.sync="page"
            :items-per-page="itemsPerPage" hide-default-footer @page-count="pageCount = $event" disable-sort v-if="!expand">
            <template v-slot:footer v-if="items.length > itemsPerPage">
                &nbsp;
                <b-pagination v-model="page" :total-rows="items.length" :per-page="itemsPerPage" aria-controls="my-table"
                    pills>
                </b-pagination>&nbsp;
            </template>
        </v-data-table>
        <!-- epand dtable --> 
        <v-data-table :headers="datosHeaders" :items="datos" single-expand :expanded.sync="expanded" item-key="idx"
            class="elevation-1" :item-class="row_classesExpand" :page.sync="page" :items-per-page="itemsPerPage"
            hide-default-footer @page-count="pageCount = $event" disable-sort @click:row="viewExpand" v-else>

            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" class="grey lighten-5">
                    <slot name="xpnd" :item="item"></slot>
                </td>
            </template>
                        
            <template v-slot:footer v-if="items.length > itemsPerPage">
                &nbsp;
                <b-pagination v-model="page" :total-rows="items.length" :per-page="itemsPerPage" aria-controls="my-table"
                    pills>
                </b-pagination>&nbsp;
            </template>

        </v-data-table>
        <div v-if="items.length <= itemsPerPage">&nbsp;</div>
    </div>
</template>
<script>
export default {
    name: "tableData",
    props: {
        headers: { type: Array, default: [] },
        items: { type: Array, default: [] },
        opColor: { type: String, default: 'teal' },
        expand: { type: Boolean, default: false },
        itemsPerPage: {type:Number, default: 5}
    },
    data() {
        return {
            expanded: [],
            page: 1,
            pageCount: 0,
            //itemsPerPage: 5,
            grillaColor: ['blue', 'teal', 'green', 'amber', 'orange', 'red']
        }
    },
    methods: {
        row_classes(item) {
            return (item.idx % 2) ? "white" : this.opColor + " lighten-5"
        },
        row_classesExpand(item) {
            return (item.idx % 2) ? "white manito" : this.opColor + " lighten-5 manito"
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
            return this.items.map((obj, i) => ({ ...obj, idx: i }))
        },
        datosHeaders() {
            return this.headers.map(o => ({ ...o, class: `${this.opColor} darken-2 font-weight-light white--text` }))
        }
    }
}
</script>