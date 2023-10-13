<template>
    <div>akiii:::
        {{ frm }}
    </div>
</template>

<script>
export default {
  data: () => ({
    frm: null
  }),

  beforeRouteUpdate(to, from) {
    // just use `this`
    this.frm = to.params.idx;    
    
  },

  mounted() {
    this.frm = this.$route.params.idx
    
  },
};
</script>
