<template>
  <v-btn
    class="text-none ms-4 text-white"
    dark
    variant="flat"
    size="small"
    color="success"
    prepend-icon="mdi-newspaper-variant-multiple-outline"
    density="compact"
    @click="clicked"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name:"BtnNewFroms",
  props: {
    label: { type: String, default: "Nuevo" },
    onClick: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data: () => ({}),
  methods: {
    clicked() {
      this.onClick();
    },
  },
};
</script>

<style></style>
