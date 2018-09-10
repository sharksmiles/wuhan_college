<template>
  <div>
    <percent :data="data.percent"></percent>
    <chartLine :data="data.chart"></chartLine>
    <Col :charts="data.charts"></Col>
  </div>
</template>

<script>

  import chartLine from "../../common/swiper/line.vue";
  import percent from "../../common/chart/percent";
  import search from "../../common/card/search";
  import Col from '../../common/swiper/col'

  export default {
    components: {chartLine, percent, search, Col},
    data() {
      return {
        data: {
          percent: {},
          chart: [],
          charts:[],
          table: [
            {
              config: {nav: "", title: []},
              content: []
            }
          ]
        }
      }
    },
    mounted() {
      axios('https://www.easy-mock.com/mock/5b902cd275d00c6196a36b94/example/college#!method=get')
        .then(res => {
          this.data.percent = res.data.data.percent;
          this.data.chart.push(...res.data.data.chart);
      this.data.charts = res.data.data.charts;
    })
    },
    computed: {
      searchArry() {
        let data = this.data.table[0].content, arr = [];
        for (let item of data) {
          arr.push(item[0]);
        }
        return arr;
      }
    }
  }
</script>
