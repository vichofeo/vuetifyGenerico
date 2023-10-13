<template>
    <v-card    >
        <v-card-text>
            <div  class="font-weight-black">
            <!--
            <v-avatar  size="50">
                <v-img src="@/assets/logoAsuss_.png" class="mb-6"></v-img>                
            </v-avatar>
            -->
            Datos Casa Matriz/Sucursal 
        </div>
            <div class="text-h6 ">
                Nombre Comercial: {{ sucursal.nombreComercial }}
            </div>
            <div class="blue--text ">
                Tipo: {{ sucursal.tipo }}
            </div>
            <div class="blue--text ">
                NIT: {{ sucursal.nit }}
            </div>
            <div class="blue--text subheading font-weight-bold">
                Direccion: {{ sucursal.direccion }}
            </div>
        
        <v-divider/>
        
            <div class="text-center">
            <span class="text-right" tag="strong" >
                Telefono:
            </span>
            <span>{{ sucursal.telefono }}</span>
        </div>
        <div class="text-center"> 
            <span class="text-right" tag="strong" >
                Celular:
            </span>
            <span>
                {{ sucursal.celular }}
            </span>
            </div>
            <div class="text-center">
            <span class="text-right" tag="strong" >
                Email:
            </span>
            <span>
                {{ sucursal.email }}
            </span>
            </div>

        
    </v-card-text>
    </v-card>
</template>

<script>
export default {

    props:{matrizSucursal:{type:Object, default:{}}},
    data() {
        return {
            
        }
    },
    computed: {
        sucursal(){
            return this.matrizSucursal
        }
    },
}
</script>

<style></style>