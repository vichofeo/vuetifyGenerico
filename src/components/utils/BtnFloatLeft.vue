<template>
    <div id="settings-wrapper">
        <v-card id="settings" class="py-2 px-4" 
        color="rgba(128, 222, 234, .3)" dark flat link min-width="100" style="
        position: fixed;
        top: 180px;
        left: -35px;
        border-radius: 8px;
        z-index: 1;
      ">
            <div class="text-right">
                <v-avatar class="profile"  tile>
                                <v-img src="/img/logo_asuss.png"></v-img>
                            </v-avatar>
            </div>
        </v-card>

        <v-menu v-model="menu" :close-on-content-click="false" activator="#settings" bottom content-class="v-settings" right
            nudge-right="8" offset-x origin="top left" transition="scale-transition">
            <v-card class="text-center mb-0 mx-auto overflow-y-auto" width="300" max-height="calc(150vh - 400px)"
                min-height="400px">
                <v-card-text>                    
                    <v-row class="px-2 ml-auto" >
                        <v-col align-self="center" class="pa-0" cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
                            <v-avatar class="profile" color="white" tile>
                                <v-img src="/img/logo_asuss.png"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
                            <strong class="mb-1 d-inline-block">Sala Situacional</strong>
                            <div class="text-caption">UTIC-SSCP/ASUSS</div>
                        </v-col>
                    </v-row>

                    <v-divider class="my-4 secondary" />
                    <slot></slot>

                    <v-divider class="my-4 secondary" />

                    <div>
                        <strong class="mb-3 d-inline-block">Unidad de Epidemiologia - Sala Situacional
                            Infraestructura</strong>
                    </div>
                </v-card-text>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: "DashboardCoreSettings",

    data: () => ({
        menu: false,
    }),
};
</script>

<style lang="sass">
.v-settings
  .v-item-group > *
    cursor: pointer

  &__item
    border-width: 3px
    border-style: solid
    border-color: transparent !important

    &--active
      border-color: #00cae3 !important
</style>
