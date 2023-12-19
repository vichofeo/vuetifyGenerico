<template>
  <v-app>

    
    <dashboard-core-app-bar v-if="$route.meta.requiereAuth"/>

    <dashboard-core-view></dashboard-core-view>
    <dashboard-core-footer v-if="$route.meta.requiereAuth"/>
    
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("@/components/layout/core/AppBar.vue"),
    //DashboardCoreDrawer: () => import("@/components/layout/core/Drawer"),
    //DashboardCoreSettings: () => import("@/components/layout/core/Settings"),
    DashboardCoreView: () => import("@/components/layout/core/View"),

    DashboardCoreFooter: () => import("@/components/layout/core/FooterJ.vue"),
  },

  data: () => ({
    expandOnHover: false,
  }),
};
</script>
<style>
#app {
  background: url("../../public/img/fondoblanco.svg") no-repeat center center fixed;
  background-size: cover;
}
</style>
