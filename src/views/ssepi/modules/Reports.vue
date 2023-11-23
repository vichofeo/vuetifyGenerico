<template>
  <div >
    <p>&nbsp;</p>
    <ContenedorCard color="#7796bd" :icon="mdi" :title="titulo" class="px-5 py-3">
      <div class="main-wrapper">
      <vue-pivottable-ui v-model="config" :data="pivotData" :renderers="renderers" :aggregatorName="aggregatorName"
        :tableColorScaleGenerator="colorScaleGenerator" :attributes="attributes"  :rows="rows"
        :cols="cols" :vals="vals" :colLimit="100" :rowLimit="100" :async="false" 
        :disabledFromDragDrop="disabledFromDragDrop" :sortonlyFromDragDrop="sortonlyFromDragDrop"
        :hiddenFromDragDrop="hiddenFromDragDrop"  :hiddenFromAggregators="hiddenFromAggregators"
        rowOrder="key_a_to_z" 
        :menuLimit="10000" @no:filterbox="noFilterbox">
        <!-- Slot ColGroup -->
        <template v-slot:colGroup>
          <colgroup>
            <col :width="300" />
            <col />
          </colgroup>
        </template>
        <!-- Slot Output -->
        <!-- <template v-slot:output>
                      <div v-if="loading">
                        loading...
                      </div>
                    </template> -->
        <div v-if="loading" slot="output">loading...</div>

        <!-- Scoped Slot PvtAttr -->
        <template v-slot:pvtAttr="{ name }">
          {{ name }} 
        </template>

        <!-- Scoped Slot Output -->
        
      </vue-pivottable-ui>
       
      
    </div>
    </ContenedorCard>
    
  </div>
</template>

<script>
import * as srv from "@/services/ssepi/reportsService"
import {
  VuePivottableUi,
  PivotUtilities,
  Renderer
} from "@/plugins/pivotTable";
import PlotlyRenderer from "@/plugins/pivotTable/packages/plotly-renderer";
import ScrollRenderer from "@/plugins/pivotTable/packages/scroll-renderer";
import "@/plugins/pivotTable/assets/vue-pivottable.css";
import { scaleLinear } from "d3-scale";
import ContenedorCard from '@/components/utils/ContenedorCard.vue';

export default {
  name: "App",
  components: {
    VuePivottableUi,
    ContenedorCard,
     //TableRenderer,
    // HeatmapRenderer
     
  },
  data() {
    return {
      viewTable: false,
      
      
      config: {},
      filteredData: [],
      pivotData: [],
      asyncFields: [],
      attributes: [],
      rows: [],
      cols: [],
      vals: [],
      disabledFromDragDrop: [], // ['Payer Gender'],
      hiddenFromDragDrop: [],
      hiddenFromAggregators:[],
      sortonlyFromDragDrop: [], // ['Party Size'],
      //pivotColumns: ['Meal', 'Payer Smoker', 'Day of Week', 'Payer Gender', 'Party Size'],
      loading: false,
      aggregatorName: "Count",
      rendererName: "TableData",
      mdi: null,

      modelo: null,
      titulo: null,
    };
  },
  mounted() {
    this.verifyOption()
    this.initial()
  },
  computed: {
    
    
    aggregators() {
      const usFmt = PivotUtilities.numberFormat();
      const usFmtInt = PivotUtilities.numberFormat({ digitsAfterDecimal: 0 });
      const usFmtPct = PivotUtilities.numberFormat({
        digitsAfterDecimal: 1,
        scaler: 100,
        suffix: "%",
      });

      return ((tpl) => ({
        Count: tpl.count(usFmtInt),
        "Count Unique Values": tpl.countUnique(usFmtInt),
        "List Unique Values": tpl.listUnique(", "),
        Sum: tpl.sum(usFmt),
        "Integer Sum": tpl.sum(usFmtInt),
        Average: tpl.average(usFmt),
        Median: tpl.median(usFmt),
        "Sample Variance": tpl.var(1, usFmt),
        "Sample Standard Deviation": tpl.stdev(1, usFmt),
        Minimum: tpl.min(usFmt),
        Maximum: tpl.max(usFmt),
        First: tpl.first(usFmt),
        Last: tpl.last(usFmt),
        "Sum over Sum": tpl.sumOverSum(usFmt),
        "Sum as Fraction of Total": tpl.fractionOf(
          tpl.sum(),
          "total",
          usFmtPct
        ),
        "Sum as Fraction of Rows": tpl.fractionOf(tpl.sum(), "row", usFmtPct),
        "Sum as Fraction of Columns": tpl.fractionOf(
          tpl.sum(),
          "col",
          usFmtPct
        ),
        "Count as Fraction of Total": tpl.fractionOf(
          tpl.count(),
          "total",
          usFmtPct
        ),
        "Count as Fraction of Rows": tpl.fractionOf(
          tpl.count(),
          "row",
          usFmtPct
        ),
        "Count as Fraction of Columns": tpl.fractionOf(
          tpl.count(),
          "col",
          usFmtPct
        ),
      }))(PivotUtilities.aggregatorTemplates);
    },
    renderers() {
      const TableRenderer = Renderer.TableRenderer;
      return (() => ({
        Table: TableRenderer.Table,
        "Scroll Table": ScrollRenderer.Table,
        "Mapa de calor de tabla": ScrollRenderer["Table Heatmap"],
        "Mapa de calor de columnas de tabla":
          TableRenderer["Table Col Heatmap"],
        "Mapa de calor de fila de tabla": TableRenderer["Table Row Heatmap"],
        "Export Table TSV": TableRenderer["Export Table TSV"],
        "Gráfico de columnas agrupadas": PlotlyRenderer["Grouped Column Chart"],
        "Gráfico de columnas apiladas": PlotlyRenderer["Stacked Column Chart"],
        "Gráfico de barras agrupadas": PlotlyRenderer["Grouped Bar Chart"],
        "Gráfico de barras apiladas": PlotlyRenderer["Stacked Bar Chart"],
        "Gráfico de linea": PlotlyRenderer["Line Chart"],
        "Gráfico de puntos": PlotlyRenderer["Dot Chart"],
        "Gráfico de área": PlotlyRenderer["Area Chart"],
        "Gráfico de dispersión": PlotlyRenderer["Scatter Chart"],
        "Gráfico circular múltiple": PlotlyRenderer["Multiple Pie Chart"],
      }))();
    },
  },
  methods: {
    colorScaleGenerator(values) {
      const scale = scaleLinear()
        .domain([0, Math.max.apply(null, values)])
        .range(["#fff", "#77f"]);
      return (x) => {
        return { "background-color": scale(x) };
      };
    },
    noFilterbox() {
      alert("no data");
    },
    otherAction(pivotData) {
      alert(`All Total Count: ${pivotData.allTotal.count}`);
    },
    async initial() {
      try {
        const results = await srv.getReportGral(this.modelo)
        const institucion =  results.institucion        
        const model = results.data.model
        
        this.pivotData  = results.data[model].values
        this.attributes = results.data[model].headers
        this.asyncFields = results.data[model].rows
        this.rows = results.data[model].cnf.rows
        this.cols = results.data[model].cnf.cols
        this.vals = results.data[model].cnf.vals
        this.aggregatorName = results.data[model].cnf.tipo_agregacion
        this.hiddenFromDragDrop = results.data[model].cnf.campos_ocultos
        this.hiddenFromAggregators = results.data[model].cnf.diferencia
        this.mdi = results.data[model].cnf.mdi

        this.titulo = institucion.nombre_institucion + " Cubo de datos: " + model
      } catch (error) {
        console.log(error);
      };


    },
    verifyOption() {
      if (this.$route.params.idx) this.modelo = this.$route.params.idx;
      else this.modelo = "eess";
    },    
  },
  beforeRouteUpdate(to, from) {
      // just use `this`
      this.modelo = to.params.idx;
      this.initial();
    },
  watch: {
    config: {
      handler(value, oldValue) {
        delete value.data;
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  flex-flow: column;
}

@media screen and (min-width: 900px) {
  .main-wrapper {
    flex-flow: row;
  }

  .main-wrapper>textarea {
    width: 500px;
  }
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 0px;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
}

pre {
  text-align: left;
  background-color: #f8f8f8;
  padding: 1.2em 1.4em;
  line-height: 1.5em;
  margin: 60px 0 0;
  overflow: auto;
}

code {
  padding: 0;
  margin: 0;
}

footer {
  text-align: center;
  margin-top: 40px;
  line-height: 2;
}
</style>