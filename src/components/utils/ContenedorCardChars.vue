<template>
  <ContenedorCard
    class="v-card--material-chart"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:heading>
      <chartist
        :data="data"
        :event-handlers="eventHandlers"
        :responsive-options="responsiveOptions"
        :options="options"
        :ratio="ratio"
        :type="type"
        style="max-height: 250px"
      />
    </template>

    <slot />

    <slot slot="actions" name="actions" />
  </ContenedorCard>
</template>

<script>
import ContenedorCard from "./ContenedorCard.vue";
export default {
  components: { ContenedorCard },
  name: "MaterialChartCard",

  inheritAttrs: false,

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    eventHandlers: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    ratio: {
      type: String,
      default: undefined,
    },
    responsiveOptions: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
      validator: (v) => ["Bar", "Line", "Pie"].includes(v),
    },
  },
};
</script>
<style>
.v-card--material .__heading {
  max-height: 285px;
}
.v-card--material-chart {
  color: #999;
}
.ct-label {
  color: inherit;
  opacity: 0.7;
  font-size: 0.875rem;
  font-weight: 100;
}
.ct-grid {
  stroke: rgba(255, 255, 255, 0.2);
}
.ct-series-a .ct-point,
.ct-series-a .ct-line,
.ct-series-a .ct-bar,
.ct-series-a .ct-slice-donut {
  stroke: rgba(255, 255, 255, 0.8);
}
.ct-series-a .ct-slice-pie,
.ct-series-a .ct-area {
  fill: rgba(255, 255, 255, 0.4);
}
/*.chartist-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}*/
.chartist-tooltip {
  position: absolute;
  display: none;
  min-width: 5em;
  //padding: 8px 10px;
  padding: 0px 10px;
  border-radius: 5px;
  //background: #383838;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
  pointer-events: none;
  z-index: 100;
  transition: opacity 0.2s linear;
}

.chartist-tooltip:before {
  position: absolute;
  bottom: -14px;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  pointer-events: none;
  border-color: rgba(251, 249, 228, 0);
  border-top-color: #383838;
  border-width: 7px;
  margin-left: -8px;
}

.chartist-tooltip.tooltip-show {
  display: inline-block !important;
}

.ct-tooltip {
  position: absolute;
  display: inline-block;
  min-width: 5em;
  padding: 8px 10px;
  background: #383838;
  color: #fff;
  text-align: center;
  pointer-events: none;
  z-index: 100;
  transition: opacity 0.2s linear;

  // Arrow

  &:before {
    position: absolute;
    bottom: -14px;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    pointer-events: none;
    border-color: rgba(251, 249, 228, 0);
    border-top-color: #383838;
    border-width: 7px;
    margin-left: -8px;
  }

  &.hide {
    display: block;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
