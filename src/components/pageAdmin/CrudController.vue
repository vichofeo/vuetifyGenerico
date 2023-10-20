<template>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>SubModulo - Controller</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nuevo Submodulo 
            </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="editedItem.controller" label="Clave Controller"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="editedItem.nombre_submodulo" label="Nombre Submodulo"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="editedItem.path_page" label="Path de acceso"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="editedItem.descripcion_submodulo" label="Breve descripcion"></v-text-field>
                                  </v-col>   
                                  <v-col cols="12" sm="6" md="6">
                                      <v-text-field v-model="editedItem.base_folder" label="Folder Base"></v-text-field>
                                  </v-col>   
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Esta usted seguro de borrar este item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import * as srv from "@/services/admin/ConfigPageService"
export default {
    data: () => ({
        dialog: false,
    dialogDelete: false,
        headers: [
            { text: 'Clave SubModuloe', value: 'controller' },
          { text: 'Nombre', value: 'nombre_submodulo' },
          { text: 'Path Acceso', value: 'path_page' },
          { text: 'Descripcion', value: 'descripcion_submodulo' },
          { text: 'Base Folder', value: 'base_folder' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            controller: '',
          nombre_submodulo: '',
          path_page: '',
          descripcion_submodulo: '',
          base_folder:''

        },
        defaultItem: {
            controller: '',
          nombre_submodulo: '',
          path_page: '',
          descripcion_submodulo: '',
          base_folder:''
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Submodulo' : 'Editar SubModulo'
        },
    },

    watch: {
        dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    },

    created() {
        this.initialize()
    },

    methods: {
        async initialize() {
            try {
                const result = await srv.getSubModules()
                if (result.ok)
                    this.desserts = result.data
                else this.desserts = []
            } catch (error) {
                console.log(error);
            };


        },

        editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

        closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
        },

        async save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                //graba informacion
                let result = await srv.saveSubModule( this.editedItem)
                if(result.ok){
                    result = await srv.getSubModules()
                this.desserts = result.data
            }else this.desserts
            }
            this.close()
        },
    },
}
</script>